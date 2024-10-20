const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book')
const app = express();

const dbURI = 'mongodb+srv://daretunmise:daretunmise@nodetuts.gabgh.mongodb.net/library-projects?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
    .then((result)=>{
        app.listen(4000, ()=> {
            console.log('app listening at port 4000');
        });
    })
    .catch((err)=> {
        console.log(err);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

//mongoose and mongo sandbox routes

app.get('/add-book', (req, res)=> {
    const book = new Book({
        title: 'A failed Attempt At Undoing Memories',
        author: 'Dare Tunmise',
        genre: 'Poetry'
    });

    book.save()
        .then((result)=> {
            res.send(result);
        })
        .catch((err)=> {
            console.log(err)
        })
})


app.get('/', (req, res)=>{

    const books = [
        {
            title: 'Native Son',
            author: 'Richard Wright',
            genre: 'Fiction'
        },
        {
            title: 'Delights & Shadows',
            author: 'Ted Kooser',
            genre: 'Poetry'
        },
        {
            title: 'My Ear at his Heart',
            author: 'Hanif Kureishi',
            genre: 'Non-Fiction'
        },
    ]
    res.render("index", { title: 'Homepage', books});
});

app.get('/about', (req, res)=> {
    res.render('about', { title: 'About Library App'})
});

app.get('/about-us', (req, res)=> {
    res.redirect('/about')
});

app.get('/books/add', (req, res)=> {
    res.render('add', {title: 'Add a book'});
});

app.use((req, res)=>{
    res.status(404).render('404');
})