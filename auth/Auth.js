require('dotenv').config()

const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_PASSWORD
  }
});

function GenerateAccessToken(body) {
    return jwt.sign(body, process.env.TOKEN_SECRET, { });
}

function AuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
  
      req.user = user
      res.setHeader('Content-Type', 'application/json');
      next();
    });
}
function generateRandomString(length) {
  var result           = '';
  var characters       = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function GenerateOTP() {

    return {
      token : generateRandomString(5), 
      tokenID :generateRandomString(40)
    };
}

function SendEmail(email, subject, body) {
  var mailOptions = {
    from: process.env.NODE_EMAIL,
    to: email,
    subject: subject,
    text: body
  };
  
  return new Promise((resolve, reject) => {

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error);
      } else {
        resolve('Email sent: ' + info.response);
      }
    });
  });
}

function GetPayload(req) { 
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  return jwt.decode(token)
}


module.exports = {
    GenerateAccessToken: GenerateAccessToken,
    AuthenticateToken : AuthenticateToken,
    GenerateOTP: GenerateOTP,
    SendEmail: SendEmail,
    GetPayload: GetPayload
};