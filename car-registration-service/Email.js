// Mongo Stuff
var mongoose = require('mongoose');

var EmailSchema = new mongoose.Schema({
    EmailID :Number,
    CarID : String,   
    Email : String
});

var EmailModel = mongoose.model('Email', EmailSchema);

module.exports = {
    schema: EmailSchema,
    model: EmailModel
}