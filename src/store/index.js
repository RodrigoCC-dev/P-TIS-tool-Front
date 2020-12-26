import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
    authenticated: false,
    usuario: {},
    estudiante: {},
    Stakeholder: {},
    grupo: {},
    tipoMinutas: [],
    secciones: [],
    tipoAprobaciones: []
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
    },
    setEstudiante (state, valor) {
      state.estudiante = valor
    },
    setStakeholder (state, valor) {
      state.Stakeholder = valor
    },
    setGrupo (state, valor) {
      state.grupo = valor
    },
    setTipoAprobaciones (state, valor) {
      state.tipoAprobaciones = valor
    }
  },
  actions: {
  },
  modules: {
  }
})
