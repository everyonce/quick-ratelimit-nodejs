const redis = require('ioredis');
const express = require('express');
const rateLimitLogic = require ('./rate_logic');
const client = redis.createClient({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'localhost',
})
client.on('connect', function () {
  console.log('connected');
});

rateLimitLogic.createLimiter(client);

  const app = express();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
  //app.get('/', (req, res) => res.send('Hello World!'));
  app.get('/', (req, res) => {
    console.log(`got request: ${req}`);
    rateLimitLogic.rateLimitWrapper(req,
      (err)=>{res.status(500).send(`ERROR: ${err}`); return console.log("Error: " + err);},
      ()=>{res.status(429).send('Too many requests - try again later'); return;},
      ()=>{res.status(200).send("{'status':'access granted'}"); return;}
    );
  });