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

CarSchema.methods.findByEmail = function(cb) {
    console.log(`Searching for ${this.allowedEmails}`)
    const email = this.allowedEmails[0].email;

    mongoose.model('Car').find({}, (err, cars) => {
        if (err) {
            cb(err);
        } else {
            cb(err, cars.filter((car) => {
                let contains = false

                car.allowedEmails.forEach((allowedEmail) => {
                    if (allowedEmail.email == email) {
                        contains = true;
                    }
                });

                return contains;
            }));
        }
    });
};

var CarModel = mongoose.model('Car', CarSchema);

module.exports = {
    schema: CarSchema,
    model: CarModel
}