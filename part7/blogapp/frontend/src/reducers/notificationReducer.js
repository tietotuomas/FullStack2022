import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return null
    },
  },
})

const { showNotification, hideNotification } = notificationSlice.actions

let timeoutId = null

export const createNotification = (notification, type, time) => {
  return (dispatch) => {
    dispatch(showNotification({ message: notification, type: type }))

    if (timeoutId) {
      //clear timeOutId so the current notification won't disappear too early
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
