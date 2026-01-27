import { Router } from "express";
import {pool} from "../db/pool";
import { success, failure } from "../utils/response";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

/**
 * GET /api/threats
 * Fetch all threats ordered by severity
 */
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, slug, description, risk_level, default_guidance
      FROM threats
      ORDER BY
        CASE risk_level
          WHEN 'critical' THEN 1
          WHEN 'high' THEN 2
          WHEN 'medium' THEN 3
          WHEN 'low' THEN 4
        END;
    `);

    return res.json(success(result.rows));
  } catch (err) {
    console.error("Failed to fetch threats:", err);
    return res
      .status(500)
      .json(failure("Failed to fetch threats", "SERVER_ERROR"));
  }
});

/**
 * GET /api/threats/:slug
 * Fetch threat details + related articles
 */
router.get("/:slug", verifyToken, async (req, res) => {
  const { slug } = req.params;

  try {
    const threatResult = await pool.query(
      `SELECT * FROM threats WHERE slug = $1`,
      [slug]
    );

    if (threatResult.rowCount === 0) {
      return res
        .status(404)
        .json(failure("Threat not found", "NOT_FOUND"));
    }

    const threat = threatResult.rows[0];

    const articlesResult = await pool.query(
      `
      SELECT a.*
      FROM articles a
      JOIN article_threats at ON at.article_id = a.id
      WHERE at.threat_id = $1
      ORDER BY a.published_at DESC
      `,
      [threat.id]
    );

    return res.json(
      success({
        threat,
        articles: articlesResult.rows,
      })
    );
  } catch (err) {
    console.error("Failed to fetch threat details:", err);
    return res
      .status(500)
      .json(failure("Failed to fetch threat details", "SERVER_ERROR"));
  }
});

/**
 * POST /api/threats/:id/link-article/:articleId
 * Manually link an article to a threat (admin usage)
 */
router.post(
  "/:id/link-article/:articleId",
  verifyToken,
  async (req: any, res) => {
    const threatId = req.params.id;
    const articleId = req.params.articleId;

    try {
      await pool.query(
        `
        INSERT INTO article_threats (article_id, threat_id, confidence_level)
        VALUES ($1, $2, 'high')
        ON CONFLICT DO NOTHING
        `,
        [articleId, threatId]
      );

      return res.json(success(null, "Article linked to threat"));
    } catch (err) {
      console.error("Failed to link article:", err);
      return res
        .status(500)
        .json(failure("Failed to link article", "SERVER_ERROR"));
    }
  }
);

export default router;
