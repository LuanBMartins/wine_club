var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user');

var userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required : true },
    email: { type : String, unique : true, required : true},
    password: { type: String, required : true },
    wines: { type: Array },
}, { collection: 'user' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }