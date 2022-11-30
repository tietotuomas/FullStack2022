import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { notification: '', timeOutId: '' },
  reducers: {
    showMessage(state, action) {
      //clear the previous timeOutId so the newest notification doesn't time out too early
      if (state.timeOutId) {
        clearTimeout(state.timeOutId)
      }

      return { ...state, notification: action.payload }
    },
    clearMessage(state, action) {
      return { ...state, notification: '' }
    },
    addTimeOutId(state, action) {
      return { ...state, timeOutId: action.payload }
    },
  },
})

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(showMessage(msg))
    const timeOutId = setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
    console.log({ timeOutId })
    dispatch(addTimeOutId(timeOutId))
  }
}

export const { showMessage, clearMessage, addTimeOutId } =
  notificationSlice.actions
export default notificationSlice.reducer
