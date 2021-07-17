// Mongo Stuff
var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    numberplate : String,
    lastRecieved: Number,
    allowedEmails : [ 
        {
            email: String
        }
    ]
});

CarSchema.methods.findByCarUid = function(cb) {
    return mongoose.model('Car').find({ CarID: this.CarID }, cb);
};

var CarModel = mongoose.model('Car', CarSchema);

module.exports = {
    schema: CarSchema,
    model: CarModel
}