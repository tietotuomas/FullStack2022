const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('person', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
]

app.get("/info", (req, res) => {
  const total = persons.length

  res.send(
    `<div><p>Phonebook has info for ${total} people</p><p>${Date()}</p></div>`
  )
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)
  if (person) {
    persons = persons.filter((p) => p.id !== id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

app.post("/api/persons", (req, res) => {
  const person = req.body
  if (!person.name) {
    return res.json({ error: "Name cannot be left empty." })
  }
  if (!person.number) {
    return res.json({ error: "Number cannot be left empty." })
  }

  if (persons.find((p) => p.name === person.name)) {
    return res.json({ error: "Name must be unique." })
  }
  person.id = generateId()
  persons = persons.concat(person)
  res.json(person)
})

const generateId = () => {
  let id = 1
  while (persons.find((p) => p.id === id)) {
    id = Math.floor(Math.random() * 1000)
  }
  return id
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
