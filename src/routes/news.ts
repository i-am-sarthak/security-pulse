import { Router } from "express";
import { fetchAndSaveNews } from "../services/fetchNews";
import { success, failure } from "../utils/response";
import { pool } from "../db/pool";

const router = Router();

// Manual trigger
router.get("/fetch", async (req, res) => {
  try {
    const data = await fetchAndSaveNews();

    // Cleanup old articles
    await pool.query(
      `DELETE FROM articles
       WHERE published_at < NOW() - INTERVAL '30 days'
       AND id NOT IN (SELECT article_id FROM users_articles)`
    );

    return res.status(200).json(success(data, "News fetched & saved"));
  } catch (err) {
    console.error("Error fetching news:", err);
    return res.status(500).json(failure("Failed to fetch news"));
  }
});

export default router;
