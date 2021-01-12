<template>
  <div>

    <div v-if="!revisarMinuta">

      <br>
      <SelectorJornada/>

      <SelectorGrupo @eleccion="seleccionarGrupo"/>

      <br>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div v-if="mostrarMinutas">
            <div class="field">
              <div class="control">
                <label id="avances" class="label">Minutas de avance semanal</label>
              </div>
            </div>
            <div>
              <table class="table is-bordered is-fullwidth is-narrow" aria-describedby="avances">
                <thead>
                  <tr class="has-background-light">
                    <th scope="col" class="has-text-centered">N°</th>
                    <th scope="col" class="has-text-centered">Código minuta</th>
                    <th scope="col" class="has-text-centered">Sprint</th>
                    <th scope="col" class="has-text-centered">Creada el</th>
                    <th scope="col" class="has-text-centered">Emitida el</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bitacora, index) in listaAvances" :key="bitacora.id">
                    <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                    <td><a @click="revisarAvance(bitacora)">{{ bitacora.minuta.codigo }}</a></td>
                    <td class="has-text-centered">{{ bitacora.minuta.numero_sprint }}</td>
                    <td class="has-text-centered">{{ convertirFecha(bitacora.minuta.creada_el) }}</td>
                    <td class="has-text-centered">{{ convertirFecha(bitacora.fecha_emision) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else>

    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import axios from 'axios'
import { mapState } from 'vuex'

import SelectorJornada from '@/components/SelectorJornada.vue'
import SelectorGrupo from '@/components/SelectorGrupo.vue'

export default {
  name: 'RevisionAvances',
  components: {
    SelectorJornada,
    SelectorGrupo
  },
  data () {
    return {
      grupoSeleccionado: {},
      listaAvances: [],
      revisarMinuta: false
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    mostrarMinutas: function () {
      return this.listaAvances.length > 0
    }
  },
  methods: {
    convertirFecha: function (timestamp) {
      return Funciones.obtenerFecha(timestamp)
    },
    seleccionarGrupo: function (grupo) {
      this.grupoSeleccionado = grupo
      this.obtenerAvances()
    },
    async obtenerAvances () {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/avances/semanales/grupo/' + this.grupoSeleccionado.id, { headers: Auth.authHeader() })
        this.listaAvances = response.data
      } catch (e) {
        console.log('No se han obtenido las minutas de avance del grupo seleccionado')
        console.log(e)
      }
    }
  }
}
</script>
