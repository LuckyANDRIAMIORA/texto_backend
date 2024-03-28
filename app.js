var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')

var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    if (parseInt(err.message) == 422) {
        res.status(parseInt(err.message)).set('Invalid data provided')
    } else if (parseInt(err.message) == 404) {
        res.status(parseInt(err.message)).set('Data not found')
    } else if (parseInt(err.message) == 403) {
        res.status(parseInt(err.message)).set('Access deneid')
    }
    res.end()
})

module.exports = app;
