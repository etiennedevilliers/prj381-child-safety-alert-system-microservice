// Mongo Stuff
var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    tokenID : String,
    email : String,   
    phoneNumber: String,
	fcmToken : String,
    token : String,
    attemptCounter : Number
});

var TokenModel = mongoose.model('Token', TokenSchema);

module.exports = {
    schema: TokenSchema,
    model: TokenModel
}