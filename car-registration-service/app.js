
var CarModel = require('./Car').model;

// Express stuff
const { query, request } = require('express');
const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 3000

// Auth
GenerateToken = require('./Auth').GenerateToken;

// Errors
Errors = require('./Errors');


app.post('/RegisterCar', (req, res) => {
    console.log(req.body)
    if (req.body == null) {
        res.statusCode = 201;
        res.send(Errors.NoBody);

    } else if (req.body['numberplate'] == null || req.body['numberplate'] === '')  {
        res.statusCode = 201;
        res.send(Errors.NoNumberPlate);

    } else {
        let car = {
            CarID : req.body['numberplate'],
            LastRecieved: Math.floor(new Date().getTime() / 1000),
            AuthorizationToken: GenerateToken()
        };

        CarModel(car).findByCarUid((err, cars) => {
            if (cars.length > 0) {
                res.status(401).send({'error':'car already exists'});
            } else {
                CarModel.create(car).then((result) => {
                    res.send(result);
                })
            }
        });
    }
});

console.log("Connecting to server...");
mongoose.connect('mongodb://localhost/childSafetyService', {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Connected to the Ludere DB:)");


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});