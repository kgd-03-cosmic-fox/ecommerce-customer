import axios from 'axios'

export default axios.create({
  baseURL: 'https://ecommerce-cms-server.herokuapp.com/'
})
