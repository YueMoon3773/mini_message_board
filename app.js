const express = require('express');
const path = require('node:path');
require('dotenv').config();

const msgRouter = require('./routes/message');

const bePort = process.env.BE_PORT || 3000;
const app = express();

// Set up views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up static directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Use middleware to get post req, take all data from url and convert to an encoded object to use in req
app.use(express.urlencoded({ extended: true }));

app.listen(bePort, (err) => {
    if (err) console.log(err);
    console.log(`Listen on PORT: ${process.env.PORT !== undefined ? process.env.PORT : 3000}`);
});

app.use('/', msgRouter);

// Handle Not found Error
// app.use((err, req, res, next) => {
//     console.error(err);
//     console.error(err.message);

//     res.status(err.statusCode || 500).render('404', { pageTitle: 'Page not Found' });
// });

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Error' });
});
