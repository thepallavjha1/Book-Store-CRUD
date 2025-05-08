const mongoose = require('mongoose');

const connectDB = async () => {
    
    const conn = await mongoose.connect('mongodb://localhost:27017/KHUDSETRY');
        console.log(`MongoDB Connected`);
    } 


module.exports = connectDB;