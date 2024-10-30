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
// const getBooks = async (req, res) => {
//     try {
//         const books = await Book.find().sort({ createdAt: -1 });
//         res.render('index', { title: 'All Books', books });
//     } catch (err) {
//         console.error(err);
//     }
// };


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

const getBook = async (req, res)=> {

    try {
        const id = req.params.id;
        const book = await Book.findById(id)
        res.render('single', {book, title: "book detail"});
    }  catch(err){
        console.log(err)
    }
}

// const id = req.params.id;
// Book.findById(id)
//     .then((result)=> {
//         res.render('single', {book: result, title: "book detail"});
//     })
//     .catch((err)=> {
//         console.log(err)
//     })


module.exports = {
    getBooks,
    postBook,
    addBook,
    getBook
}