// https://www.youtube.com/watch?v=vjf774RKrLc&t=527s 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import environment variables
require('dotenv/config');

// Middleware - Must come prior to the routes import
app.use(cors());
app.use(bodyParser.json());

// Import Routes 
const bookmarkRoute = require('./routes/bookmarks');
const viewRoute = require('./routes/views');

// Middleware 
app.use('/list', bookmarkRoute);
app.use('/', viewRoute);
app.use('/static', express.static('static'));

// Mongoose Connect
mongoose.connect(process.env.CONNECTION_URL), 
    { useNewUrlParser: true},
    { useUnifiedTopology : true },
    () => console.log('Connected to DB');

//Start App
app.listen(3000);