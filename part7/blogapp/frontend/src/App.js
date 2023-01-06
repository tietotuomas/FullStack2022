import { useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import userService from './services/user'

import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createNewBlog,
  addNewBlog,
  removeBlog,
  addLikeToBlog,
} from './reducers/blogsReducer'

import { loginUser, setUser, removeUser } from './reducers/userReducer'

const App = () => {
  const state = useSelector((state) => state)
  console.log({ state })

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const notification = useSelector((state) => state.notification)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const userAsResponse = await dispatch(loginUser(username, password))
      dispatch(setUser(userAsResponse))
      userService.setUser(userAsResponse)
      notify(`${userAsResponse.name} logged in!`)
    } catch (error) {
      console.log(error)
      notify('wrong username/password', 'alert')
    }
  }

  const logout = () => {
    dispatch(removeUser())
    userService.clearUser()
    notify('good bye!')
  }

  const createBlog = async (blog) => {
    try {
      const blogAsResponse = await dispatch(createNewBlog(blog))
      dispatch(addNewBlog(blogAsResponse))
      notify(
        `a new blog '${blogAsResponse.title}' by ${blogAsResponse.author} added`
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    }
  }

  const deleteBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }
    dispatch(removeBlog(id))
    notify(`'${toRemove.title}' by ${toRemove.author} was deleted successfully`)
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    console.log({ toLike })
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }
    console.log({ liked })
    dispatch(addLikeToBlog(id, liked))

    notify(`you liked '${liked.title}' by ${liked.author}`)
  }

  // type='info' so type would be info if left blank
  // seconds=5 so duration would be 5 if left blank
  const notify = (message, type = 'info', seconds = 5) => {
    dispatch(createNotification(message, type, seconds))
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
