import axios from 'axios'

const productClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:7000/' : '/',
  headers: {
    'Content-type': 'application/json',
  },
})


export default productClient