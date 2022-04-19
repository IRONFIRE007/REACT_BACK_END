const express = require('express');
const {dbConnection}  = require('./database/config');
const cors = require('cors');
require('dotenv').config();



//Server 
const app = express();

//Public 
app.use(express.static('public'));

//Routes

//Read  and Parse

app.use(express.json());

// DataBase

dbConnection();


// Cors

app.use(cors());

//Auth Routes  host + /api/auth

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

//Listening on
app.listen(process.env.PORT,()=>{
    console.log(`Server Runnig on Port ${process.env.PORT}`);
});


