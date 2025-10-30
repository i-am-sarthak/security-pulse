import { Router } from 'express';
import { pool } from '../db/pool';
import { verifyToken } from '../middleware/verifyToken';
import { success, failure } from '../utils/response';

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
    return res.status(200).json(success(result.rows, "Fetched saved articles successfully"));
  } catch (err) {
    console.error('Error fetching saved articles:', err);
    return res.status(500).json(failure("Failed to fetch saved articles"));
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
    return res.status(201).json(success(null, 'Article saved successfully'));
  } catch (err) {
    console.error('Error saving article:', err);
    return res.status(500).json(failure('Failed to save article', 'SERVER_ERROR'));
  }
});

// Unsave an article
router.delete('/:articleId', verifyToken, async (req: any, res) => {
  const userId = req.user.id;
  const articleId = req.params.articleId;

  try {
    const result = await pool.query(
      'DELETE FROM users_articles WHERE user_id = $1 AND article_id = $2',
      [userId, articleId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json(failure('Article not found in saved list', 'NOT_FOUND'));
    }

    return res.status(200).json(success(null, 'Article removed from saved list'));
  } catch (err) {
    console.error('Error removing article:', err);
    return res.status(500).json(failure('Failed to remove saved article', 'SERVER_ERROR'));
  }
});

export default router;
