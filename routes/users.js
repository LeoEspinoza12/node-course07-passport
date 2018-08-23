var express = require('express');
const bodyParser = require('body-parser')
const User = require('../models/user')
var router = express.Router();

router.use(bodyParser.json());


const passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//////////////////////////////////////////////////////////////////////
router.post('/signup', (req, res, next) => {
  
  // User.findOne({username: req.body.username})
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({"jsonErr": {err: err}})
      }
        else{
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration successfull'})
          });
        }
    })
});


//////////////////////////////////////////////////////////////////////
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are succcessfully logged in'})
 


})


//////////////////////////////////////////////////////////////////////
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


module.exports = router;

