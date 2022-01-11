const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  sourceName: {
    type: String,
    required: true,
  },
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
