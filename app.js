const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log(`Connected to MongoDB Database`) })
.catch((err) => { console.log(`Error connecting to database: ${err}`) });

//View Engines
app.set('view engine', 'ejs');
app.set('views', './view');

//Middlewares
app.use(express.static('public'));

//Start server
app.listen(PORT, () =>{
    console.log(`Connected to port ${PORT}`);

});
















