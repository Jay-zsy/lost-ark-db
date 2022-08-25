import { Client } from 'pg';
import { ENV } from '../environment';
export const client = new Client({
  connectionString: process.env.DATABASE_URL || "",
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // host: process.env.PGHOST,
  // database: process.env.PGDATABASE,
});

client.connect().catch(e => console.log(`Error connecting to Postgres server while in ${ENV} environment:\n${e}`));
