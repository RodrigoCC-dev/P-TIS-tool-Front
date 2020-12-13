<template lang="html">
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <div v-if="crearMinuta">

        <Minuta v-bind:tipo-minuta="tipo" v-bind:id-bitacora="idBitacora" v-if="verFormulario" @cerrar="cerrarFormulario"/>

        <div v-else>

          <div class="columns">
            <div class="column is-10"></div>
            <div class="column is-2">
              <button class="button is-success" @click="nuevaMinuta">Nueva Minuta</button>
            </div>
          </div>
          <div v-if="seleccionarMinuta">
            <div class="columns">
              <div class="column is-half is-offset-3">
                <div class="field is-horizontal">
                  <div class="field-label-2c">
                    <label class="label">Elegir tipo minuta:</label>
                  </div>
                  <div class="field-body">
                    <div class="field has-addons has-addons-right">
                      <div class="control is-expanded">
                        <div class="select is-fullwidth">
                          <select v-model="tipo">
                            <option v-for="item in minutasFiltradas" :key="item.id" :value="item.id">{{ item.tipo }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="control">
                        <a class="button is-info" @click="elegirTipo">Elegir</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
          </div>

          <Tablero ref="tablero" @bitacora="establecerBitacora" @revision="establecerRevision"/>

        </div>

      </div>

      <div v-else-if="verRevision">
        <Comentar :id-bitacora="idRevision" @cerrar="mostrarTablero"/>
      </div>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Minuta from '@/components/Minuta.vue'
import Tablero from '@/components/TableroEst.vue'
import Comentar from '@/components/comentarios/ComentarMinuta.vue'

import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState } from 'vuex'

export default {
  name: 'Estudiante',
  components: {
    Header,
    Footer,
    Minuta,
    Tablero,
    Comentar
  },
  data () {
    return {
      verFormulario: false,
      tipo: 0,
      seleccionarMinuta: false,
      idBitacora: 0,
      idRevision: 0,
      crearMinuta: true,
      verRevision: false
    }
  },
  computed: {
    ...mapState(['apiUrl', 'tipoMinutas', 'usuario', 'estudiante', 'grupo']),

    minutasFiltradas: function () {
      var lista = []
      for (var i = 0; i < this.tipoMinutas.length; i++) {
        if (this.tipoMinutas[i].tipo !== 'Semanal') {
          lista.push(this.tipoMinutas[i])
        }
      }
      return lista
    }
  },
  methods: {
    nuevaMinuta: function () {
      this.seleccionarMinuta = true
    },
    elegirTipo: function () {
      this.verFormulario = true
      this.seleccionarMinuta = false
    },
    cerrarFormulario: function () {
      this.verFormulario = false
      this.tipo = 0
      this.idBitacora = 0
    },
    async obtenerTipoMinutas () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_minutas', { headers: Auth.authHeader() })
        this.$store.commit('setTipoMinutas', response.data)
      } catch {
        console.log('No se han obtenido los tipos de minutas')
      }
    },
    async obtenerEstudiante () {
      try {
        const response = await axios.get(this.apiUrl + '/estudiantes/' + this.usuario.id, { headers: Auth.authHeader() })
        this.$store.commit('setEstudiante', response.data)
        this.obtenerGrupo()
      } catch {
        console.log('No se ha obtenido la infomración del estudiante')
      }
    },
    async obtenerGrupo () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos/' + this.estudiante.grupo_id, { headers: Auth.authHeader() })
        this.$store.commit('setGrupo', response.data)
      } catch {
        console.log('No se ha obtenido la información del grupo')
      }
    },
    establecerBitacora: function (id) {
      this.idBitacora = id
      this.verFormulario = true
    },
    establecerRevision: function (id) {
      this.idRevision = id
      this.verRevision = true
      this.crearMinuta = false
    },
    mostrarTablero: function () {
      this.verRevision = false
      this.crearMinuta = true
      this.idRevision = 0
      this.$refs.tablero.obtenerParaRevisar()
    }
  },
  mounted () {
    this.obtenerTipoMinutas()
    this.obtenerEstudiante()
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
