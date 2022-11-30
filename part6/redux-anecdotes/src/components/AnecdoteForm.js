import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`You added anecdote "${anecdote}"`, 5)
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
const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
