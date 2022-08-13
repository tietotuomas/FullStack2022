import { useState } from "react"

const Button = ({ eventHandler, text }) => {
  return (
    <>
      <button onClick={eventHandler}>{text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ]

  const [selected, setSelected] = useState(0)
  const [mostVotes, setMost] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    let random = selected
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(random)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
    const most = countMostVotes(newVotes)
    setMost(most)
  }

  const countMostVotes = (newVotes) => {
    let mostVotesIndex = 0
    let mostVotesValue = 0
    for (let i = 0; i < newVotes.length; i++) {
      if (newVotes[i] > mostVotesValue) {
        mostVotesValue = votes[i]
        mostVotesIndex = i
      }
    }
    return mostVotesIndex
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <Button eventHandler={handleVoteClick} text="vote" />
      <Button eventHandler={handleNextClick} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotes]}
    </div>
  )
}

export default App
