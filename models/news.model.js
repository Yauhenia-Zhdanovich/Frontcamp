const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  text: String,
  date: Date 
});

module.exports = mongoose.model('News', newsSchema)
