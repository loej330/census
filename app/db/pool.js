import fs from 'fs';
import pg from 'pg';
const { Pool } = pg;

import * as dotenv from 'dotenv'
dotenv.config();

const schema_path = 'C:\\webdev\\census\\app\\db\\schema.sql';

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  password: "9372",
  port: "5432"
});

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PW,
//   port: process.env.DB_PORT
// });

export const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res;
}

export const instate_schema = async () => {
  const schema = fs.readFileSync(schema_path, 'utf-8');
  // const result = await this.pool.query(schema);
  return await pool.query(schema);
}

//   async close() {
//     console.log('PostgreSQL pool is ending');
//     await this.pool.end();
//   }
// }
