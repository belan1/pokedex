import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=964'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getSpecifiedURL = (url) => {
    const request = axios.get(url)
    return (
      request.then(response => response.data)
      .catch(res => {}))
  }

export default { getAll, getSpecifiedURL}
