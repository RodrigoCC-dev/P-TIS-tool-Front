<template>
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <div v-if="!verRevision">
        <Tablero @revision="establecerRevision"/>
      </div>

      <div v-else>
        <Comentar :id-bitacora="idRevision" @cerrar="mostrarTablero"/>
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

import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState } from 'vuex'

export default {
  name: 'Stakeholder',
  components: {
    Header,
    Footer,
    Tablero,
    Comentar
  },
  data () {
    return {
      idRevision: 0
    }
  },
  computed: {
    ...mapState(['apiUrl', 'usuario'])
  },
  methods: {
    establecerRevision: function (id) {
      this.idRevision = id
      this.verRevision = true
    },
    mostrarTrablero: function () {
      this.verRevision = false
      this.idRevision = 0
    },
    async obtenerStakeholder () {
      try {
        const response = await axios.get(this.apiUrl + '/stakeholders/' + this.usuario.id, { headers: Auth.authHeader() })
        this.$store.commit('setStakeholder', response.data)
        this.obtenerGrupo()
      } catch {
        console.log('No se ha obtenido la información del Stakeholder')
      }
    },
    async obtenerGrupo () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos/' + this.stakeholder.grupo_id, { headers: Auth.authHeader() })
        this.$store.commit('setGrupo', response.data)
      } catch {
        console.log('No se ha obtenido la información del grupo')
      }
    }
  },
  mounted () {
    this.obtenerStakeholder()
  }
}
</script>

<style lang="css" scoped>
</style>
