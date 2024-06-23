var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    username: String, 
    password: String,
    level: String, 
    dateCreated: Date, 
    lastAccess: Date, 
},{versionKey: false})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)