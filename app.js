require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbURI = process.env.dbURI;
const Book = require('./models/book');
const app = express();
const bookRoutes = require('./routes/bookRoutes')

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
app.use(express.urlencoded({ extended: true}));

//mongoose and mongo sandbox routes

app.get('/add-book', (req, res)=> {
    const book = new Book({
        title: 'What the twilight says',
        author: 'Derek Walcott',
        genre: 'Non-Fiction'
    });

    book.save()
        .then((result)=> {
            res.send(result);
        })
        .catch((err)=> {
            console.log(err)
        })
})

app.get('/all-books', (req, res)=>{
    Book.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/single-book', (req, res)=>{
    Book.findById('671595be3ab3d076a2fa586c')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
})


app.get('/', (req, res)=>{
    res.redirect('/books');
});


app.use(bookRoutes);

app.get('/about', (req, res)=> {
    res.render('about', { title: 'About Library App'})
});

app.get('/about-us', (req, res)=> {
    res.redirect('/about')
});



app.use((req, res)=>{
    res.status(404).render('404', { title: 'Page not found'});
});