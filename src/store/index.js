import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
    authenticated: false,
    usuario: {},
    tipoMinutas: [],
    secciones: []
  },
  mutations: {
    setAutenticacion (state, valor) {
      state.authenticated = valor
    },
    setUsuario (state, valor) {
      state.usuario = valor
    },
    setTipoMinutas (state, valor) {
      state.tipoMinutas = valor
    },
    setSecciones (state, valor) {
      state.secciones = valor
    }
  },
  actions: {
  },
  modules: {
  }
})
