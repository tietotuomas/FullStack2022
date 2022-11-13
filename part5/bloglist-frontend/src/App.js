import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notificiation from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  console.log('rendering App..')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      console.log('useEffect setToken')
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('handle Login')
    console.log({ username })
    console.log({ password })

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setErrorMessage(false)
      setMessage(`Hello ${username}! Your authentication was succesful.`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage(true)
      setMessage('Invalid username or password.')
      console.log({ exception })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedInUser')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url,
      })
      setBlogs(blogs.concat(newBlog))
      setErrorMessage(false)
      setMessage(`A new blog added: ${title} by ${author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage(true)
      exception.message === undefined
        ? setMessage(`Adding a new blog didn't succeed`)
        : setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notificiation message={message} errorMessage={errorMessage} />
      {user !== null ? (
        <div>
          <h2>Blogs</h2>
          <h3>
            {user.name === undefined ? user.username : user.name}, you are
            logged in.
          </h3>

          <NewBlog
            handleNewBlog={handleNewBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <br />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <br />

          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      )}
    </div>
  )
}

export default App
