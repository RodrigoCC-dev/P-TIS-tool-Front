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
          <p class="title is-5">Para revisar</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRevision">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRevision" :key="bitacora.id">
                <th>{{ index + 1}}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por}}</td>
                <td>{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
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
          <p class="title is-5">Comentadas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarComentadas">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaComentadas" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por}}</td>
                <td>{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
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
          <p class="title is-5">Respondidas por los estudiantes</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidas">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revision</th>
                <th>Realizada por</th>
                <th>Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRespondidas" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revison }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.cerradas">
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Minutas cerradas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarCerradas">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaCerradas" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
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
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import axios from 'axios'
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
      listaRespondidas: [],
      listaCerradas: [],
      nombreTabs
    }
  },
  methods: {
    elegirTab: function (nombreTab) {
      this.nombreTab = nombreTab
    },
    convertirFecha: function (timestamp) {
      return Funciones.obtenerFecha(timestamp)
    }
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
