import axios from 'axios'

const ENDPOINT_PATH = 'http://127.0.0.1:3000'

export default {
  login (email, password) {
    const user = {
      auth: {
        email: email,
        password: password
      }
    }
    return axios.post(ENDPOINT_PATH + '/auth/login', user).then(response => {
      console.log(response.data)
      localStorage.removeItem('user_tk')
      localStorage.setItem('user_tk', response.data.jwt)
    })
  },

  authHeader () {
    const user = localStorage.getItem('user_tk')
    console.log(user)
    if (user) {
      return { Authorization: 'Bearer ' + user }
    } else {
      return {}
    }
  }
}
