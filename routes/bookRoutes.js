const express = require('express');

const Book = require('../models/book')

const {
    getBooks,
    postBook,
    addBook,
    getBook
} = require('../controllers/bookController')

const Router = express.Router();

Router.get('/books', getBooks);

Router.post('/books', postBook)

Router.get('/books/add', addBook);

Router.get('/books/:id', getBook)



module.exports = Router;
