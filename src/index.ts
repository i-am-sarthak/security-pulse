import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";
import { QueryResult } from "pg";

dotenv.config();

pool.query("SELECT NOW()", (err: Error | null, res: QueryResult) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("DB connected, current time:", res.rows[0]);
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running on port " + PORT);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
