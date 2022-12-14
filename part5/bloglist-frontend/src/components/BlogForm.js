import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createNewBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h4>Send a new blog</h4>
      <form onSubmit={handleNewBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            className="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            className="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            className="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="sendButton" type="submit">send</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}
export default BlogForm
