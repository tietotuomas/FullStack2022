import { useState, useEffect } from "react"
import FilterField from "./components/FilterField"
import NameForm from "./components/NameForm"
import Person from "./components/Person"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameFieldChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberFieldChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const personToBeDeleted = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${personToBeDeleted.name}?`)) {
      personService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          setMessage(
            `${personToBeDeleted.name}'s information was successfully deleted`
          )
          setTimeout(() => {
            setMessage("")
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(
            `${personToBeDeleted.name} was already removed from the server`
          )
          setPersons(persons.filter((p) => p.id !== personToBeDeleted.id))
          setTimeout(() => {
            setErrorMessage("")
          }, 5000)
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personWithTheSameName = persons.find((p) => p.name === newName)
    if (!newName) {
      alert("Name cannot be left empty")
    } else if (personWithTheSameName) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updateNumber(
            { ...personWithTheSameName, number: newNumber },
            personWithTheSameName.id
          )
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p
              )
            )
            setNewName("")
            setNewNumber("")
            setMessage(
              `${updatedPerson.name}'s phone number was successfully updated`
            )
            setTimeout(() => {
              setMessage("")
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(
              `${personWithTheSameName.name} was already removed from the server`
            )
            setPersons(persons.filter((p) => p.id !== personWithTheSameName.id))
            setTimeout(() => {
              setErrorMessage("")
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .createNew(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
          setMessage(`${newPerson.name}'s information was successfully added`)
          setTimeout(() => {
            setMessage("")
          }, 5000)
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage("")
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <FilterField filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new contact</h3>
      <NameForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameFieldChange}
        newName={newName}
        handleNumberChange={handleNumberFieldChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>

      {persons
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p) => (
          <Person
            key={p.id}
            person={p}
            handleDelete={() => handleDelete(p.id)}
          />
        ))}
    </div>
  )
}

export default App
