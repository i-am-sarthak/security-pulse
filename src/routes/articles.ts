import { Router } from "express";
import pool from "../db";
import { success, failure } from "../utils/response";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Extract query params with defaults
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as string) || "latest";
    const q = (req.query.q as string) || "";

    const offset = (page - 1) * limit;

    // Sorting logic
    const orderBy = sort === "oldest" ? "ASC" : "DESC";

    // Base query + filtering
    let query = `SELECT * FROM articles`;
    const values: any[] = [];

    if (q) {
      query += ` WHERE title ILIKE $1`;
      values.push(`%${q}%`);
    }

    // Pagination and sorting
    query += ` ORDER BY published_at ${orderBy} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    // Fetch paginated data
    const result = await pool.query(query, values);

    // Get total count for metadata
    const countQuery = q
      ? `SELECT COUNT(*) FROM articles WHERE title ILIKE $1`
      : `SELECT COUNT(*) FROM articles`;
    const countValues = q ? [`%${q}%`] : [];
    const totalResult = await pool.query(countQuery, countValues);
    const total = parseInt(totalResult.rows[0].count, 10);

    // Return structured response
    return res.status(200).json(
      success(
        {
          total,
          page,
          perPage: limit,
          totalPages: Math.ceil(total / limit),
          data: result.rows,
        },
        "Fetched articles successfully"
      )
    );
  } catch (err) {
    console.error("Error fetching articles:", err);
    return res.status(500).json(failure("Failed to fetch articles"));
  }
});

export default router;
