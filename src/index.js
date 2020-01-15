const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(
  'mongodb+srv://deonocf:maluquinho1@cluster0-tsgqh.mongodb.net/Cluster0?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
console.log('listening at 3333....');
