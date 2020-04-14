const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: String,
  image: String,
  tags: [String],
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;