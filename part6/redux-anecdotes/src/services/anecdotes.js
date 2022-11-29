import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  console.log({ anecdote })
  const response = await axios.post(baseUrl, anecdote)
  console.log(response)
  return response.data
}

export default { getAll, createNew }
