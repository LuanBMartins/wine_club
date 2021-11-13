var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Create new user
router.post('/user', (req, res) => {
  var db = require("../models/user_model");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  var user = new Users({
    "name": req.body.name.substring(0, 150),
    "email": req.body.email.substring(0, 150),
    "password": req.body.password.substring(0, 11),
    "wines": [],
  })
  user.save(
    function (f, r) {
      res.json(r);
    })
})


// Read user
router.get('/user/:id?', (req, res) =>{
  var db = require("../models/user_model");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  Users.find({"_id": req.params.id}).lean().exec(
    function (e, user) {
      res.json(user);
    })
})


// update user
router.patch('/user/:id', (req, res) =>{
  var db = require("../models/user_model");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  
  Users.updateOne({_id: req.params.id}, req.body).exec(
    function (f, r) {
      res.json(r);
  })
})


// Delete user
router.delete('/user/:id', (req, res) =>{
  var db = require("../models/user_model");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  Users.find({"_id": parseInt(req.params.id)}).remove().exec(
    function (e, r) {
      res.json(r);
    })
})


// Login user
router.post('/login', (req, res) =>{
  var db = require("../models/user_model");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  Users.find({
    "username": req.body.username.substring(0, 150),
    "password": req.body.password.substring(0, 150)
  }).lean().exec(
    function (e, user) {
      res.json(user);
    })
})

module.exports = router;


// user crud
// user login
// wine crud
// wine list by register
// search suggest?
// advanced search