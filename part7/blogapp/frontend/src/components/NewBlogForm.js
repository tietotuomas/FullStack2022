import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'pink' }}>
        <Toolbar>
          <Typography style={{ color: 'purple' }} variant="subtitle2">
            Create
          </Typography>
        </Toolbar>
      </AppBar>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          <TextField
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          <TextField
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          id="create-button"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
