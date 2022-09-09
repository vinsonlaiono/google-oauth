const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const path =  require('path')
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 3000;

var app = express();
require('./config/passport')(passport);

module.exports = function(){
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));
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
}