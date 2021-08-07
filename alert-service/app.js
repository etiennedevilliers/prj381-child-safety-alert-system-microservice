require('dotenv').config();

// Mongo Stuff
var mongoose = require('mongoose');
var CarModel = require('./Car').model;
var MobileAppModel = require('./MobileApp').model;

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
const https = require('https');
const port = 3000
const registrationToken = process.env.FCM_SECRET;
// Auth
const Auth = require('../auth/Auth');

// Errors
Errors = require('../Errors');

app.post('/api/alert', Auth.AuthenticateToken, (req, res) => {
    const payload = Auth.GetPayload(req);

    CarModel.findOne({
        numberplate: payload.numberplate
    }).then((cars, err) => {
        if (err) {
            console.log(err);
            res.status(500).send(Errors.InternalServerError);
        } else {
            cars.allowedEmails.forEach((allowedEmail) => {
                MobileAppModel.find({email: allowedEmail.email}).then((mobileApps, err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(Errors.InternalServerError);
                    } else {
                        let counter = 0;
                        mobileApps.forEach((mobileApp) => {

                            const data = JSON.stringify({
                                "to":mobileApp.fcmToken,
                                "notification":{
                                    "title":"ALERT",
                                    "body":"ALERT!!!!"
                                }
                            });

                            const options = {
                                hostname: 'fcm.googleapis.com',
                                port: 443,
                                path: '/fcm/send',
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Content-Length': data.length,
                                  'Authorization': `key=${registrationToken}`
                                }
                              }
                            
                            const request = https.request(options, response => {
                                console.log(`statusCode: ${response.statusCode}`);
                              
                                response.on('data', d => {
                                  process.stdout.write(d);
                                });
                            });
                              
                            request.on('error', error => {
                                console.error(error);
                            })
                            
                            request.write(data);
                            request.end();

                            counter += 1;
                        });

                        res.status(200).send({amountSent: counter});
                    }
                });
            });
        }
    });
});

console.log("Connecting to server...");
mongoose.connect('mongodb://mongo/childSafetyService', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        console.log(err)
    })
    .then(() => {
        console.log("Connected to the Ludere DB:)");
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    });
