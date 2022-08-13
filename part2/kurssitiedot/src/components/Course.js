const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total desc="total of exercises" parts={course.parts} />
      </>
    )
  }
  
  const Header = ({ name }) => <h2>{name}</h2>
  
  const Content = ({ parts }) => {
    return parts.map((part) => <Part key={part.id} part={part} />)
  }
  
  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  )
  
  const Total = ({ desc, parts }) => {
    return (
      <p>
        <b>
          {desc}{" "}
          {parts
            .map((part) => part.exercises)
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            )}
        </b>
      </p>
    )
  }

  export default Course