const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(4000, ()=> {
    console.log('app listening at port 4000');
});

app.get('/', (req, res)=>{
    res.render("index", { title: 'Homepage'});
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