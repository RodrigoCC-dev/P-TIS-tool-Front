<template>
  <div>

    <div v-if="mostrarMinuta">
      <Informacion :proyecto="grupo" :minuta="bitacora"/>
      <Objetivos :lista="bitacora.minuta.objetivos"/>
      <Conclusiones :lista="bitacora.minuta.conclusiones"/>
      <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia" :comentar="false" :responder="true" :lista-com="comentarios" :ver-respuestas="true"/>
    </div>

    <div>
      <br>
      <br>
      <div class="columns">
        <div class="column is-7 is-offset-2">
          <div class="field is-horizontal">
            <div class="field-label-2c is-normal">
              <label class="label">Estado de aprobación: </label>
            </div>
            <div class="field-body">
              <div class="field has-addons has-addons-right">
                <p class="control is-expanded">
                  <span class="select is-fullwidth">
                    <select v-model="aprobacion">
                      <option v-for="(aprobacion, index) in aprobacionesFiltradas" :key="aprobacion.id" :value="aprobacion.id">{{ index + 1 }} - {{ aprobacion.descripcion }}</option>
                    </select>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-link" @click="establecerEstado">Establecer estado</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState } from 'vuex'

import Informacion from '@/components/minutas/Informacion.vue'
import Objetivos from '@/components/minutas/Objetivos.vue'
import Conclusiones from '@/components/minutas/Conclusiones.vue'
import Items from '@/components/minutas/Items.vue'

export default {
  name: 'RespuestasMinuta',
  props: ['idBitacora'],
  components: {
    Informacion,
    Objetivos,
    Conclusiones,
    Items
  },
  data () {
    return {
      id: this.idBitacora,
      bitacora: {},
      comentarios: []
    }
  },
  computed: {
    ...mapState(['apiUrl', 'grupo', 'tipoAprobaciones']),

    mostrarMinuta: function () {
      return Object.keys(this.bitacora).length > 0
    },
    aprobacionesFiltradas: function () {
      var lista = []
      for (var i = 0; i < this.tipoAprobaciones.length; i++) {
        if (this.tipoAprobaciones[i].identificador !== 'AC' && this.tipoAprobaciones[i].identificador !== 'RC') {
          lista.push(this.tipoAprobaciones[i])
        }
      }
      return lista
    }
  },
  methods: {
    async obtenerMinuta (bitacoraId) {
      try {
        const response = await axios.get(this.apiUrl + '/minutas/' + bitacoraId, { headers: Auth.authHeader() })
        this.bitacora = response.data
      } catch (e) {
        console.log('No fue posible obtener la información de la minuta seleccionada')
        console.log(e)
      }
    },
    async obtenerRespuestas (bitacoraId) {
      try {
        const response = await axios.get(this.apiUrl + '/respuestas/' + bitacoraId, { headers: Auth.authHeader() })
        this.comentarios = response.data
      } catch (e) {
        console.log('No fue posible obtener los comentarios y respuestas de la minuta')
        console.log(e)
      }
    }
  },
  mounted () {
    this.obtenerMinuta(this.id)
    this.obtenerRespuestas(this.id)
  }
}
</script>
