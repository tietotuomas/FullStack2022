import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showMessage, clearMessage } from '../reducers/notificationReducer'

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
    dispatch(vote(id))
    const anecdote = anecdotesToShow.find((a) => a.id === id)
    dispatch(showMessage(`You voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
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
