<template>
  <div>

    <div class="tabs is-centered is-toggle is-toggle-rounded">
      <ul>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.borradores}">
          <a @click="elegirTab(nombreTabs.borradores)">
            <span>Borradores</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.emitidas}">
          <a @click="elegirTab(nombreTabs.emitidas)">
            <span>Emitidas</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.revision}">
          <a @click="elegirTab(nombreTabs.revision)">
            <span>Para revisar</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.comentadas}">
          <a @click="elegirTab(nombreTabs.comentadas)">
            <span>Comentadas</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.respondidas}">
          <a @click="elegirTab(nombreTabs.respondidas)">
            <span>Respondidas</span>
          </a>
        </li>
        <li :class="{ 'is-active' : nombreTab === nombreTabs.cerradas}">
          <a @click="elegirTab(nombreTabs.cerradas)">
            <span>Cerradas</span>
          </a>
        </li>
      </ul>
    </div>

    <div v-if="nombreTab === nombreTabs.borradores">
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Borradores</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarBorradores">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizado por</th>
                <th>Iniciada el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaBorradores" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo}}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <br>
            <p class="subtitle is-5">No hay borradores para mostrar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.emitidas">
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Emitidas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarEmitidas">
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
              <tr class="has-text-centered" v-for="(bitacora, index) in listaEmitidas" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.fecha_emision) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <br>
            <p class="subtitle is-5">No hay minutas emitidas para mostrar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.comentadas">
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Comentadas por integrantes del grupo</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarComentadasGrupo">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Comentada por</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaComentadasGrupo" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas comentadas por los integrantes del grupo para mostrar</p>
          </div>
        </div>
      </section>
      <hr>
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Comentadas por el Cliente</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarComentadasCliente">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Comentada por</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaComentadasClente" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas comentadas por el Cliente para mostrar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.respondidas">
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Respondidas por los integrantes del grupo</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidasGrupo">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Respondida por</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRespondidasGrupo" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas respondidas por los integrantes del grupo</p>
          </div>
        </div>
      </section>
      <hr>
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Respondidas por el Cliente</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidasCliente">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Realizada por</th>
                <th>Respondida por</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRespondidasCliente" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas respondidas por el Cliente para mostrar</p>
          </div>
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
                <th>Cerrada el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaCerradas" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revision }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas cerradas a mostrar</p>
          </div>
        </div>
      </section>
    </div>

    <div v-if="nombreTab === nombreTabs.revision">
      <section class="new-section">
        <div class="container">
          <p class="title is-5">Minutas para revisar</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRevision">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Revisión</th>
                <th>Creada por</th>
                <th>Creada el</th>
              </tr>
            </thead>
            <tbody>
              <tr class="has-text-centered" v-for="(bitacora, index) in listaRevision" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.revsion }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="subtitle is-5">No hay minutas pendientes de revisión</p>
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
  borradores: 'Borradores',
  emitidas: 'Emitidas',
  revision: 'Revision',
  comentadas: 'Comentadas',
  respondidas: 'Respondidas',
  cerradas: 'Cerradas'
}

export default {
  name: 'TableroEst',
  data () {
    return {
      nombreTab: 'Borradores',
      nombreTabs,
      listaMinutas: [],
      listaBorradores: [],
      listaComentadasGrupo: [],
      listaComentadasCliente: [],
      listaRespondidasGrupo: [],
      listaRespondidasCliente: [],
      listaCerradas: [],
      listaEmitidas: [],
      listaRevision: []
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    mostrarBorradores: function () {
      if (this.listaBorradores.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarEmitidas: function () {
      if (this.listaEmitidas.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarCerradas: function () {
      if (this.listaCerradas.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarComentadasGrupo: function () {
      if (this.listaComentadasGrupo.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarComentadasCliente: function () {
      if (this.listaComentadasCliente.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarRespondidasGrupo: function () {
      if (this.listaRespondidasGrupo.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarRespondidasCliente: function () {
      if (this.listaRespondidasCliente.length > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarRevision: function () {
      if (this.listaRevision.length > 0) {
        return true
      } else {
        return false
      }
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
          if (this.listaMinutas[i].estado.abreviacion === 'BOR') {
            this.listaBorradores.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'CIG') {
            this.listaComentadasGrupo.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'CSK') {
            this.listaComentadasCliente.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'RIG') {
            this.listaRespondidasGrupo.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'RSK') {
            this.listaRespondidasCliente.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'CER') {
            this.listaCerradas.push(this.listaMinutas[i])
          } else if (this.listaMinutas[i].estado.abreviacion === 'EMI') {
            this.listaEmitidas.push(this.listaMinutas[i])
          }
        }
      }
    },
    async obtenerMinutas () {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/revision/estados', { headers: Auth.authHeader() })
        this.listaMinutas = response.data
        this.categorizarMinutas()
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
    }
  },
  mounted () {
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
