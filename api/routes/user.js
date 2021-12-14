var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Create new user
router.post('/', (req, res) => {
  var db = require("../models/user");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  Users.find().sort({"_id" : -1}).limit(1).exec(
    function (e, r) {
      var id = r[0] ? r[0].id : 0;
      var user = new Users({
        "id": id + 1,
        "name": req.body.name.substring(0, 150),
        "email": req.body.email.substring(0, 150),
        "password": req.body.password.substring(0, 150),
        "wines": [],
      })
      user.save(
        function (f, re) {
          res.json(re);
        })
  })
})


// Read user
router.get('/:id?', (req, res) =>{
  var db = require("../models/user");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  Users.findOne({"id": parseInt(req.params.id)}).lean().exec(
    function (e, user) {
      console.log(user);
      res.json(user);
    })
})


// update user
router.patch('/:id', (req, res) =>{
  var db = require("../models/user");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  
  Users.findOneAndUpdate({id: parseInt(req.params.id)}, req.body, {new: true}).exec(
    function (f, r) {
      res.json(r);
  })
})


// Delete user
router.delete('/:id', (req, res) =>{
  var db = require("../models/user");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  Users.find({"id": parseInt(req.params.id)}).remove().exec(
    function (e, r) {
      res.json(r);
    })
})


// Login user
router.post('/login', (req, res) =>{
  var db = require("../models/user");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  console.log(req.body)
  Users.find({
    "email": req.body.email.substring(0, 150),
    "password": req.body.password.substring(0, 150)
  }).findOne().exec(
    function (e, user) {
      console.log(user);
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