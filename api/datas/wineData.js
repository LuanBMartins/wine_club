const db = require("../models/wine");
const Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');

exports.searchWine = (itens) => {
    return Wines.find(itens)
}