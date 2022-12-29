import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import About from './components/About'
import Menu from './components/Menu'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const currentAnecdote = match ? anecdoteById(Number(match.params.id)) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const notificationStyle = {
    color: 'green',
    fontSize: 16,
    background: 'lightgrey',
    padding: 5,
    margin: 5,
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification ? (
        <p style={notificationStyle}>
          <b>{notification}</b>
        </p>
      ) : null}
      <Menu />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={currentAnecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
