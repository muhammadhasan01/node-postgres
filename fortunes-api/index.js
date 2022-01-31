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

const writeFortunes = (json) => {
  fs.writeFile('./data/fortunes.json', JSON.stringify(json), err => console.log(err));
};

app.post('/fortunes', (req, res) => {
  const {message, luckyNumber, spiritAnimal} = req.body;
  const fortuneIds = fortunes.map(f => f.id);
  const fortuneId = fortuneIds.length > 0 ? Math.max(...fortuneIds) + 1 : 0;
  const fortune = {id: fortuneId, message, luckyNumber, spiritAnimal};
  const newFortunes = fortunes.concat(fortune);
  writeFortunes(newFortunes);
  res.send(newFortunes);
});

app.post('/fortunes/multiple', (req, res) => {
  const fortuneReq = req.body;
  let newFortunes = fortunes;
  const fortuneIds = fortunes.map(f => f.id);
  const maxId = Math.max(...fortuneIds);
  for (let i = 0; i < fortuneReq.length; i++) {
    const {message, luckyNumber, spiritAnimal} = fortuneReq[i];
    const fortuneId = fortuneIds.length > 0 ? maxId + i + 1 : 0;
    const fortune = {id: fortuneId, message, luckyNumber, spiritAnimal};
    newFortunes.push(fortune);
  }
  writeFortunes(newFortunes);
  res.send(newFortunes);
});

app.put('/fortunes/:id', (req, res) => {
  const {id} = req.params;
  const oldFortune = fortunes.find(f => f.id === Number(id));
  ['message', 'luckyNumber', 'spiritAnimal'].forEach((key) => {
    const value = req.body[key];
    if (value || value === 0) {
      oldFortune[key] = value;
    }
  });
  writeFortunes(fortunes);
  res.json(fortunes);
});

app.delete('/fortunes/:id', (req, res) => {
  const {id} = req.params;
  const newFortunes = fortunes.filter(f => f.id !== Number(id));
  writeFortunes(newFortunes);
  res.json(newFortunes);
});

app.delete('/fortunes', (req, res) => {
  const newFortunes = []
  writeFortunes(newFortunes);
  res.json(newFortunes);
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
