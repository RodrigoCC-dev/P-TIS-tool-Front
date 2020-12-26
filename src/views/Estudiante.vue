<template>
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <div v-if="crearMinuta">

        <Minuta :tipo-minuta="tipo" :id-bitacora="idBitacora" v-if="verFormulario" @cerrar="cerrarFormulario"/>

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

          <Tablero :minutas="listaMinutas" :revision="listaRevision" @bitacora="establecerBitacora" @revision="establecerRevision" @comentarios="revisarComentarios" @respuestas="revisarRespuestas"/>

        </div>

      </div>

      <div v-else-if="verRevision">
        <Comentar :id-bitacora="idRevision" @cerrar="mostrarTablero"/>
      </div>

      <div v-else-if="verComentarios">
        <Responder :id-bitacora="idComentarios" @cerrar="mostrarTablero"/>
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
import Minuta from '@/components/Minuta.vue'
import Tablero from '@/components/TableroEst.vue'
import Comentar from '@/components/comentarios/ComentarMinuta.vue'
import Responder from '@/components/comentarios/ResponderMinuta.vue'
import Respuestas from '@/components/comentarios/RespuestasMinuta.vue'

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
    Comentar,
    Responder,
    Respuestas
  },
  data () {
    return {
      verFormulario: false,
      tipo: 0,
      seleccionarMinuta: false,
      idBitacora: 0,
      idRevision: 0,
      idComentarios: 0,
      idRespuestas: 0,
      crearMinuta: true,
      verRevision: false,
      verComentarios: false,
      verRespuestas: false,
      listaMinutas: [],
      listaRevision: []
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
    async obtenerMinutas () {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/revision/estados', { headers: Auth.authHeader() })
        this.listaMinutas = response.data
      } catch {
        console.log('No se han obtenido las minutas a mostrar')
      }
    },
    async obtenerParaRevisar () {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/revision/grupo', { headers: Auth.authHeader() })
        this.listaRevision = response.data
      } catch {
        console.log('No se han podido obtener las minutas a revisar')
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
      this.verComentarios = false
      this.crearMinuta = true
      this.idRevision = 0
      this.obtenerMinutas()
      this.obtenerParaRevisar()
    },
    revisarComentarios: function (id) {
      this.idComentarios = id
      this.verComentarios = true
      this.crearMinuta = false
    },
    revisarRespuestas: function (id) {
      this.idRespuestas = id
      this.verRespuestas = true
      this.crearMinuta = false
    }
  },
  mounted () {
    this.obtenerTipoMinutas()
    this.obtenerEstudiante()
    this.obtenerMinutas()
    this.obtenerParaRevisar()
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
