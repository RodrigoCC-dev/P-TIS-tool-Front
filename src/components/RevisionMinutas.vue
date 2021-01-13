<template >
  <div>
    <br>

    <div v-if="!mostrarFormulario">

      <SelectorJornada/>

      <div class="columns">
        <div class="column is-three-fifths">
          <div v-if="mostrarGrupos">
            <div class="field">
              <div class="control">
                <label id="grupos" class="label">Listado de grupos</label>
              </div>
            </div>
            <table class="table is-fullwidth" aria-describedby="grupos">
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Grupo</th>
                  <th scope="col">Proyecto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(grupo, index) in gruposJornada" :key="grupo.id">
                  <th scope="row" :class="{ 'is-selected-usach' : grupoActual === grupo.id}">{{ index + 1 }}</th>
                  <td :class="{ 'is-selected-usach' : grupoActual === grupo.id}" @click="seleccionarGrupo(grupo.id)">{{ grupo.nombre }}</td>
                  <td :class="{ 'is-selected-usach' : grupoActual === grupo.id}" @click="seleccionarGrupo(grupo.id)"><a>{{ grupo.proyecto }}</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="column is-1"></div>
        <div class="column">
          <div v-if="grupoActual !== 0">
            <div class="field">
              <div class="control">
                <label id="estudiantes" class="label">Estudiantes</label>
              </div>
            </div>
            <div >
              <table class="table is-fullwidth" aria-describedby="estudiantes">
                <thead>
                  <tr>
                    <th scope="col">R.U.N.</th>
                    <th scope="col">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="estudiante in grupoSeleccionado.estudiantes" :key="estudiante.id">
                    <td>{{ estudiante.usuario.run }}</td>
                    <td>{{ nombreCompleto(estudiante.usuario) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-if="mostrarMinutas">
        <br>
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div v-if="listaMinutas.length > 0">
              <div class="field">
                <div class="control">
                  <label id="minutas" class="label">Minutas</label>
                </div>
              </div>
              <div >
                <table class="table is-bordered is-fullwidth is-narrow" aria-describedby="minutas">
                  <thead>
                    <tr class="has-background-light">
                      <th scope="col" class="has-text-centered">N°</th>
                      <th scope="col" class="has-text-centered">Código minuta</th>
                      <th scope="col" class="has-text-centered">Revisión</th>
                      <th scope="col" class="has-text-centered">Creada por</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(bitacora, index) in listaMinutas" :key="bitacora.id">
                      <th scope="row" class="has-text-centered">{{ index + 1 }}</th>
                      <td><a @click="traerMinuta(bitacora.id)">{{ bitacora.minuta.codigo }}</a></td>
                      <td class="has-text-centered">{{ bitacora.revision }}</td>
                      <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else>
              <br>
              <p class="subtitle is-5">No hay minutas emitidas para revisar</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else>

      <Informacion :proyecto="grupoSeleccionado" :minuta="bitacora"/>
      <Objetivos :lista="bitacora.minuta.objetivos"/>
      <Conclusiones :lista="bitacora.minuta.conclusiones"/>
      <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia" :comentar="false" :responder="false" :lista-com="[]" :ver-respuestas="false"/>

      <br>
      <div class="columns">
        <div class="column is-4 is-offset-2">
          <div class="field">
            <div class="control">
              <a class="button is-primary-usach is-fullwidth" @click="cerrarFormulario">Volver</a>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <div class="control">
              <a class="button is-dark is-fullwidth" @click="verRegistros">Ver registro</a>
            </div>
          </div>
        </div>
      </div>

      <br>
      <div v-if="mostrarRegistros">
        <Registros :id-bitacora="bitacora.id" @cerrar="cerrarRegistros"/>
      </div>

    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import axios from 'axios'
import { mapState } from 'vuex'

import SelectorJornada from '@/components/SelectorJornada.vue'
import Informacion from '@/components/minutas/Informacion.vue'
import Objetivos from '@/components/minutas/Objetivos.vue'
import Conclusiones from '@/components/minutas/Conclusiones.vue'
import Items from '@/components/minutas/Items.vue'
import Registros from '@/components/RegistroMinuta.vue'

export default {
  name: 'RevisionMinutas',
  components: {
    SelectorJornada,
    Informacion,
    Objetivos,
    Conclusiones,
    Items,
    Registros
  },
  data () {
    return {
      listaGrupos: [],
      mostrarFormulario: false,
      mostrarMinutas: false,
      mostrarRegistros: false,
      grupoActual: 0,
      grupoSeleccionado: {},
      listaMinutas: [],
      bitacora: {}
    }
  },
  computed: {
    ...mapState(['apiUrl', 'jornadaActual']),

    gruposJornada: function () {
      var lista = []
      for (var i = 0; i < this.listaGrupos.length; i++) {
        if (this.listaGrupos[i].jornada === this.jornadaActual) {
          lista.push(this.listaGrupos[i])
        }
      }
      return lista
    },
    mostrarGrupos: function () {
      return this.gruposJornada.length > 0
    }
  },
  methods: {
    buscarPorId: function (lista, id) {
      return Funciones.busquedaPorId(lista, id)
    },
    seleccionarGrupo: function (id) {
      this.grupoActual = id
      this.grupoSeleccionado = this.buscarPorId(this.listaGrupos, id)
      this.obtenerMinutas(id)
      this.mostrarMinutas = true
    },
    nombreCompleto: function (estudiante) {
      return Funciones.nombreCompleto(estudiante)
    },
    async obtenerGrupos () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos', { headers: Auth.authHeader() })
        this.listaGrupos = response.data
      } catch {
        console.log('No se han obtenido los grupos')
      }
    },
    async obtenerMinutas (grupoId) {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/grupo/' + grupoId, { headers: Auth.authHeader() })
        this.listaMinutas = response.data
      } catch {
        console.log('No fue posible obtener las minutas')
      }
    },
    async traerMinuta (bitacoraId) {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/' + bitacoraId, { headers: Auth.authHeader() })
        this.bitacora = response.data
        this.mostrarFormulario = true
      } catch {
        console.log('No fue posible obtener la información de la minuta seleccionada')
      }
    },
    cerrarFormulario: function () {
      this.mostrarFormulario = false
      this.mostrarRegistros = false
    },
    verRegistros: function () {
      this.mostrarRegistros = true
    },
    cerrarRegistros: function () {
      this.mostrarRegistros = false
    }
  },
  mounted () {
    this.obtenerGrupos()
  }
}

</script>
