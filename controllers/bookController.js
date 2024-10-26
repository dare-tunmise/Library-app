const Book = require('../models/book');


const getBooks = (req, res)=> {
    Book.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('index', {title: 'All Books', books: result});
        })
        .catch((err)=>{
            console.log(err);
        })
}

const postBook = (req, res)=> {
    console.log(req.body);
    const book = new Book(req.body)

    book.save()
        .then((result)=> {
            res.redirect('/books')
        })
        .catch((err)=> {
            console.log(err)
        })
}

const addBook = (req, res)=> {
    res.render('add', {title: 'Add a book'});
}

const getBook = (req, res)=> {

    const id = req.params.id;
    Book.findById(id)
        .then((result)=> {
            res.render('single', {book: result, title: "book detail"});
        })
        .catch((err)=> {
            console.log(err)
        })
}


module.exports = {
    getBooks,
    postBook,
    addBook,
    getBook
}