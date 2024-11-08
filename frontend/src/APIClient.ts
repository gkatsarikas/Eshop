import axios from "axios";

const client = axios.create({

    baseURL:
        axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:7000/' : '/',

    headers:{
        "Content-Type": "application/json",
    }
})

export default client;