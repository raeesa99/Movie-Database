const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) =>{
    console.log(fetch);
    res.render('index', {pageName: 'Home'});
});

app.get('/movies', (req, res) => {
    res.render('about', {pageName: 'movies'});
});

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(8000, () => {
    console.log('server is listening on http:localhost:8000')
});