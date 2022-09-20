require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const Person = require("./models/person")

app.use(express.static("build"))
app.use(express.json())
app.use(cors())

morgan.token("person", (req, res) => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
)

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((persons) => {
      console.log(persons)
      res.send(
        `<div><p>Phonebook has info for ${persons} people</p><p>${Date()}</p></div>`
      )
    })
    .catch((error) => next(error))
})

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      console.log(persons)
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      if (person) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body
  const person = new Person({ name: body.name, number: body.number })

  person
    .save()
    .then((savedPerson) => {
      console.log(savedPerson)
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
