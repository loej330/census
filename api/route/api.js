import express from "express";
import * as db from  '../db/pool.js';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  res.send('Welcome to the Census data API!');
});

router.post('/query', async (req, res, next) => {
  try {
    const { query } = req.body;
    const data = await db.query(query);
    res.send(data.rows);
  } catch(err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await db.query(
      `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
    );
    res.send(user.rows[0]);
  } catch(err) { next(err); }
});

//first real api point of entry, time to get excited
router.get('/polls', async (req, res, next) => {
  try {
    let polls = await db.query(`SELECT * FROM polls`);
    polls = polls.rows;
    for (let poll of polls) {
      const total_votes = await db.query(
        `SELECT SUM(votes) AS total_votes FROM choices ` +
        `WHERE poll_id=${poll.poll_id} ` 
      )
      const choices = await db.query(
        `SELECT choice_id, text, votes FROM choices ` +
        `WHERE poll_id=${poll.poll_id} ` 
      );
      poll.total_votes = parseInt(total_votes.rows[0].total_votes);
      poll.choices = choices.rows;
    }
    res.send(polls);
  } catch(err) { next(err); }
});
