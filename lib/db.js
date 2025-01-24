import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function query(queryString, params = []) {
  try {
    const result = await sql(queryString, ...params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to execute query");
  }
}
