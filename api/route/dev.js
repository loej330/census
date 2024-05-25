import express from "express";
import * as db from  '../db/pool.js';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  res.send('Welcome to the dev API');
});

router.get('/refresh_db', async (req, res, next) => {
  try {
    const instate_schema = await db.instate_schema();
    const repopulate = await db.repopulate();
    res.send({
      instate_status: instate_schema,
      repopulate_status: repopulate
    });
  } catch(err) { next(err); }
  console.log('DB successfully updated with modified schema and data');
});

//obviously not safe
router.get('/init_schema', async (req, res, next) => {
  try {
    const data = await db.instate_schema();
    res.send(data);
  } catch(err) { next(err); }
  console.log('Data had been wiped and schema has been updated with any new changes.');
});

router.get('/repopulate', async (req, res, next) => {
  try {
    const data = await db.repopulate();
    res.send(data);
  } catch(err) { next(err); }
  console.log('Data has been repopulated with default data.');
});
