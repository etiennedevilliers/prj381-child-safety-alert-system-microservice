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

app.post('/PairPhone', (req, res) => {
    if (req.body['email'] == null) {
        
    }

});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

