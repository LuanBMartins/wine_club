const wineService = require('../services/wineService')
var express = require('express');
var router = express.Router();
const upload = require('../services/upload')


// Create new wine and add to user
router.post('/', async (req, res) => {
  try {
    res.send(upload(req.body))

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error.message || 'unexpected error')
  }
  
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

// update wine wine reviews
router.patch('/:id/review', async (req, res) =>{
  try {
    const id = req.params.id
    const review = req.body
    const response = await wineService.attWineReview(id, review)
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error.message || 'unexpected error')
  }
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
            const scores = wine.reviews.map(a => a.score);
            const old_rate = scores.reduce((a, b) => a + b, 0)
            const new_rate = (old_rate + review.score) / (scores.length + 1);
    
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
