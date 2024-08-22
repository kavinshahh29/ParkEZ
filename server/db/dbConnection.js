const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`Database connected : ${connection.connection.host}`);

    }
    catch(err){
        console.error("Error while connectin database ,",err);
    }
}


module.exports =  dbConnection;