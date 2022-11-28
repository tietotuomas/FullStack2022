import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    editFilter(state, action) {
      console.log('in editFilter reducer')
      return state.replace(state, action.payload)
    },
  },
})

export const {editFilter} = filterSlice.actions
export default filterSlice.reducer