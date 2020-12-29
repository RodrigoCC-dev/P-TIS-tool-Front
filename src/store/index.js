import { createStore } from 'vuex'

export default createStore({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
    authenticated: false,
    usuario: {},
    estudiante: {},
    stakeholder: {},
    grupo: {},
    tipoMinutas: [],
    secciones: [],
    tipoAprobaciones: [],
    motivos: [],
    abc: 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
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
      state.stakeholder = valor
    },
    setGrupo (state, valor) {
      state.grupo = valor
    },
    setTipoAprobaciones (state, valor) {
      state.tipoAprobaciones = valor
    },
    setMotivos (state, valor) {
      state.motivos = valor
    }
  },
  actions: {
  },
  modules: {
  }
})
