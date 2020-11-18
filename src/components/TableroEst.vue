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
                <th>Realizado por</th>
                <th>Iniciada el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaBorradores" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo}}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ bitacora.minuta.creada_el }}</td>
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
                <th>Realizada por</th>
                <th>Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bitacora, index) in listaEmitidas" :key="bitacora.id">
                <th>{{ index + 1 }}</th>
                <td>{{ bitacora.minuta.codigo }}</td>
                <td>{{ bitacora.minuta.creada_por }}</td>
                <td>{{ bitacora.minuta.creada_el }}</td>
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

  </div>
</template>

<script>
import axios from 'axios'
import Auth from '@/services/auth.js'
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
      listaEmitidas: []
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
    mostrarComentadas: function () {
      if (this.listaComentadasGrupo.length > 0 || this.listaComentadasCliente > 0) {
        return true
      } else {
        return false
      }
    },
    mostrarRevisadas: function () {
      if (this.listaRevisadasGrupo.length > 0 || this.listaRevisadasCliente.length > 0) {
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
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.obtenerMinutas()
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
