import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`You added anecdote "${anecdote}"`, 5))
    // dispatch(showMessage(`You added anecdote "${anecdote}"`))
    // setTimeout(() => {
    //   dispatch(clearMessage())
    // }, 5000)
  }
  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default AnecdoteList
