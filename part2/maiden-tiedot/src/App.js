import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState([])
  console.log(countries)
  let countriesToShow = []

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      // const mappedCountries = response.data.map(c=>({name: c.name.common, capital: c.capital, population: c.population, languages: c.languages}))
      setCountries(response.data)
    })
  }, [])

  

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
    console.log(event.target.value);
    console.log("FILTTERI", filter);
  }


  return (
    <div>
      <h1>Country database (REST API)</h1>
      <Filter handleChange={handleFilterChange}/>
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App
