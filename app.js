const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('views', path.join(__dirname, 'views')); // letting express know that we will use views directory as views
app.set('view engine', 'ejs'); //we are letting express know that setting up templating engine aka view engine as ejs

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
        // res.statusCode = 200;

        // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
        // res.sendFile(htmlFilePath);
        res.render('index');
});

app.get('/restaurants', function (req, res) {
        //read the html file
        // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
        // res.sendFile(htmlFilePath);
        const filePath = path.join(__dirname, 'data', 'restaurant.json');
        const fileData = fs.readFileSync(filePath);
        const storedRestaurants = JSON.parse(fileData);
        res.render('restaurants', {
                numberOfRestaurants: storedRestaurants.length,
                restaurants: storedRestaurants,
        });
});

app.get('/recommend', function (req, res) {
        //read the html file
        // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
        // res.sendFile(htmlFilePath);
        res.render('recommend');
});

app.post('/recommend', function (req, res) {
        const restaurant = req.body;
        const filePath = path.join(__dirname, 'data', 'restaurant.json');
        const fileData = fs.readFileSync(filePath);
        const storedRestaurants = JSON.parse(fileData);
        storedRestaurants.push(restaurant);
        fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
        res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
        //read the html file
        // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
        // res.sendFile(htmlFilePath);
        res.render('confirm');
});

app.get('/about', function (req, res) {
        //read the html file
        // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
        // res.sendFile(htmlFilePath);
        res.render('about');
});
app.listen(3000);
