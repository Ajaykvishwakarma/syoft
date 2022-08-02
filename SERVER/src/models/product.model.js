const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
       name : { type: String, required: true},
       price : { type: String, required: true},
       description : { type: String, required: true},
       inventory_count : { type: Number, required: true}
    },
    {
        versionKey : false
        
    }
)

module.exports = mongoose.model('product', productSchema)