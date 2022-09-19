const mongoose = require('mongoose')
const mongoDB = "mongodb://localhost:27017/syoft"
// const mongoDB = "mongodb+srv://syoft:syoft@cluster0.nozqw.mongodb.net/?retryWrites=true&w=majority";

module.exports = ()=>mongoose.connect(mongoDB)