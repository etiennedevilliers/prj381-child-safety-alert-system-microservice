// Mongo Stuff
var mongoose = require('mongoose');

console.log("Connecting to server...");
mongoose.connect('mongodb://db.ludere.co.za/childSafetyService', {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Connected to the Ludere DB:)");

var CarSchema = new mongoose.Schema({
    CarID : String,
    LastRecieved: Number,
    AuthorizationToken: String
});

var CarModel = mongoose.model('Car', CarSchema);

module.exports = {
    schema: CarSchema,
    model: CarModel
}