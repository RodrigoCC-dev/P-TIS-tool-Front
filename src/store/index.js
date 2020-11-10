import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
    authenticated: false,
    usuario: {}
  },
  mutations: {
    setAutenticacion (state, valor) {
      state.authenticated = valor
    },
    setUsuario (state, valor) {
      state.usuario = valor
    },
    removeFromArray (arr, item) {
      var i = arr.indexOf(item)
      i !== -1 && arr.splice(i, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
