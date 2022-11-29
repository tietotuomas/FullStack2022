import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showMessage(state, action) {
      return state.replace(state, action.payload)
    },
    clearMessage(state, action) {
      return state.replace(state, '')
    },
  },
})

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(showMessage(msg))
    setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

export const { showMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
