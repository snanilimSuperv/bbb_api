// ---------------------------------- Requirement Load Start ---------------------------------- // 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// ---------------------------------- Requirement Load End ---------------------------------- // 
// Load environment variables from .env file
dotenv.load();

const app = express();
mongoose.connect(process.env.MongoDB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});



app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), function(){
    console.log('App Start on ' + app.get('port'));
})

