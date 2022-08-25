// load .env data into process.env
import * as dotenv from 'dotenv';
dotenv.config();

// other dependencies
import { readFileSync, readdirSync } from 'fs';
import { Client } from 'pg';

// PG connection setup
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client({ connectionString });

// Loads the schema files from db/schema
const runSchemaFiles = function() {
  console.log('-> Loading Schema Files ...');
  const schemaFilenames = readdirSync('./schema');

  for (const fn of schemaFilenames) {
    const sql = readFileSync(`./schema/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    client.query(sql);
  }
};

const runSeedFiles = function() {
  console.log('-> Loading Seeds ...');
  const schemaFilenames = readdirSync('./seeds');

  for (const fn of schemaFilenames) {
    const sql = readFileSync(`./seeds/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    client.query(sql);
  }
};

try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connect();
  runSchemaFiles();
  runSeedFiles();
  client.end();
} catch (err) {
  console.error(`Failed due to error: ${err}`);
  client.end();
}