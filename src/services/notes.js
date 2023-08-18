import axios from 'axios'
const baseUrl = '/api/notes'

let token = null
// change token variable
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  //assing promise to request variable and call its 'then' method
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
// the token of the logged in user is added to the authorization header of the HTTP request
const create = async newObject => {
  // set token to Authorization header
  const config = {
    headers: { Authorization: token },
  }
  // give defined above header to axios post method
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
// new syntax:
export default { getAll, create, update, setToken }

// old syntax:
// {
//     getAll: getAll,
//     create: create,
//     update: update
//   }
