const wineService = require('../services/wineService')
var express = require('express');
var router = express.Router();

// Create new wine and add to user
router.post('/', (req, res) => {
  var db = require("../models/wine");
  var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

  Wines.find().sort({"_id" : -1}).limit(1).exec(
    function (e, r) {
      const id = r[0] ? r[0].id : 0;
      console.log(id);
      var wine = new Wines({
        "id":  id ? id + 1 : 1,
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
        function (error, re) {
          if(error){
            res.status(400).send(error)
          }
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

// update user wine-list
router.patch('/user/:id', async (req, res) =>{
  try {
    userId = req.params.id
    wine = req.body.name
    const response = await wineService.attWineLista(userId, wine)
    res.status(200).send(response)
  } catch (error) {
    res.status(error.status || 500).send(error.message || 'unexpected error')
  }
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


// Retornar somente o nome de todos os vinhos
router.get('/search/names', async (req, res) =>{
  try {
    const response = await wineService.findAll()
      res.status(200).send(response)
  } catch (error) {
    res.status(error.status || 500).send(error.message || 'unexpected error')
  }
})

// Busca avançada de vinhos
router.post('/search/advanced', async (req, res) => {
  try {
    const itens = req.body
    console.log(itens)
    const response = await wineService.searchWine(itens)
    console.log(response);
    res.send(response)
  
  } catch (error) {
    res.status(error.status || 500).send(error.message || 'unexpected error')
  }
})

router.get('/search/wines/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await wineService.searchId(id)
    console.log(response);
    res.send(response)
  
  } catch (error) {
    res.status(error.status || 500).send(error.message || 'unexpected error')
  }
})

module.exports = router;
