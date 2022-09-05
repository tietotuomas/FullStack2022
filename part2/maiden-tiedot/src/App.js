import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  // const [countryToShow, setCountryToShow] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      // const mappedCountries = response.data.map(c=>({name: c.name.common, capital: c.capital, population: c.population, languages: c.languages}))
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setCountriesToShow(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
    console.log("EVENTTI", event.target.value)
  }

  // const showCountry = (event) => {
  //   event.preventDefault()
  //   console.log("submit");
  //   console.log(countryToShow);
    // setCountriesToShow(
    //   countries.filter((c) =>
    //     c.name.common.toLowerCase().includes(countryToShow)
    //   )
    // )
  // }

  const handleShowChange = (event) => {
    setCountriesToShow(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <h1>Country database (by REST API)</h1>
      <Filter handleChange={handleFilterChange} />
      <Countries
        countriesToShow={countriesToShow}
        // showCountry={showCountry}
        handleShowChange={handleShowChange}
      />
    </div>
  )
}

export default App
