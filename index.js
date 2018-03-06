const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// getting-started.js
const mongoose = require('mongoose');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// mongoose database connection
mongoose.connect('mongodb://localhost/pro_aDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
}); 

// Schema Creation
let userData = new mongoose.Schema;
userData = {
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
};
const user = mongoose.model('user', userData);

// APIs Creating
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/register', (req, res) => {
    let value = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    };
    user.create(value, (err, records) => {
        if(err) return res.json('err');
        else return res.json('data saved');
    });
});
// Port Listens
app.listen(3001, () => console.log('Example app listening on port 3001!'));