import Stripe from 'stripe';
import Shop from '../models/Shop.js'; 

const stripe = new Stripe('sk_test_51PrAEqKzHh91dh6pWPuz8kVAlRuAQRrQUP03KsYktxHtBC60L2NjjFgduMtZo2SKwNCX5dDPdrWxjX7d5OwZO6M400yk1AlAXi');

export const createShop = async (req, res) => {
  try {
    const { shopName, description, userName, userEmail } = req.body;

    
    if (!shopName || !description || !userName || !userEmail) {
      return res.status(400).json({ message: 'All fields are required, including shopName and userEmail.' });
    }

   
    const newShop = new Shop({
      shopName,
      description,
      userName,
      userEmail,
    });

    
    await newShop.save();

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Shop Creation: ${shopName}`,
            },
            unit_amount: 60000, 
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

   
    res.status(201).json({ newShop, sessionId: session.id});
  } catch (error) {
    console.error('Error in createShop:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};




export const getShops = async (req, res) => {
  try {
    const { email } = req.query;

    const shops = await Shop.find({ userEmail: email }); 
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

