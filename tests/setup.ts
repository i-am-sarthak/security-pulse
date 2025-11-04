import { pool } from "../src/db/pool";

afterAll(async () => {
  await new Promise((res) => setTimeout(res, 200)); // small delay
  await pool.end();
});
