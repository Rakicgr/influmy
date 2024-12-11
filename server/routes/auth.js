import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateUsername = async (firstName, lastName) => {
  let username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  let isUnique = false;
  let counter = 1;
  let finalUsername = username;

  while (!isUnique) {
    const existingUser = await User.findOne({ username: finalUsername });
    if (!existingUser) {
      isUnique = true;
    } else {
      finalUsername = `${username}${counter}${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`;
      counter++;
    }
  }
  return finalUsername;
};

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const username = await generateUsername(firstName, lastName);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      username
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful', email });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        tokens: user.tokens
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
