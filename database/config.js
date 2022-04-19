const mongoose = require('mongoose');


const  dbConnection = () =>{

try {


  mongoose.connect(process.env.DBCONNECTION);
    
    console.log("Connect to Database");
    
} catch (error) {
    console.log(error);
    throw new Error('Error for init connection with the database')
}


}

module.exports = {dbConnection}