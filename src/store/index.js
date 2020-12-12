import { createStore } from 'vuex'
import axios from 'axios'
import Auth from '../services/auth.js'

export default createStore({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
    authenticated: false,
    usuario: {},
    estudiante: {},
    grupo: {},
    tipoMinutas: [],
    secciones: [],
    listaRevision: []
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
    setGrupo (state, valor) {
      state.grupo = valor
    },
    setListaRevision (state, valor) {
      state.listaRevision = valor
    }
  },
  actions: {
    async obtenerParaRevisar () {
      try {
        const response = await axios.get(this.state.apiUrl + '/minutas/revision/grupo', { headers: Auth.authHeader() })
        this.$store.commit('setListaRevision', response.data)
      } catch {
        console.log('No se han podido obtener las minutas a revisar')
      }
    }
  },
  modules: {
  }
})
