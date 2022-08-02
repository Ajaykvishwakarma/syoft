const { Schema, model } = require('mongoose');
const { hashSync, compareSync } = require('bcryptjs');

const userSchema = new Schema(
    {
        username : { type: String, required: true},
        phone : { type: String, required: true},
        role : { type: String, required: true},
        email : { type: String, required: true},
        password : { type: String, required: true}
    },{
        versionKey : false,
 
    }
)

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) next()
    this.password = hashSync(this.password)
    next()
})

userSchema.methods.checkPassword = function(password) {
    return compareSync(password, this.password)
}

module.exports = model('user', userSchema)