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

exports.searchReviews = (consult) => {
    console.log(consult);
    return Wines.findOne(consult).select('reviews')
}

exports.attWineReview = (id, review) => {
    return Wines.updateOne(id, review)
}


exports.searchUser = (filter) => {
    return User.findOne(filter).select('wines')
}

exports.attWine = (id, wine) => {
    return User.updateOne(id, wine)
}

exports.attScores = async (id, review) => {
    Wines.findOne({"id": id}).lean().exec(
        function (e, wine) {
            const scores = wine.reviews.map(a => a.score);
            const old_rate = scores.reduce((a, b) => a + b, 0)

            const new_rate = (old_rate + review.score) / (scores.length + 1);

            console.log('DEBUGGER NEW RATE',new_rate);
    
            Wines.findOneAndUpdate(
                {id: parseInt(id)}, 
                {$push: {reviews: review}, $set: {score: new_rate}}, 
                {new: true}
                ).exec(
                    function (f, r) {
                        if(f){
                            return false
                        }

                        return r
                    })
    })
}