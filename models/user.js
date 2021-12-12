var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lucasblazzi:senha_trabalho_unifei@cluster0.gojct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

var userSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required : true },
    email: { type : String, unique : true, required : true},
    password: { type: String, required : true },
    wines: { type: Array },
}, { collection: 'user' }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema }