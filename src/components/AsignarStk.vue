<template>
  <div>

    <SelectorGrupo @eleccion="seleccionarGrupo"/>

    <div v-if="mostrarStakeholders">
      <br>
      <br>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div v-if="mostrarTabla">

            <div class="field">
              <div class="control">
                <label id="stakeholders" class="label">Clientes</label>
              </div>
            </div>

            <div>
              <table class="table is-bordered is-fullwidth is-narrow" aria-describedby="stakeholders">
                <thead>
                  <tr class="has-background-light">
                    <th scope="col" class="has-text-centered">N°</th>
                    <th scope="col" class="has-text-centered">Nombre cliente</th>
                    <th scope="col" class="has-text-centered"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stakeholder, index) in stakeholdersPorJornada" :key="stakeholder.id">
                    <th scope="row" class="has-text-centered">{{ index + 1 }}</th>
                    <td class="has-text-left">{{ nombreCompleto(stakeholder) }}</td>
                    <td class="has-text-centered"><input type="checkbox" v-model="asignados" :value="stakeholder.id"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br>
            <br>
            <div class="columns is-centered">
              <div class="column is-half" v-if="mostrarAsignar">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <button class="button is-secondary-usach" @click="cambiarAsignacion">Asignar</button>
                  </div>
                  <div class="control">
                    <button class="button is-info-usach" @click="cerrar">Volver</button>
                  </div>
                </div>
              </div>
              <div class="column is-half" v-else>
                <div class="field">
                  <div class="control">
                    <button class="button is-info-usach is-fullwidth" @click="cerrar">Volver</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
// import axios from 'axios'
import { mapState } from 'vuex'

import SelectorGrupo from '@/components/SelectorGrupo.vue'

export default {
  name: 'AsignarStk',
  props: ['clientes'],
  components: {
    SelectorGrupo
  },
  data () {
    return {
      grupoSeleccionado: {},
      mostrarStakeholders: false,
      asignados: [],
      listaStakeholders: this.clientes
    }
  },
  computed: {
    ...mapState(['apiUrl', 'jornadaActual']),

    stakeholdersPorJornada: function () {
      return Funciones.obtenerListaSegunTipo(this.listaStakeholders, 'jornada', this.jornadaActual)
    },
    mostrarTabla: function () {
      return this.stakeholdersPorJornada.length > 0
    },
    mostrarAsignar: function () {
      return this.asignados.length > 0
    }
  },
  methods: {
    seleccionarGrupo: function (grupo) {
      this.grupoSeleccionado = grupo
      this.mostrarStakeholders = true
      this.stakeholdersAsignados()
    },
    nombreCompleto: function (cliente) {
      return Funciones.nombreCompleto(cliente)
    },
    buscarIndex: function (lista, id) {
      return Funciones.buscarIndexPorId(lista, id)
    },
    stakeholdersAsignados: function () {
      var aux = 0
      this.asignados = []
      var lista = this.grupoSeleccionado.stakeholders
      for (var i = 0; i < lista.length; i++) {
        aux = this.buscarIndex(this.stakeholdersPorJornada, lista[i].id)
        if (aux !== -1) {
          this.asignados[aux] = lista[i].id
        }
      }
    },
    cambiarAsignacion: function () {
      console.log('Se cambia asignación')
    },
    cerrar: function () {
      this.$emit('cerrar')
    }
  }
}
</script>
