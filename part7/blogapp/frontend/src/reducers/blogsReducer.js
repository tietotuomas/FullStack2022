import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log({ action })
      return action.payload
    },
    addNewBlog(state, action) {
      console.log({ action })
      return state.concat(action.payload)
    },
  },
})

const { setBlogs, addNewBlog } = blogSlice.actions
const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(byLikes)))
  }
}

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogAsResponse = await blogService.create(blog)
      console.log({ blogAsResponse })
      dispatch(addNewBlog(blogAsResponse))
      dispatch(
        createNotification(
          `a new blog '${blogAsResponse.title}' by ${blogAsResponse.author} added`
        )
      )
    } catch (error) {
      console.log({ error })
      dispatch(
        createNotification(
          'creating a blog failed: ' + error.response.data.error,
          'alert',
          5
        )
      )
    }
  }
}

export default blogSlice.reducer
