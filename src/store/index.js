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
    jornadaActual: 'Diurna',
    notificacion: {
      mensaje: '',
      mostrar: false
    },
    claseNotificacion: {
      exito: false,
      alarma: false,
      error: false
    }
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
    },
    setJornadaActual (state, valor) {
      state.jornadaActual = valor
    },
    setNotificacion (state, valor) {
      state.notificacion.mensaje = valor
      state.notificacion.mostrar = true
    },
    setClaseNotExito (state, valor) {
      state.claseNotificacion.exito = valor
      state.claseNotificacion.alarma = false
      state.claseNotificacion.error = false
    },
    setClaseNotAlarma (state, valor) {
      state.claseNotificacion.alarma = valor
      state.claseNotificacion.exito = false
      state.claseNotificacion.error = false
    },
    setClaseNotError (state, valor) {
      state.claseNotificacion.error = valor
      state.claseNotificacion.alarma = false
      state.claseNotificacion.exito = false
    },
    cerrarNotificacion (state) {
      state.notificacion.mensaje = ''
      state.notificacion.mostrar = false
      state.claseNotificacion.error = false
      state.claseNotificacion.alarma = false
      state.claseNotificacion.exito = false
    }
  },
  actions: {
  },
  modules: {
  }
})
