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

app.post('/PairPhone', (req, res) => {
    if (req.body['email'] == null) {
        res.status(201).send(Errors.MailError);
    } else {
        let token = Auth.GenerateOTP();

        Auth.SendEmail(req.body['email'], "Child Safety System OTP", `Your OTP: ${token.token}`)
            .then((response) => {
                console.log(response);
                Token.model.create({
                    TokenID : token.TokenID,
                    Email : req.body['email'],   
                    Token : token.token,
                    AttemptCounter : 0
                }).then(() => {
                    res.send({'TokenID': token.TokenID});
                })

                
            })
            .catch((err) => {
                console.log(err);
                res.status(401).send(Errors.EmailSendError);
            });
    }
});

app.post('/FinalisePair', (req, res) => {
    let token_id = req.body['TokenID'];

    if (token_id == null) {
        res.status(401).send(Errors.TokenIDNotSupplied);
    } else {
        Token.model({'TokenID' : token_id}).findByID((err, tokens) => {
            if (err) {
                res.send(Errors.InternalServerError);
            } else {
                for (tokenID in tokens) {
                    let token = tokens[tokenID];

                    if (token.Token == req.body['token']) {
                        res.send({
                            'result' : 'success',
                            'jwt' : Auth.GenerateAccessToken({'email': token.Email})
                        });
                        token.remove();
                        return;
                    } else {
                        token.AttemptCounter += 1
                        if (token.AttemptCounter >= 3) {
                            token.remove();
                        } else {
                            token.save();
                        }
                    }
                }
                
                res.status(401).send(Errors.InvalidToken);
            }
        });
    }

    
});

console.log("Connecting to server...");
mongoose.connect('mongodb://localhost/childSafetyService', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => {
        console.log(err)
    })
    .then(() => {
        console.log("Connected to the Ludere DB:)");
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        });
    });

