const express = require('express');

const Book = require('../models/book')

const Router = express.Router();

Router.get('/books', (req, res)=>{
    Book.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('index', {title: 'All Books', books: result});
        })
        .catch((err)=>{
            console.log(err);
        })
});

Router.post('/books', (req, res)=> {
    console.log(req.body);
    const book = new Book(req.body)

    book.save()
        .then((result)=> {
            res.redirect('/books')
        })
        .catch((err)=> {
            console.log(err)
        })
})

Router.get('/books/add', (req, res)=> {
    res.render('add', {title: 'Add a book'});
});

Router.get('/books/:id', (req, res)=> {

    const id = req.params.id;
    Book.findById(id)
        .then((result)=> {
            res.render('single', {book: result, title: "book detail"});
        })
        .catch((err)=> {
            console.log(err)
        })
})



module.exports = Router;
