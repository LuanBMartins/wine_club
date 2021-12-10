var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lucasblazzi:senha_trabalho_unifei@cluster0.gojct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

var wineSchema = new mongoose.Schema({
    id: { type : Number },
    name: { type : String, unique : true, required : true},
    producer: { type : String },
    image: { type: String },
    country: { type : String },
    type: { type : String },
    grape: { type : String },
    harmonizing: { type : Array },
    score: { type : Number },
    reviews: [{user_id: Number, name: String, review: String, date: String, score: Number}]
}, { collection: 'wine' }
);

module.exports = { Mongoose: mongoose, WineSchema: wineSchema }
