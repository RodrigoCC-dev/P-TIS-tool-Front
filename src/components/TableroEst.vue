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
          <p id="borradores" class="title is-5">Borradores</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarBorradores" aria-describedby="borradores">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizado por</th>
                <th class="has-text-centered" scope="col">Iniciada el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaBorradores" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td><a @click="editarBorrador(bitacora.id)">{{ bitacora.minuta.codigo}}</a></td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered">{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
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
          <p id="emitidas" class="title is-5">Emitidas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarEmitidas" aria-describedby="emitidas">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizada por</th>
                <th class="has-text-centered" scope="col">Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaEmitidas" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered">{{ convertirFecha(bitacora.fecha_emision) }}</td>
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
          <p id="comentadas" class="title is-5">Comentadas por integrantes del grupo</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarComentadasGrupo" aria-describedby="comentadas">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizada por</th>
                <th class="has-text-centered" scope="col">Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaComentadasGrupo" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered">{{ convertirFecha((bitacora.fecha_emision)) }}</td>
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
          <p id="cliente" class="title is-5">Comentadas por el Cliente</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarComentadasCliente" aria-describedby="cliente">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizada por</th>
                <th class="has-text-centered" scope="col">Comentada por</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaComentadasClente" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered"></td>
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
          <p id="respondidas" class="title is-5">Respondidas por los integrantes del grupo</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidasGrupo" aria-describedby="respondidas">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizada por</th>
                <th class="has-text-centered" scope="col">Respondida por</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaRespondidasGrupo" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered"></td>
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
          <p id="resp-cliente" class="title is-5">Respondidas por el Cliente</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRespondidasCliente" aria-describedby="resp-cliente">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizada por</th>
                <th class="has-text-centered" scope="col">Respondida por</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaRespondidasCliente" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered"></td>
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
          <p id="cerradas" class="title is-5">Minutas cerradas</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarCerradas" aria-describedby="cerradas">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Realizada por</th>
                <th class="has-text-centered" scope="col">Cerrada el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaCerradas" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered"></td>
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
          <p id="revisar" class="title is-5">Minutas para revisar</p>
          <table class="table is-fullwidth is-bordered is-narrow" v-if="mostrarRevision" aria-describedby="revisar">
            <thead>
              <tr class="has-background-light">
                <th class="has-text-centered" scope="col">N°</th>
                <th class="has-text-centered" scope="col">Código</th>
                <th class="has-text-centered" scope="col">Revisión</th>
                <th class="has-text-centered" scope="col">Creada por</th>
                <th class="has-text-centered" scope="col">Creada el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaRevision" :key="bitacora.id">
                <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                <td><a @click="revisarMinuta(bitacora.id)">{{ bitacora.minuta.codigo }}</a></td>
                <td class="has-text-centered">{{ bitacora.revision }}</td>
                <td class="has-text-centered">{{ bitacora.minuta.creada_por }}</td>
                <td class="has-text-centered">{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
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
  props: ['contador'],
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
      listaRevision: [],
      contar: this.contador
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    mostrarBorradores: function () {
      return this.listaBorradores.length > 0
    },
    mostrarEmitidas: function () {
      return this.listaEmitidas.length > 0
    },
    mostrarCerradas: function () {
      return this.listaCerradas.length > 0
    },
    mostrarComentadasGrupo: function () {
      return this.listaComentadasGrupo.length > 0
    },
    mostrarComentadasCliente: function () {
      return this.listaComentadasCliente.length > 0
    },
    mostrarRespondidasGrupo: function () {
      return this.listaRespondidasGrupo.length > 0
    },
    mostrarRespondidasCliente: function () {
      return this.listaRespondidasCliente.length > 0
    },
    mostrarRevision: function () {
      return this.listaRevision.length > 0
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
    },
    editarBorrador: function (id) {
      this.$emit('bitacora', id)
    },
    revisarMinuta: function (id) {
      this.$emit('revision', id)
    }
  },
  mounted () {
    this.obtenerMinutas()
  },
  beforeUpdate () {
    this.obtenerParaRevisar()
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
