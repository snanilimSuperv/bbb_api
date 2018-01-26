//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Requirement Load Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const request = require('request');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Requirement Load End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
// Load environment variables from .env file
dotenv.load();

const app = express();
mongoose.connect(process.env.MongoDB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});


//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Model Load Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
const User = require('./models/User');
//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Model Load End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 


//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Load Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
const userController = require('./controllers/userController');
//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Load End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 



//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Maping Start  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ // 
app.post('/signup', userController.userSignUp)
//  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ Controllers Maping End  =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ //



// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
// BASE64 ENCODE
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

// var base64 = require('base-64');
// var encoded = '';
// var decoded = base64.encode(encoded);
// var bytes = base64.decode(decoded);
// console.log(decoded);
// console.log(bytes);


// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());


app.listen(app.get('port'), function(){
    console.log('App Start on ' + app.get('port'));
})




