import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl: 'http://127.0.0.1:3000',
    authenticated: false
  },
  mutations: {
    setAutenticacion (state, valor) {
      state.authenticated = valor
    }
  },
  actions: {
  },
  modules: {
  }
})
