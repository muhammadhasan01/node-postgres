const express = require('express');
const fortunes = require('./data/fortunes.json');

const app = express();
const port = 3000;

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
  const randomIdx = Math.floor(Math.random() * fortunes.length);
  const randomFortune = fortunes[randomIdx];
  res.json(randomFortune);
})

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
