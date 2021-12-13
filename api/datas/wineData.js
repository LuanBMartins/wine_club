const db = require("../models/wine");
const Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

const dbUser = require("../models/user")
const User = dbUser.Mongoose.model('usercollection', dbUser.UserSchema, 'usercollection');

exports.findAll = () => {
    return Wines.find().select('name')
}

exports.searchWine = (itens) => {
    console.log(itens);
    return Wines.find(itens, { _id: 0 })
}

exports.searchIdWine = (filter) => {
    return Wines.findOne(filter).select('id')   
}

exports.searchId = (consult) => {
    console.log(consult);
    return Wines.find(consult)
}

exports.searchUser = (filter) => {
    return User.findOne(filter).select('wines')
}

exports.attWineLista = (id, wine) => {
    return User.updateOne(id, wine)
}