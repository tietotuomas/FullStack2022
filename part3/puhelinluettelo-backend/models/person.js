const mongoose = require("mongoose")

console.log("connecting to MongoDB")

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("succesfully connected to MongoDB")
  })
  .catch((error) => {
    console.log("connection failed:")
    console.log(error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minglength: 8,
    validate: {
      validator: (n) => {
        return /^\d{2,3}-\d+$/.test(n)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model("person", personSchema)

module.exports = Person
