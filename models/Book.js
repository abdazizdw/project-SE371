const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    authors: String,
    bookName: String,
    imgSrc: String
});

module.exports = mongoose.model('Book', bookSchema);