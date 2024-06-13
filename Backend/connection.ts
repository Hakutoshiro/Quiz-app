const mongoose = require('mongoose');

const mongoConnection = async (URL: string) =>{
    return await mongoose.connect(URL);
    
}

module.exports = {
    mongoConnection
}