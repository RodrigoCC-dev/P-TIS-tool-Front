<template>
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <div v-if="verTablero">
        <Tablero :contador="tableroStk" @revision="establecerRevision" @respuestas="revisarRespuestas"/>
      </div>

      <div v-else-if="verRevision">
        <Comentar :id-bitacora="idRevision" @cerrar="mostrarTablero"/>
      </div>

      <div v-else-if="verRespuestas">
        <Respuestas :id-bitacora="idRespuestas" @cerrar="mostrarTablero"/>
      </div>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Tablero from '@/components/TableroStk.vue'
import Comentar from '@/components/comentarios/ComentarMinuta.vue'
import Respuestas from '@/components/comentarios/RespuestasMinuta.vue'

import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState } from 'vuex'

export default {
  name: 'Stakeholder',
  components: {
    Header,
    Footer,
    Tablero,
    Comentar,
    Respuestas
  },
  data () {
    return {
      idRevision: 0,
      idRespuestas: 0,
      verTablero: true,
      verRevision: false,
      verRespuestas: false,
      tableroStk: 0
    }
  },
  computed: {
    ...mapState(['apiUrl', 'usuario', 'stakeholder', 'grupo'])
  },
  methods: {
    establecerRevision: function (id) {
      this.idRevision = id
      this.verRevision = true
      this.verTablero = false
    },
    mostrarTablero: function () {
      this.verTablero = true
      this.verRevision = false
      this.idRevision = 0
      this.verRespuestas = false
      this.idRespuestas = 0
      this.tableroStk++
    },
    revisarRespuestas: function (id) {
      this.verTablero = false
      this.verRevision = false
      this.verRespuestas = true
      this.idRespuestas = id
    },
    async obtenerStakeholder () {
      try {
        const response = await axios.get(this.apiUrl + '/stakeholders/' + this.usuario.id, { headers: Auth.authHeader() })
        this.$store.commit('setStakeholder', response.data)
        this.obtenerGrupo()
      } catch (e) {
        console.log('No se ha obtenido la información del Stakeholder')
        console.log(e)
      }
    },
    async obtenerGrupo () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos/' + this.stakeholder.grupo_id, { headers: Auth.authHeader() })
        this.$store.commit('setGrupo', response.data)
      } catch (e) {
        console.log('No se ha obtenido la información del grupo')
        console.log(e)
      }
    },
    async obtenerAprobaciones () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_aprobaciones', { headers: Auth.authHeader() })
        this.$store.commit('setTipoAprobaciones', response.data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.obtenerStakeholder()
    this.obtenerAprobaciones()
  }
}
</script>
