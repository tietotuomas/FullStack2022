import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showMessage(state, action) {
      console.log('show msg')
      return state.replace(state, action.payload)
    },
    clearMessage(state, action) {
      console.log('clear msg')
      return state.replace(state, '')
    },
  },
})

export const { showMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
