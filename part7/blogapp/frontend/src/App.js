import React, { Fragment, useEffect, useState, useRef } from 'react'

import { Routes, Route, useMatch } from 'react-router-dom'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import userService from './services/user'
import usersService from './services/users'

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

  const match = useMatch('/users/:id')
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('useEffect fetching users invoked!')
    usersService.getAll().then((initialUsers) => setUsers(initialUsers))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()

    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }, [dispatch])

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
    // ToLike has user object as a field.
    // We want to dispatch a blog having user.id as a field. => user: toLike.user.id
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }
    dispatch(addLikeToBlog(id, liked))

    notify(`you liked '${liked.title}' by ${liked.author}`)
  }

  // type='info' so type would be info if left blank
  // seconds=5 so duration would be 5 if left blank
  const notify = (message, type = 'info', seconds = 5) => {
    dispatch(createNotification(message, type, seconds))
  }

  const userMatch = match
    ? users.find((u) => u.id === match.params.id)
    : null
  console.log({ userMatch })

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
      <br />

      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
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
            </Fragment>
          }
        />

        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userMatch} />} />
      </Routes>
    </div>
  )
}

export default App
