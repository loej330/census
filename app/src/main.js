import express from "express";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
// app.locals.test_var = 'initial value';

import router_dev from '../route/dev.js';
import router_api from '../route/api.js';

app.use(express.json())

app.use('/dev', router_dev);
app.use('/api', router_api);

app.get('/', (req, res) => {
  res.send("Welcome to my... yeah");
  // res.json({warning: "911 Help I am dying"});
})

const listenr = app.listen(process.env.API_PORT);
var date = new Date();
console.log(
  `Server Started!\n` +
  `listening from port ${listenr.address().port}\n` +
  `${date.toLocaleString('en-US', { hour12: true })}`
);