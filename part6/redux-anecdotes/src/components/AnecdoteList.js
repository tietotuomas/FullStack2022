import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const allAnecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  let anecdotesToShow
  if (filter) {
    anecdotesToShow = allAnecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  } else {
    anecdotesToShow = allAnecdotes
  }

  const dispatch = useDispatch()

  const handleVote = (id) => {
    const anecdote = anecdotesToShow.find((a) => a.id === id)
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    dispatch(addVote(votedAnecdote))

    dispatch(setNotification(`You voted "${anecdote.content}`, 5))
  }

  return (
    <>
      {/*[...anecdotes] because sort would mutate the original array*/}
      {[...anecdotesToShow]
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
