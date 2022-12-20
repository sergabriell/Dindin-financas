import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.render.com/deploy/srv-cegqtpirrk0fhn1nn3m0?key=a67B1cEChSA',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})
