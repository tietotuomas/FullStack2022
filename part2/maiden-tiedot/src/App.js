import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [city, setCity] = useState("")
  const [cityWeather, setCityWeather] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          setCityWeather(response.data)
        })
    }
  }, [city])

  const handleFilterChange = (event) => {
    const countryList = countries.filter((c) =>
      c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setCountriesToShow(countryList)
    if (countryList.length === 1) {
      setCity(countryList[0].capital)
    }
  }

  return (
    <div>
      <h1>
        Country database (by REST<small>ful</small> API)
      </h1>
      <Filter handleChange={handleFilterChange} />
      <Countries
        countriesToShow={countriesToShow}
        handleChange={handleFilterChange}
        weather={cityWeather}
      />
    </div>
  )
}

export default App
