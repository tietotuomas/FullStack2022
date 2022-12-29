import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()

  const { reset: resetContent, ...inputContent } = content
  const { reset: resetAuthor, ...inputAuthor } = author
  const { reset: resetInfo, ...inputInfo } = info

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    props.setNotification(`A new anecdote "${content.value}" created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
    navigate('/')
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...inputContent} />
        </div>
        <div>
          author
          <input {...inputAuthor} />
        </div>
        <div>
          url for more info
          <input {...inputInfo} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
