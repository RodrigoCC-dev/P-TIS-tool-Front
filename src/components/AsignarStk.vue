<template>
  <div>

    <SelectorGrupo @eleccion="seleccionarGrupo"/>

    <div v-if="mostrarStakeholders">
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
              <table class="table is-bordered is-fullwidth" aria-describedby="stakeholders">
                <thead>
                  <tr class="has-background-light">
                    <th scope="col" class="has-text-centered">N°</th>
                    <th scope="col" class="has-text-centered">Nombre cliente</th>
                    <th scope="col" class="has-text-centered"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stakeholder, index) in stakehodlersPorJornada" :key="stakeholder.id">
                    <th scope="row" class="has-text-centered">{{ index + 1 }}</th>
                    <td class="has-text-left">{{ nombreCompleto(stakeholder) }}</td>
                    <td class="has-text-centered"><input type="checkbox" v-model="asignados" :value="stakeholder.id"></td>
                  </tr>
                </tbody>
              </table>
            </div>
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

import SelectorGrupo from '@/components/SelectorGrupo.vue'

export default {
  name: 'AsignarStk',
  props: ['jornada', 'clientes'],
  components: {
    SelectorGrupo
  },
  data () {
    return {
      grupoActual: 0,
      mostrarStakeholders: false,
      asignados: [],
      jornadaActual: this.jornada
      listaStakeholders: this.clientes
    }
  },
  computed: {
    ...mapstate(['apiUrl']),

    stakeholdersPorJornada: function () {
      var lista = []
      for (var i = 0; i < this.listaStakeholders.length; i++) {
        if (this.listaStakeholders[i].jornada === this.jornadaActual) {
          lista.push(this.listaStakeholders[i])
        }
      }
      return lista
    },
  },
  methods: {
    seleccionarGrupo: function (id) {
      this.grupoActual = id
      this.mostrarStakeholders = true
    },
    nombreCompleto: function (cliente) {
      return Funciones.nombreCompleto(cliente)
    }
  }
}
</script>
