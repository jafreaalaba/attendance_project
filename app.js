const express = require('express');
const mongoose = require('mongoose');
const app = express();
//install in the terminal npm i yamljs swagger-ui-express
//create the swagger.yaml in the root and type the 2 requires line 6 and 7
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const PORT = process.env.PORT || 3000;

//Swagger Documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log(`Connected to MongoDB Database`) })
.catch((err) => { console.log(`Error connecting to database: ${err}`) });

//View Engines
app.set('view engine', 'ejs');
app.set('views', './views');

//Middlewares
app.use(express.static('public'));
app.use((err, res, req, next) =>{
    console.error(err.stack);
    res.status.send('Internal Server Error');
    next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', authRoutes);
app.use('/', studentRoutes);




//Start server
app.listen(PORT, () =>{
    console.log(`Connected to port ${PORT}`);

});
















