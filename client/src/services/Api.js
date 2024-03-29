import axios from 'axios'

export default () => {
    return axios.create({
        baseURL:  process.env.NODE_ENV === 'production' ? 'https://cryptobis.herokuapp.com/' : 'http://localhost:8081'
    })
}
