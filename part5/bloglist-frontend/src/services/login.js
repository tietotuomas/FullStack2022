import axios from 'axios'
const baseUrl = '/login'

const login = async (credentials) => {
  console.log('login')
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
