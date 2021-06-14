var mongoose = require('mongoose');

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