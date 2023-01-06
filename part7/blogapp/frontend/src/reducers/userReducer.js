import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async () => {
    const userAsResponse = await loginService.login({ username, password })
    return userAsResponse
  }
}

export default userSlice.reducer
