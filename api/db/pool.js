import fs from 'fs';
import pg from 'pg';
const { Pool } = pg;

import * as dotenv from 'dotenv'
dotenv.config();

const schema_path = './api/db/schema.sql';
const repopulate_path = './api/db/populate.sql';

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

export const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch(err) { return err; }
}

export const instate_schema = async () => {
  const schema = fs.readFileSync(schema_path, 'utf-8');
  return await query(schema);
}

export const repopulate = async () => {
  const repopulate = fs.readFileSync(repopulate_path, 'utf-8');
  return await query(repopulate);
}
