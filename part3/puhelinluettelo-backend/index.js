const { response } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

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
    const person = persons.find(p => p.id === id )
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
    
})

app.delete("/api/persons/:id", (req, res) => {
    console.log(req.params.id);
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        persons = persons.filter(p => p.id !== id)
        res.status(204).end()
    }
    else {
        res.status(404).end()
    }
})

app.post("/api/persons", (req, res) => {
    console.log(req.body);
    const person = req.body
    person.id = generateId()
    persons.concat(person)
    res.json(person)
})

const generateId = () => {
    let id = 1
    while (persons.find(p => p.id === id)) {
        id = Math.floor(Math.random()*1000)
    }
    return id
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
