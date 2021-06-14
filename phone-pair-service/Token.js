// Mongo Stuff
var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    TokenID :Number,
    EmailID : Number,   
    Token : String
});

var TokenModel = mongoose.model('Token', TokenSchema);

module.exports = {
    schema: TokenSchema,
    model: TokenModel
}