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
        genre: 'Non-Fiction',
        year: 2025,
        description: "This collection forms a volume of remarkable elegance, concision, and brilliance. It includes Walcott's moving and insightful examinations of the paradoxes of Caribbean culture, his Nobel lecture, and his reckoning of the work and significance of such poets as Robert Lowell, Joseph Brodsky, Robert Frost, Les Murray, and Ted Hughes, and of prose writers such as V. S. Naipaul and Patrick Chamoiseau."
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

app.get('/single', (req, res)=> {
    res.render('single', { title: 'book detail'});
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