import Parser from "rss-parser";
import { pool } from "../db/pool";

const parser = new Parser();

export async function fetchAndSaveNews() {
  const feed = await parser.parseURL("https://www.securityweek.com/feed/");

  // Normalize items
  for (const item of feed.items) {
    const title = item.title || "";
    const summary = item.contentSnippet || "";
    const published = item.isoDate ? new Date(item.isoDate) : new Date();
    const source = "SecurityWeek"; // static source

    // Insert article (ignore duplicates)
    await pool.query(
      `INSERT INTO articles (title, source, summary, published_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      [title, source, summary, published]
    );
  }

  return { count: feed.items.length };
}
