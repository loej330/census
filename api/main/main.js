import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import * as db from  '../db/pool.js';
// import { pool } from '../db/pool.js';

dotenv.config();

const app = express();

import router_dev from '../route/dev.js';
import router_api from '../route/api.js';

app.use(cors());
app.use(express.json())

app.use('/dev', router_dev);
app.use('/api', router_api);

app.get('/', (req, res) => {
  res.send("You sir have successfully communicated with the census api");
});

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    error: err.message
  });
});

const listener = app.listen(process.env.API_PORT);
var date = new Date();
console.log(
  `Server Started!\n` +
  `listening from port ${listener.address().port}\n` +
  `${date.toLocaleString('en-US', { hour12: true })}`
);
