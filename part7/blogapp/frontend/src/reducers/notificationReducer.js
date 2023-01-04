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

// type='info' so type would be info if left blank
// seconds=5 so duration would be 5 if left blank
export const createNotification = (notification, type = 'info', time = 5) => {
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
