import axios from 'axios'
const baseUrl = '/api/user'

const getUser = async (token) => {
  const request = axios.get(baseUrl + '/auth', {headers: { "poke-jwt" : token}})
  const response = await request
    return response.data
}

const register = async (name, pass) => {
    const user = { name: name, password: pass}
    const request = axios.post(baseUrl+'/register', user)
    const response = await request
    return response.data
}

const login = async (name, pass) => {
    const user = { name: name, password: pass}
    const request = axios.post(baseUrl+'/login', user)
    const response = await request
    return response.data
}

const getTeam = async (token) => {
    const request = axios.get(baseUrl+'/team', {headers: { "poke-jwt" : token}})
    const response = await request
    return response.data
}

const addTeamMember = async (token, poke) => {

    const headers = {
        'poke-jwt' : token
    }
    const request = axios.post(baseUrl+'/team', {poke: poke}, {headers: headers})
    const response = await request
    return response.data
}

const deleteTeamMember = async (token, poke) => {
    const request = axios.delete(baseUrl+'/team', {
        headers: {
          'poke-jwt': token
        },
        data: {
          poke: poke
        }
      })
    const response = await request
    return response.data
}
export default { getUser, register, login, getTeam, addTeamMember, deleteTeamMember}