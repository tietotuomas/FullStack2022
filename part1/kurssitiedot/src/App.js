const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Content = (props) => (
  <>
    <p>
      <Part name={props.part1} exercises={props.exercises1} />
      <Part name={props.part2} exercises={props.exercises2}/>
      <Part name={props.part3} exercises={props.exercises3}/>
    </p>
  </>
)

const Part = (props) => (
  <>
    <p>
      {props.name} {props.exercises}
    </p>
  </>
)

const Total = (props) => (
  <>
    <p>
      {props.desc} {props.total}
    </p>
  </>
)

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        desc="Number of exercises"
        total={exercises1 + exercises2 + exercises3}
      />
    </div>
  )
}

export default App
