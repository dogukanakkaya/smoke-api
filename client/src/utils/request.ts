import axios from 'axios'

axios.defaults.withCredentials = true

const request = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    validateStatus: function (status: any) {
        return status >= 200 && status <= 450;
    }
})

export {
    request
}