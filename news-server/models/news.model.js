const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  content: String,
  urlToImage: String,
  url: String,
  author: String,
  source: String,
  publishedAt: Date
});

module.exports = mongoose.model('News', newsSchema)
