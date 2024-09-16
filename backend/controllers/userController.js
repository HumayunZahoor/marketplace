import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      image, 
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


//-----------------------------------------------------------

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      'secretKey',
      { expiresIn: '1h' }
    );

    
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//----------------------------------------------------

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'humayuncs009@gmail.com',
        pass: 'sfbf gthc phyc mawt'  
      }
    });

    const mailOptions = {
      from: 'humayuncs009@gmail.com',
      to: email,
      subject: 'Password Changed Successfully',
      text: `Dear ${user.name},\n\nWe wanted to inform you that your password for your account on our marketplace web app has been changed successfully.\n\nIf you did not initiate this change, please secure your account immediately by changing your password again.\n\nIf you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Marketplace Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//----------------------------------------------------


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');  
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

//----------------------------------------------


export const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { role: newRole }, 
      { new: true }  
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Role updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating role' });
  }
};

//----------------------------------------

export const userByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

