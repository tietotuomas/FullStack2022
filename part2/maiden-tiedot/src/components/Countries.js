const Countries = ({ countries, filter }) => {
  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter)
  )

  console.log(countriesToShow)
  if (countriesToShow.length > 10) {
    return <p>Too many search results</p>
  } else if (countriesToShow.length > 1) {
    return countriesToShow.map((country) => <div>{country.name.common}</div>)
  } else if (countriesToShow.length === 1) {
    const languages = Object.entries(countriesToShow[0].languages).map((l) => (
      <li key={l[0]}>{l[1]}</li>
    ))

    console.log(countriesToShow)
    return (
      <div>
        <h3>{countriesToShow[0].name.common}</h3>
        <br></br>
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
        //   style={{ width: '50%', height: '50%' }}
        />
      </div>
    )
  }
}

export default Countries
