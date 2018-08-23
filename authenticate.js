
// this file is to store the
// AUTHENTICATION PASSPORT STRATEGY


const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;

var User = require('./models/user')


// use static authenticate method of model in LocalStrategy
const local = passport.use(new LocalStartegy(User.authenticate()))
module.exports = local

// exports.local = passport.use(new LocalStartegy(User.authenticate()))


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
// use static serialize and deserialize of model for passport session support
passport.deserializeUser(User.deserializeUser())



