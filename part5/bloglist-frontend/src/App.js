import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(true)

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

  const blogFormRef = useRef()

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

  const addLike = async (blog) => {
    const blogWithAddedLike = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blogWithAddedLike)
      // cant use updatedBlog because user in different (not populated) form
      const updatedBlogs = blogs.map((b) =>
        b.id === blog.id ? blogWithAddedLike : b
      )
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
      setErrorMessage(true)
      exception.message === undefined
        ? setMessage(`Updating the blog didn't succeed`)
        : setMessage(exception.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createNewBlog = async (blog) => {
    console.log('create new blog')
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat({ ...newBlog, user: user }))
      blogFormRef.current.toggleVisibility()
      setErrorMessage(false)
      setMessage(`A new blog added: ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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

  const removeBlog = async (blog) => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      try {
        const response = await blogService.remove(blog.id)
        console.log(response)
        const newBlogs = blogs.filter((b) => b.id !== blog.id)
        setBlogs(newBlogs)
        setErrorMessage(false)
        setMessage(
          `The blog ${blog.title} by ${blog.author} was successfully deleted.`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)
        setErrorMessage(true)
        exception.message === undefined
          ? setMessage(`Removing the blog didn't succeed`)
          : setMessage(exception.message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <Notification message={message} errorMessage={errorMessage} />
      {user !== null ? (
        <div>
          <h2>Blogs</h2>
          <h3>
            {user.name === undefined ? user.username : user.name}, you are
            logged in.
          </h3>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>

          <br />

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                addLike={addLike}
                removeBlog={removeBlog}
              />
            ))}
          <br />

          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <LoginForm
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
