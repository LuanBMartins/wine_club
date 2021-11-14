var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wine_club');

var userSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required : true },
    email: { type : String, unique : true, required : true},
    password: { type: String, required : true },
    wines: { type: Array },
}, { collection: 'user' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }