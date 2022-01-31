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

app.get('/fortunes/:id', (req, res) => {
  const {id} = req.params;
  const fortune = fortunes.find(f => f.id === Number(id));
  res.json(fortune);
})

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
