var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Create new wine and add to user
router.post('/', (req, res) => {
  var db = require("../models/wine");
  var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

  Wines.find().sort({"_id" : -1}).limit(1).exec(
    function (e, r) {
      var id = r[0] ? r[0].id : 0;
      var wine = new Wines({
        "id": id + 1,
        "name": req.body.name.substring(0, 150),
        "producer": req.body.producer.substring(0, 150),
        "image": req.body.image,
        "country": req.body.country.substring(0, 150),
        "type": req.body.type.substring(0, 150),
        "grape": req.body.grape.substring(0, 150),
        "harmonizing": req.body.harmonizing,
        "score": 0,
        "reviews": [],
      })

      var dbu = require("../models/user");
      var Users = dbu.Mongoose.model('usercollection', dbu.UserSchema, 'usercollection');
      
      Users.updateOne({id: parseInt(req.body.user_id)}, {$push: {wines: id + 1}}).exec()
      wine.save(
        function (f, re) {
          res.json(re);
        })
  })
})


// Read wine
router.get('/:id?', (req, res) =>{
  var db = require("../models/wine");
  var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

  Wines.findOne({"id": parseInt(req.params.id)}).lean().exec(
    function (e, wine) {
      res.json(wine);
    })
})


// update wine
router.patch('/:id', (req, res) =>{
  var db = require("../models/wine");
  var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');
  
  Wines.findOneAndUpdate({id: parseInt(req.params.id)}, req.body, {new: true}).exec(
    function (f, r) {
      res.json(r);
  })
})


// Delete wine
router.delete('/:id', (req, res) =>{
  var db = require("../models/wine");
  var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

  Wines.find({"id": parseInt(req.params.id)}).remove().exec(
    function (e, r) {
      res.json(r);
    })
})


// rate wine
router.patch('/rate/:id', (req, res) =>{
    var db = require("../models/wine");
    var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');
    
    let review = req.body;
    review.date = new Date().toISOString().slice(0, 10)
    const rate = parseFloat(review.score);

    Wines.findOne({"id": parseInt(req.params.id)}).lean().exec(
        function (e, wine) {
            let new_rate = (wine.score + rate) / (wine.reviews.length + 1);
    
            Wines.findOneAndUpdate(
                {id: parseInt(req.params.id)}, 
                {$push: {reviews: review}, $set: {score: new_rate}}, 
                {new: true}
                ).exec(
                    function (f, r) {
                        res.json(r);
                    })
            })
})


// list wines
router.get('/list', (req, res) =>{
    var db = require("../models/wine");
    var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');
  
    Wines.find({}).select('name').lean().exec(
      function (e, wines) {
        res.json(wines);
      })
})

router.post('/search/advanced', async (req, res) => {
  try {
    const wineService = require('../services/wineService')
    const itens = req.body
    const response = await wineService.searchWine(itens)
    res.send(response)
  
  } catch (error) {
    if(error.message === 'Filtros indefinidos') 
      res.status(400).send({erro: error.message})
    else
      res.status(500).end()
  }
})

module.exports = router;


// wine crud
// wine login
// wine crud
// wine list by register
// search suggest?
// advanced search