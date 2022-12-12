const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) =>{
    res.render('home', {pageName: 'Home'});
});


app.get('/', (req, res) => {
    res.send('hello')
});

app.get('/movies', async (req, res) => {
    let data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=caf170e550f9e4c80f6cd7464404b60b&language=en-GB&page=1')
    data = await data.json();
    // console.log(data);

    let obj = [
        {title: data.results[0].original_title,
        image: data.results[0].poster_path}
    ];

    //for each title and image, obj.push info

        console.log(obj);
        res.render('movies', obj);
});

app.get('/movieinfo', (req, res) => {
    res.render('movieinfo', {obj});
});

app.get('/movies/:movieID', (req, res) => {
    res.render('movieinfo', obj[req.params.movieID]);
});

app.listen(5000, () => {
    console.log('app listening on http://localhost:5000')
});