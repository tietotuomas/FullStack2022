import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload).sort(byLikes)
    },
    likeBlog(state, action) {
      return state
        .map((b) => (b.id === action.payload.id ? action.payload : b))
        .sort(byLikes)
    },
  },
})

export const { setBlogs, addNewBlog, deleteBlog, likeBlog } = blogSlice.actions
const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(byLikes)))
  }
}

export const createNewBlog = (blog) => {
  return async () => {
    const blogAsResponse = await blogService.create(blog)
    console.log({ returnedBlog: blogAsResponse })
    return blogAsResponse
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const addLikeToBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const blogAsResponse = await blogService.update(id, updatedBlog)
    dispatch(likeBlog(blogAsResponse))
  }
}

export default blogSlice.reducer
