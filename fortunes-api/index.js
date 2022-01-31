const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fortunes = require('./data/fortunes.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
  res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
  const randomIdx = Math.floor(Math.random() * fortunes.length);
  const randomFortune = fortunes[randomIdx];
  res.json(randomFortune);
});

app.get('/fortunes/:id', (req, res) => {
  const {id} = req.params;
  const fortune = fortunes.find(f => f.id === Number(id));
  res.json(fortune);
});

app.post('/fortunes', (req, res) => {
  const {message, luckyNumber, spiritAnimal} = req.body;
  const fortuneIds = fortunes.map(f => f.id);
  const fortuneId = fortuneIds.length > 0 ? Math.max(...fortuneIds) + 1 : 0;
  const fortune = {id: fortuneId, message, luckyNumber, spiritAnimal};
  const newFortunes = fortunes.concat(fortune);
  fs.writeFile('./data/fortunes.json', JSON.stringify(newFortunes), err => console.log(err));
  res.send(newFortunes);
})

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
