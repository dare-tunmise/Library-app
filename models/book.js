const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    tile: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;