const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('./config/passport')(passport);

var app = express();
const PORT = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/google-oauth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log(`listening at ${PORT}`));
