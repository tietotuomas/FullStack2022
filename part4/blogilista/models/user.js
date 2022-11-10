const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: {type: String, required: true, minlength: 3},
    passwordHash: {type: String, required: true},
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)