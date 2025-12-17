//import { Pool } from "pg"; // standard Postgres driver
import pg from "pg";
const { Pool } = pg;

import { drizzle } from "drizzle-orm/node-postgres"; // Drizzle with pg
import * as schema from "@shared/schema"; // your schema (make sure it exists)
import "dotenv/config"; // load .env variables

// Ensure DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in your .env file");
}

// Create Postgres connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Drizzle instance with schema
export const db = drizzle(pool, { schema });

// Optional: simple health check (useful for debugging)
export async function testDbConnection() {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("✅ Database connection successful");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}
