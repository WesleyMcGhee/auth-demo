import { Pool } from "pg";
import { config } from "dotenv";
config();

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
