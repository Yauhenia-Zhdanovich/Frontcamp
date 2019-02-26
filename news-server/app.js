const express = require('express');
const app = express();
const routes = require('./routes/routes');
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

mongoose.connect('mongodb://news-app:zx885623ZX@news-rest-app-shard-00-00-bdv0l.mongodb.net:27017,news-rest-app-shard-00-01-bdv0l.mongodb.net:27017,news-rest-app-shard-00-02-bdv0l.mongodb.net:27017/test?ssl=true&replicaSet=news-rest-app-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser: true})
// mongoose.connect('mongodb://localhost:27017/frontcamp', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});