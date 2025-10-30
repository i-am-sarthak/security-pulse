import express from 'express';
import { pool } from '../db/pool';
import { success, failure } from '../utils/response';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Edit for later: do NOT select password column - return only safe fields
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return res.status(200).json(success(result.rows, "Fetched users successfully"));
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
      return res.status(500).json(failure("Internal Server Error"));
  }
});

export default router;
