const db = require("../models/wine");
const Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

exports.findAll = () => {
    return Wines.find().select('name')
}

exports.searchWine = (itens) => {
    console.log(itens);
    return Wines.find(itens, { _id: 0 })
}

exports.searchId = (consult) => {
    console.log(consult);
    return Wines.find(consult)
}