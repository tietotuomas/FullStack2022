const mongoose = require("mongoose")

if (process.argv.length === 3 || process.argv.length === 5) {
  const pw = process.argv[2]
  const url = `mongodb+srv://bullo:${pw}@cluster0.2h9isxk.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({ name: String, number: String })

  const Person = mongoose.model("Person", personSchema)

  if (process.argv.length === 5) {
    const p = new Person({ name: process.argv[3], number: process.argv[4] })
    p.save().then((result) => {
      console.log(`added ${p.name} ${p.number}`)
      mongoose.connection.close()
    })
  } else {
    Person.find({}).then((result) => {
      console.log(`phonebook (${result.length} people):`)
      result.forEach((p) => {
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
    })
  }
} else {
  console.log(
    'The number of arguments was not correct.\nTry node mongo.js "yourpassword"\nor\nnode mongo.js "yourpassword" "name" "number"'
  )
  process.exit()
}
