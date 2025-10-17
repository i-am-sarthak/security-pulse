import { Router } from 'express';
import { pool } from '../db/pool';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

// Get all saved articles for logged-in user
router.get('/', verifyToken, async (req: any, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT a.* 
       FROM users_articles ua
       JOIN articles a ON ua.article_id = a.id
       WHERE ua.user_id = $1
       ORDER BY ua.saved_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch saved articles' });
  }
});

// Save an article
router.post('/:articleId', verifyToken, async (req: any, res) => {
  const userId = req.user.id;
  const articleId = req.params.articleId;

  try {
    await pool.query(
      'INSERT INTO users_articles (user_id, article_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, articleId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

// Unsave an article
router.delete('/:articleId', verifyToken, async (req: any, res) => {
  const userId = req.user.id;
  const articleId = req.params.articleId;

  try {
    await pool.query(
      'DELETE FROM users_articles WHERE user_id = $1 AND article_id = $2',
      [userId, articleId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove saved article' });
  }
});

export default router;
