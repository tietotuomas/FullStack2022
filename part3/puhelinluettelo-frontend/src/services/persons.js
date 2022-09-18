import axios from "axios"

const baseUrl = "/api/persons"

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const createNew = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
}

const updateNumber = (newPerson, id) => {
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data)
}

export default {
  getAll,
  createNew,
  removePerson,
  updateNumber,
}
