import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db/pool';
import { config } from '../config/default';
import { success, failure } from '../utils/response';


const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json(failure('All fields are required', 'VALIDATION_ERROR'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    return res.status(201).json(success(result.rows[0], 'User registered successfully'));
  } catch (err: any) {
    console.error('Error during registration:', err);

    if (err.code === '23505') {
      // PostgreSQL unique violation
      return res.status(400).json(failure('Email already registered', 'EMAIL_EXISTS'));
    }

    return res.status(500).json(failure('Registration failed', 'SERVER_ERROR'));
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json(failure('Email and password are required', 'VALIDATION_ERROR'));
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json(failure('User not found', 'USER_NOT_FOUND'));

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json(failure('Invalid password', 'INVALID_CREDENTIALS'));

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, config.jwtSecret, { expiresIn: '1h' });
    return res.status(200).json(success({ token }, 'Login successful'));
  } catch (err: any) {
    console.error('Error during login:', err);
    return res.status(500).json(failure('Login failed', 'SERVER_ERROR'));
  }
});

export default router