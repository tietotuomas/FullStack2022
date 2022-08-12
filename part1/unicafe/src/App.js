import { useState } from "react"

const buttonStyle = {
  backgroundColor: "AliceBlue",
  padding: "8px 20px",
  marginRight: 5,
  cursor: "pointer",
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <>
      <p>{message}</p>
    </>
  )
}

const Button = ({ text, eventHandler, colour }) => {
  return (
    <>
      <button
        style={{ ...buttonStyle, border: "2px solid " + colour }}
        onClick={eventHandler}
      >
        {text}
      </button>
    </>
  )
}

const Statistics = ({ statistics }) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text="bad" value={statistics.bad} />
        <StatisticsLine text="neutral" value={statistics.neutral} />
        <StatisticsLine text="good" value={statistics.good} />
        <StatisticsLine text="all" value={statistics.total} />
        <StatisticsLine text="average" value={statistics.average} />
        <StatisticsLine text="positive" value={statistics.positive} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)
  const [message, setMessage] = useState(null)
  const total = bad + neutral + good
  const average = ((good - bad) / total).toFixed(2)
  const positive = ((good / total) * 100).toFixed(2) + " %"
  const statistics = {
    bad: bad,
    neutral: neutral,
    good: good,
    message: message,
    total: total,
    average: average,
    positive: positive,
  }

  const handleClick = (feedback, setFunction) => {
    const beginning = "Thanks for the feedback! "
    setFunction(feedback + 1)

    if (setFunction === setBad) {
      setMessage(beginning + "Hope we do better next time.")
    } else if (setFunction === setNeutral) {
      setMessage(beginning + "Hope we do even better next time.")
    } else {
      setMessage(beginning + "Glad we made it.")
    }

    setTimeout(() => {
      setMessage(null)
    }, 3500)
  }

  return (
    <div>
      <h2>Feedback</h2>
      <Notification message={message} />
      <p>
        <b>Give us feedback. How did we do today?</b>
      </p>
      <Button
        text="bad"
        eventHandler={() => handleClick(bad, setBad)}
        colour="red"
      />
      <Button
        text="neutral"
        eventHandler={() => handleClick(neutral, setNeutral)}
        colour="orange"
      />
      <Button
        text="good"
        eventHandler={() => handleClick(good, setGood)}
        colour="green"
      />
      <p style={{ fontSize: 18 }}>
        <b>Statistics:</b>
      </p>
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App
