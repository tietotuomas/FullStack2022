import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote = event.target.content.value
    event.target.content.value = ''
    console.log('send form', anecdote)
    dispatch(create(anecdote))
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
