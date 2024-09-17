import Stripe from 'stripe';
import Shop from '../models/Shop.js';
import User from '../models/User.js'; 

const stripe = new Stripe('sk_test_51PrAEqKzHh91dh6pWPuz8kVAlRuAQRrQUP03KsYktxHtBC60L2NjjFgduMtZo2SKwNCX5dDPdrWxjX7d5OwZO6M400yk1AlAXi');

export const createShop = async (req, res) => {
  try {
    const { shopName, description, userName, userEmail } = req.body;

    // Ensure all fields are provided
    if (!shopName || !description || !userName || !userEmail) {
      return res.status(400).json({ message: 'All fields are required, including shopName and userEmail.' });
    }
    
    // Create a new shop
    const newShop = new Shop({
      shopName,
      description,
      userName,
      userEmail,
    });

    await newShop.save();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Shop Creation: ${shopName}`,
            },
            unit_amount: 600, // 6 USD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/Success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/Cancel',
      metadata: {
        shopId: newShop._id.toString(), 
        shopName,
        description,
        userName,
        userEmail,
      },
    });

    // Find the SuperAdmin user
    const superAdmin = await User.findOne({ role: 'SuperAdmin' });

    if (!superAdmin) {
      return res.status(404).json({ message: 'SuperAdmin not found.' });
    }

    // Add 6 USD to the SuperAdmin's balance
    const amountToAdd = 6;
    superAdmin.balance = (superAdmin.balance || 0) + amountToAdd;

    // Save the updated SuperAdmin user
    await superAdmin.save();

    // Send response with the new shop and session ID for the payment
    res.status(201).json({ newShop, sessionId: session.id });

  } catch (error) {
    console.error('Error in createShop:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

//-------------------------------------------------------

export const getShops = async (req, res) => {
  try {
    const { email } = req.query;

    const shops = await Shop.find({ userEmail: email }); 
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

