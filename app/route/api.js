import express from "express";
import * as db from  '../db/pool.js';

const router = express.Router();
export default router;

//misc. buisness logic
//Colors should probably be represented by random ints and have mappings defined elsewhere but whatev's
const x_min = -100;
const y_min = -100;
const x_max = 100;
const y_max = 100;
const height_min = 5;
const height_max = 50;
const colors_num = 7;
const rand_int = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

//generic get all-TO BE REFINED
router.get('/', async (req, res) => {
  //Directory-like output with all trees and associated monkies
  const data = await db.query(`
    SELECT * FROM main.tree;
  `);
  res.send(data.rows);
});

//Create monkey
//Required: tree id and climb height
router.post('/monkey', async (req, res) => {
  //TODO: ensure variable not found error is obvious
  const { tree_id, climb_height } = req.body;
  const color = rand_int(0, colors_num);

  const data = await db.query(`
    INSERT INTO main.monkey (tree_id, monkey_color, monkey_climb_height)
    VALUES ('${tree_id}', '${color}', '${climb_height}');
  `);

  res.sendStatus(data.rowCount && 200 || 400);
});

//remove monkey by id
router.delete('/monkey', async (req, res) => {
  res.send('Welcome to the dev API');
});

//make random tree
router.post('/tree', async (req, res) => {
  const { x, y } = req.body;
  const height = rand_int(height_min, height_max);
  const color = rand_int(0, colors_num);

  const data = await db.query(`
    INSERT INTO main.tree (tree_color, tree_x, tree_y, tree_height)
    VALUES ('${color}', '${x}', '${y}', '${height}');
  `);

  res.sendStatus(data.rowCount && 200 || 400);
});

//remove tree by id and all associated monkeys
router.delete('/tree', async (req, res) => {
  const { id } = req.body;

  const data = await db.query(`
    DELETE FROM main.tree
    WHERE tree_id = ${id};
  `);

  res.sendStatus(data.rowCount && 200 || 400);
});

// export default router;