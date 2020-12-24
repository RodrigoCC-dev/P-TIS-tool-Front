<template>
  <div>

    <div class="tabs is-centered is-toggle is-toggle-rounded">
      <ul>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.revision }">
          <a @click="elegirTab(nombreTabs.revision)">
            <span>Para revisión</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.comentadas }">
          <a @click="elegirTab(nombreTabs.comentadas)">
            <span>Comentadas</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.respondidas }">
          <a @click="elegirTab(nombreTabs.respondidas)">
            <span>Respondidas</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.cerradas }">
          <a @click="elegirTab(nombreTabs.cerradas)">
            <span>Cerradas</span>
          </a>
        </li>
      </ul>
    </div>

    <div v-if="nombreTab === nombreTabs.revision">
      <section class="new-section">
        <div class="container">
          <p id="revision" class="title is-5">Para revisar</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRevision" aria-describedby="revision">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th scope="col">N°</th>
                <th scope="col">Código</th>
                <th scope="col">Revisión</th>
                <th scope="col">Realizada por</th>
                <th scope="col">Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRevision" :key="bitacora.id">
                <th scope="row">{{ index + 1}}</th>
                <td><a @click="revisarMinuta(bitacora.id)">{{ bitacora.minuta.codigo }}</a></td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por}}</td>
                <td>{{ convertirFecha(bitacora.minuta.fecha_emision) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <br>
            <p class="subtitle is-5">No hay minutas para revisar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.comentadas">
      <section class="new-section">
        <div class="container">
          <p id="comentadas" class="title is-5">Comentadas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarComentadas" aria-describedby="comentadas">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th scope="col">N°</th>
                <th scope="col">Código</th>
                <th scope="col">Revisión</th>
                <th scope="col">Realizada por</th>
                <th scope="col">Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaComentadas" :key="bitacora.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por}}</td>
                <td>{{ convertirFecha(bitacora.minuta.fecha_emision) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <br>
            <p class="subtitle is-5">No hay minutas comentadas para mostrar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.respondidas">
      <section class="new-section">
        <div class="container">
          <p id="respondidas" class="title is-5">Respondidas por los estudiantes</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidasGrupo" aria-describedby="respondidas">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th scope="col">N°</th>
                <th scope="col">Código</th>
                <th scope="col">Revision</th>
                <th scope="col">Realizada por</th>
                <th scope="col">Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRespondidasGrupo" :key="bitacora.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revison }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.fecha_emision) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas para mostrar</p>
          </div>
        </div>
      </section>
      <hr>
      <section class="new-section">
        <div class="container">
          <p id="resp-cliente" class="title is-5">Respondidas por el cliente</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidasCliente" aria-describedby="resp-cliente">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th scope="col">N°</th>
                <th scope="col">Código</th>
                <th scope="col">Revisión</th>
                <th scope="col">Realizada por</th>
                <th scope="col">Respondida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRespondidasCliente" :key="bitacora.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <br>
            <p class="subtitle is-5">No hay minutas respondidas para mostrar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.cerradas">
      <section class="new-section">
        <div class="container">
          <p id="cerradas" class="title is-5">Minutas cerradas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarCerradas" aria-describedby="cerradas">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th scope="col">N°</th>
                <th scope="col">Código</th>
                <th scope="col">Revisión</th>
                <th scope="col">Realizada por</th>
                <th scope="col">Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaCerradas" :key="bitacora.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.fecha_emision) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <br>
            <p class="subtitle is-5">No hay minutas cerradas para mostrar</p>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import { mapState } from 'vuex'

const nombreTabs = {
  revision: 'Revision',
  comentadas: 'Comentadas',
  respondidas: 'Respondidas',
  cerradas: 'Cerradas'
}

export default {
  name: 'TableroStk',
  data () {
    return {
      nombreTab: 'Revision',
      listaMinutas: [],
      listaRevision: [],
      listaComentadas: [],
      listaRespondidasGrupo: [],
      listaRespondidasCliente: [],
      listaCerradas: [],
      nombreTabs
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    mostrarRevision: function () {
      return this.listaRevision.length > 0
    },
    mostrarComentadas: function () {
      return this.listaComentadas.length > 0
    },
    mostrarRespondidasGrupo: function () {
      return this.listaRespondidasGrupo.length > 0
    },
    mostrarRespondidasCliente: function () {
      return this.listaRespondidasCliente.length > 0
    },
    mostrarCerradas: function () {
      return this.listaCerradas.length > 0
    }
  },
  methods: {
    elegirTab: function (nombreTab) {
      this.nombreTab = nombreTab
    },
    convertirFecha: function (timestamp) {
      if (timestamp === null || timestamp === undefined) {
        return ''
      } else {
        return Funciones.obtenerFecha(timestamp)
      }
    },
    categorizarMinutas: function () {
      if (this.listaMinutas.length > 0) {
        for (var i = 0; i < this.listaMinutas.length; i++) {
          if (this.listaMinutas[i].estado.abreviacion === 'EMI') {
            this.listaRevision.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'CSK') {
            this.listaComentadas.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'RIG') {
            this.listaRespondidasGrupo.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'RSK') {
            this.listaRespondidasCliente.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'CER') {
            this.listaCerradas.push(this.listaMinutas[i])
          }
        }
      }
    },
    async obtenerMinutas () {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/revision/cliente', { headers: Auth.authHeader() })
        this.listaMinutas = response.data
        this.categorizarMinutas()
      } catch {
        console.log('No se han obtenido las minutas a mostrar')
      }
    },
    revisarMinuta: function (id) {
      this.$emit('revision', id)
    }
  },
  mounted () {
    this.obtenerMinutas()
  },
  beforeUpdate () {
    this.obtenerMinutas()
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
