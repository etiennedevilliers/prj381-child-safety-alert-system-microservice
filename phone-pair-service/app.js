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

// Other
const Errors = require('../Errors');
const Auth = require('../auth/Auth');

// Mongoose stuff
var mongoose = require('mongoose');
const Token = require('./Token');
const MobileApp = require('./MobileApp');
var CarModel = require('./Car').model;

app.post('/api/phone/PairPhone', (req, res) => {
    if (req.body['email'] == null) {
        res.status(201).send(Errors.MailError);
    } else {
        let token = Auth.GenerateOTP();

        Auth.SendEmail(req.body['email'], "Child Safety System OTP", `Your OTP: ${token.token}`)
            .then((response) => {
                console.log(response);
                Token.model.create({
                    tokenID : token.tokenID,
                    email : req.body['email'],   
                    phoneNumber: req.body['phoneNumber'],
	                fcmToken : req.body['fcmToken'],
                    token : token.token,
                    attemptCounter : 0
                }).then(() => {
                    res.send({'tokenID': token.tokenID});
                })

                
            })
            .catch((err) => {
                console.log(err);
                res.status(401).send(Errors.EmailSendError);
            });
    }
});

app.post('/api/phone/FinalisePair', (req, res) => {
    let token_id = req.body['tokenID'];

    console.log("/api/phone/FinalisePair");

    if (token_id == null) {
        res.status(401).send(Errors.TokenIDNotSupplied);
    } else {
        Token.model.findOne({'tokenID' : token_id})
            .then((token) => {
                if (token) {
                    if (token.token == req.body['token']) {
                        // Create MobileApp
                        
                        MobileApp.model.create({
                            phoneNumber : token.phoneNumber,
                            email : token.email,   
                            fcmToken : token.fcmToken
                        }).then((mobileApp) => {
                            res.send({
                                'result' : mobileApp,
                                'jwt' : Auth.GenerateAccessToken({
                                    email: mobileApp.email,
                                    phoneNumber: mobileApp.phoneNumber
                                })
                            });
                            token.remove();
                        }).catch((err) => {
                            console.error(err);
                            res.status(500).send(Errors.InternalServerError);
                        });
                    } else {
                        token.AttemptCounter += 1
                        if (token.AttemptCounter >= 3) {
                            token.remove();
                        } else {
                            token.save();
                        }

                        res.status(401).send(Errors.InvalidToken);
                    }
                } else {
                    res.status(401).send(Errors.InvalidToken);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(Errors.InternalServerError);
            });

    }
});

app.get('/api/phone/MyCars', Auth.AuthenticateToken, (req, res) => {
    const payload = Auth.GetPayload(req);

    CarModel({
        allowedEmails : [
            { email: payload.email }
        ]
    }).findByEmail((err, cars) => {
        if (err) {
            console.error(err);
            res.status(500).send(Errors.InternalServerError);
        } else {
            res.status(200).send({
                cars: cars
            });
        }
    })
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

