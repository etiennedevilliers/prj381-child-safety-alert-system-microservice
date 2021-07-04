// Mongo Stuff
var mongoose = require('mongoose');

var MobileAppSchema = new mongoose.Schema({
    MobileID :Number,
    EmailID : Number,   
    PushToken : String
});

var MobileAppModel = mongoose.model('MobileApp', MobileAppSchema);

module.exports = {
    schema: MobileAppSchema,
    model: MobileAppModel
}