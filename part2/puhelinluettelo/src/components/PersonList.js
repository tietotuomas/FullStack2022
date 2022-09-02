import Person from "./Person"

const PersonList = ({ persons }) => (
  <>
    {persons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </>
)

export default PersonList
