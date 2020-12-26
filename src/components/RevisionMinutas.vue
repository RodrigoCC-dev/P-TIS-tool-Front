<template >
  <div>
    <br>

    <div v-if="!mostrarFormulario">

      <div v-if="mostrarJornadas">
        <section>
          <div class="tabs is-toggle is-toggle-rounded is-centered">
            <ul>
              <li :class="{ 'is-active' : jornadaActual === nombreTabs.diurna }" @click="elegirTab(nombreTabs.diurna)"><a><span>Diurnos</span></a></li>
              <li :class="{ 'is-active' : jornadaActual === nombreTabs.vespertina }" @click="elegirTab(nombreTabs.vespertina)"><a><span>Vespertinos</span></a></li>
            </ul>
          </div>
        </section>
        <br>
      </div>

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
                  <th scope="row" :class="{ 'is-selected' : grupoActual === grupo.id}">{{ index + 1 }}</th>
                  <td :class="{ 'is-selected' : grupoActual === grupo.id}" @click="seleccionarGrupo(grupo.id)">{{ grupo.nombre }}</td>
                  <td :class="{ 'is-selected' : grupoActual === grupo.id}" @click="seleccionarGrupo(grupo.id)">{{ grupo.proyecto }}</td>
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
                    <tr class="has-text-centered has-background-light">
                      <th scope="col">N°</th>
                      <th scope="col">Código minuta</th>
                      <th scope="col">Revisión</th>
                      <th scope="col">Creada por</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(bitacora, index) in listaMinutas" :key="bitacora.id">
                      <th scope="row">{{ index + 1 }}</th>
                      <td><a @click="traerMinuta(bitacora.id)">{{ bitacora.minuta.codigo }}</a></td>
                      <td>{{ bitacora.revision }}</td>
                      <td>{{ bitacora.minuta.creada_por }}</td>
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
        <div class="column is-4 is-offset-4">
          <div class="control">
            <button class="button is-link is-fullwidth" @click="cerrarFormulario">Volver</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import axios from 'axios'
import { mapState } from 'vuex'

import Informacion from '@/components/minutas/Informacion.vue'
import Objetivos from '@/components/minutas/Objetivos.vue'
import Conclusiones from '@/components/minutas/Conclusiones.vue'
import Items from '@/components/minutas/Items.vue'

const nombreTabs = {
  diurna: 'Diurna',
  vespertina: 'Vespertina'
}

export default {
  name: 'RevisionMinutas',
  components: {
    Informacion,
    Objetivos,
    Conclusiones,
    Items
  },
  data () {
    return {
      jornadaActual: 'Diurna',
      jornadasProfesor: [],
      listaGrupos: [],
      mostrarFormulario: false,
      mostrarJornadas: false,
      mostrarMinutas: false,
      grupoActual: 0,
      grupoSeleccionado: {},
      listaMinutas: [],
      bitacora: {},
      nombreTabs
    }
  },
  computed: {
    ...mapState(['apiUrl']),

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
    elegirTab: function (nombreTab) {
      this.jornadaActual = nombreTab
      this.grupoActual = 0
      this.mostrarMinutas = false
    },
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
    async obtenerJornadas () {
      try {
        const response = await axios.get(this.apiUrl + '/jornadas', { headers: Auth.authHeader() })
        var datos = response.data
        if (Object.keys(datos).length > 0) {
          var aux = 0
          for (var i = 0; i < Object.keys(datos).length; i++) {
            if (this.jornadasProfesor.indexOf(datos[i].nombre) === -1) {
              aux = this.jornadasProfesor.push(datos[i].nombre)
            }
          }
          if (aux === 2) {
            this.mostrarJornadas = true
          } else if (aux === 1) {
            this.jornadaActual = this.jornadasProfesor[0]
          } else {
            this.mostrarJornadas = false
          }
        }
      } catch {
        console.log('No fue posible obtener las jornadas del profesor')
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
    }
  },
  mounted () {
    this.obtenerGrupos()
    this.obtenerJornadas()
  }
}

</script>
