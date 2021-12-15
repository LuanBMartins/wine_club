const fs = require('fs')
const cloudinary = require('cloudinary').v2

module.exports = async (data) => {
    cloudinary.config({ 
        cloud_name: 'dbwxmgdkv', 
        api_key: '558144845664214', 
        api_secret: 'U5gMF-e-094mzwOcW9wCMyWYFyk' 
      });

    return new Promise((resolve, reject) => {
        resolve(
            fs.appendFile('mynewfile1.jpeg', Buffer.from(data.image, 'base64'), function (err) {
                if (err) throw err;
                cloudinary.uploader.upload("mynewfile1.jpeg", function(error, result) {
                  if(!error){
    
                    fs.unlink('mynewfile1.jpeg', function (err) {
                      if (err) throw err;


                    var db = require("../models/wine");
                    var Wines = db.Mongoose.model('winecollection', db.WineSchema, 'winecollection');
    
                    Wines.find().sort({"_id" : -1}).limit(1).exec(
                      function (e, r) {
                        const id = r[0] ? r[0].id : 0;
                        console.log(id);
                        var wine = new Wines({
                          "id":  id ? id + 1 : 1,
                          "name": data.name.substring(0, 150),
                          "producer": data.producer.substring(0, 150),
                          "image": result.url,
                          "country": data.country.substring(0, 150),
                          "type": data.type.substring(0, 150),
                          "grape": data.grape.substring(0, 150),
                          "harmonizing": data.harmonizing,
                          "price": data.price,
                          "score": 0,
                          "reviews": [],
                        })
                
                        var dbu = require("../models/user");
                        var Users = dbu.Mongoose.model('usercollection', dbu.UserSchema, 'usercollection');
                        
                        Users.updateOne({id: parseInt(data.user_id)}, {$push: {wines: id + 1}}).exec()
                        wine.save(
                          function (error, re) {
                            if(error){
                              res.status(400).send(error)
                            }
                            return re
                          })
                    })

                    });
                  }
                });
            })
        )
    })

}