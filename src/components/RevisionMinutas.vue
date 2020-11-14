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
          <div class="field">
            <div class="control">
              <label class="label">Listado de grupos</label>
            </div>
          </div>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>N°</th>
                <th>Grupo</th>
                <th>Proyecto</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(grupo, index) in gruposJornada" :key="grupo.id">
                <th :class="{ 'is-selected' : grupoActual === grupo.id}">{{ index + 1 }}</th>
                <td :class="{ 'is-selected' : grupoActual === grupo.id}" @click="seleccionarGrupo(grupo.id)">{{ grupo.nombre }}</td>
                <td :class="{ 'is-selected' : grupoActual === grupo.id}" @click="seleccionarGrupo(grupo.id)">{{ grupo.proyecto }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-1"></div>
        <div class="column">
          <div v-if="grupoActual !== 0">
            <div class="field">
              <div class="control">
                <label class="label">Estudiantes</label>
              </div>
            </div>
            <div >
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th>R.U.N.</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="estudiante in grupoSeleccionado.estudiantes" :key="estudiante.id">
                    <td>{{ estudiante.run_est }}</td>
                    <td>{{ nombreCompleto(estudiante) }}</td>
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
            <div class="field">
              <div class="control">
                <label class="label">Minutas</label>
              </div>
            </div>
            <div v-if="listaMinutas.length > 0">
              <table class="table is-bordered is-fullwidth is-narrow">
                <thead>
                  <tr class="has-text-centered has-background-light">
                    <th>N°</th>
                    <th>Código minuta</th>
                    <th>Revisión</th>
                    <th>Creada por</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bitacora, index) in listaMinutas" :key="bitacora.id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ bitacora.minuta.codigo }}</td>
                    <td>{{ bitacora.revision }}</td>
                    <td>{{ bitacora.minuta.creada_por }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <br>
              <p class="subtitle is-5">No hay minutas emitidas para revisar</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState } from 'vuex'

const nombreTabs = {
  diurna: 'Diurna',
  vespertina: 'Vespertina'
}

export default {
  name: 'RevisionMinutas',
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
    }
  },
  methods: {
    elegirTab: function (nombreTab) {
      this.jornadaActual = nombreTab
      this.grupoActual = 0
      this.mostrarMinutas = false
    },
    buscarPorId: function (lista, id) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
          return lista[i]
        }
      }
    },
    seleccionarGrupo: function (id) {
      this.grupoActual = id
      this.grupoSeleccionado = this.buscarPorId(this.listaGrupos, id)
      this.obtenerMinutas(id)
      this.mostrarMinutas = true
    },
    nombreCompleto: function (estudiante) {
      return estudiante.nombre_est + ' ' + estudiante.apellido1 + ' ' + estudiante.apellido2
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
    }
  },
  mounted () {
    this.obtenerGrupos()
    this.obtenerJornadas()
  }
}

</script>
