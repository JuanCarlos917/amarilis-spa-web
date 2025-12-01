const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML or Markdown
    author: { type: String, default: 'Amarilis Team' },
    tags: [String],
    image: { type: String },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
