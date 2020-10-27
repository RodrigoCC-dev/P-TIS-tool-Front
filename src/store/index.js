import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl: 'http://127.0.0.1:3000',
    authenticated: false,
    usuario: {}
  },
  mutations: {
    setAutenticacion (state, valor) {
      state.authenticated = valor
    },
    setUsuario (state, valor) {
      state.usuario = valor
    }
  },
  actions: {
  },
  modules: {
  }
})
