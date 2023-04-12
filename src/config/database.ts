import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

const connectionDb = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV === "development" ? false : true,
  },
});

export default connectionDb;
