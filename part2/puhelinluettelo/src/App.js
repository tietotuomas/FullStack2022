import { useState } from "react"
import FilterField from "./components/FilterField"
import NameForm from "./components/NameForm"
import PersonList from "./components/PersonList"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [filter, SetFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  let filteredPersons = persons
  if (filter) {
    filteredPersons = persons.filter((p) => p.name.includes(filter))
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    SetFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!newName) {
      alert("Name cannot be left empty")
    } else if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(newPersons)
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new contact</h3>
      <NameForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <PersonList persons={filteredPersons} />
    </div>
  )
}

export default App
