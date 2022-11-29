import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      console.log({ votedAnecdote })
      return state.map((a) => (a.id === id ? votedAnecdote : a))
    },
    create(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export default anecdoteSlice.reducer
export const { vote, create, setAnecdotes } = anecdoteSlice.actions
