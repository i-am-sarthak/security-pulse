import { Router } from 'express';
import { pool } from '../db/pool';
import { success, failure } from '../utils/response';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles ORDER BY published_at DESC');
    return res.status(200).json(success(result.rows, "Fetched articles successfully"));
  } catch (err) {
    console.error('Error fetching articles:', err);
    return res.status(500).json(failure("Failed to fetch articles"));
  }
});

export default router;
