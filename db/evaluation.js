var config = require('../config')
var MongoClient = require('mongodb').MongoClient

var db
var collection
MongoClient.connect(config.MONGO_URL, (err, database) => {
    if(!err){
        console.log('Connection Established to MongoDB')
        db = database
        collection = db.collection('evaluations')
    }else{
        console.log('Not possible to established the connection to MongoDB')
    }
})

module.exports = {
    register: ( data, handler ) => {
        collection.insertOne(data, (err, result) =>{
            handler(err, result)
        })
    },
    findUser: (data, handler) => {
        collection.findOne(data, (err, result) => {
            handler(err, result)
        })
    },
    findAll:(handler) => {
        collection.find((err, result) => {
            handler(err, result)
        })
    },
    findBook:(data, handler) => {
        collection.find(data, (err,result ) => {
            handler(err, result)
        })
        
    }
   
}