import express from "express";
import * as db from  '../db/pool.js';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  res.send('Welcome to the dev API');
});

//obviously not safe
router.post('/sql/hard_refresh', async (req, res) => {
  const data = await db.instate_schema();
  res.send(data.rows)
});