// Mongo Stuff
var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    TokenID : String,
    Email : String,   
    Token : String,
    AttemptCounter : Number
});

TokenSchema.methods.findByID = function(cb) {
    return mongoose.model('Token').find({ TokenID: this.TokenID }, cb);
};

var TokenModel = mongoose.model('Token', TokenSchema);

module.exports = {
    schema: TokenSchema,
    model: TokenModel
}