import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    //assing promise to request variable and call its 'then' method
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
// new syntax:
export default { getAll, create, update }

// old syntax:
// { 
//     getAll: getAll, 
//     create: create, 
//     update: update 
//   }
