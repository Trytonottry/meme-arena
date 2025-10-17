const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { port } = require('./config');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use('/api', routes);

// serve uploaded images (if you add upload feature later)
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.get('/', (req, res) => {
  res.json({ name: 'Meme Arena API', version: '1.0' });
});

app.listen(port, () => {
  console.log(`Meme Arena backend listening on ${port}`);
});
