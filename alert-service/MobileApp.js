// Mongo Stuff
var mongoose = require('mongoose');

var MobileAppSchema = new mongoose.Schema({
    phoneNumber :String,
    email : String,   
    fcmToken : String
});

var MobileAppModel = mongoose.model('MobileApp', MobileAppSchema);

module.exports = {
    schema: MobileAppSchema,
    model: MobileAppModel
}