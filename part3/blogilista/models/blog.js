const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJson', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.__id.toString()
    delete returnedObject.__id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
