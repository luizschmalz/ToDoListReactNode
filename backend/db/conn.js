const mongoose = require('mongoose');
require('dotenv').config()

async function main() {

    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('conectado ao banco de dados')
    }

    catch(error){
        console.log(error)
    }

}


module.exports = main