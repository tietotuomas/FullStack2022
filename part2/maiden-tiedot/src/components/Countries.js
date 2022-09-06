const Countries = ({ countriesToShow, handleChange, weather }) => {
  if (countriesToShow.length > 10) {
    return <p>Too many search results</p>
  } else if (countriesToShow.length > 1) {
    return countriesToShow.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={handleChange} value={country.name.common}>
          show
        </button>
      </div>
    ))
  } else if (countriesToShow.length === 1) {
    const languages = Object.entries(countriesToShow[0].languages).map((l) => (
      <li key={l[0]}>{l[1]}</li>
    ))
    if (weather.length !== 0) {
      return (
        <div>
          <h3>{countriesToShow[0].name.common}</h3>
          capital: {countriesToShow[0].capital[0]}
          <br></br>
          population: {countriesToShow[0].population}
          <br></br>
          <p>languages:</p>
          <ul>{languages}</ul>
          <br></br>
          <img
            src={countriesToShow[0].flags.png}
            alt={`flag of ${countriesToShow[0].name.common}`}
            style={{ width: "15%", height: "15%" }}
          />
          <h4>{`Weather in ${countriesToShow[0].capital}`}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`An icon for weather in ${countriesToShow[0].capital}`}
          />
          <br></br>
          temperature: {weather.main.temp} (feels like {weather.main.feels_like}
          )<br></br>
          wind: {weather.wind.speed}
        </div>
      )
    } else {
      return (
        <div>
          <h3>{countriesToShow[0].name.common}</h3>
          capital: {countriesToShow[0].capital[0]}
          <br></br>
          population: {countriesToShow[0].population}
          <br></br>
          <p>languages:</p>
          <ul>{languages}</ul>
          <br></br>
          <img
            src={countriesToShow[0].flags.png}
            alt={`flag of ${countriesToShow[0].name.common}`}
            style={{ width: "15%", height: "15%" }}
          />
        </div>
      )
    }
  }
}

export default Countries
