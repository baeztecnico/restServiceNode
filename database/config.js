
const mongoose = require('mongoose');
const dbConnection = async()=>{
try {
    mongoose.connect(process.env.MONGO_ATLAS,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    console.log('Base de datos Online');
} catch (error) {
    console.log(error);
    throw new Error('Algo salio mal :(')
}
}

module.exports ={
    dbConnection
}