var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wine');

var wineSchema = new mongoose.Schema({
    _id: { type : String },
    name: { type : String, unique : true, required : true},
    producer: { type : String },
    image: { data: Buffer, contentType: String },
    country: { type : String },
    type: { type : String },
    grape: { type : String },
    harmonizing: { type : String },
    score: { type : Number },
    reviews: [{username: String, review: String, date: String}]
}, { collection: 'wine' }
);

module.exports = { Mongoose: mongoose, WineSchema: wineSchema }

//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/