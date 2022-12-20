import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-dindin.onrender.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})
