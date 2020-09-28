import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://nameless-cove-00105.herokuapp.com'
})
