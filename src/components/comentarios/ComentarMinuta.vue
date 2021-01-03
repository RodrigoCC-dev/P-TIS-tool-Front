<template>
  <div>

    <div v-if="mostrarMinuta">
      <Informacion :proyecto="grupo" :minuta="bitacora"/>
      <Objetivos :lista="bitacora.minuta.objetivos"/>
      <Conclusiones :lista="bitacora.minuta.conclusiones"/>
      <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia" :comentar="true" :responder="false" :lista-com="[]" :ver-respuestas="false" @comentar="recibirComentarios" @cerrar="cerrarRevision"/>
    </div>

    <div v-if="mostrarAprobacion">
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
                      <option v-for="(aprobacion, index) in tipoAprobaciones" :key="aprobacion.id" :value="aprobacion.id">{{ index + 1 }} - {{ aprobacion.descripcion }}</option>
                    </select>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-secondary-usach" @click="establecerEstado">Establecer estado</a>
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
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState } from 'vuex'

import Informacion from '@/components/minutas/Informacion.vue'
import Objetivos from '@/components/minutas/Objetivos.vue'
import Conclusiones from '@/components/minutas/Conclusiones.vue'
import Items from '@/components/minutas/Items.vue'

export default {
  name: 'ComentarMinuta',
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
      comentarios: [],
      mostrarAprobacion: false,
      aprobacion: 0
    }
  },
  computed: {
    ...mapState(['apiUrl', 'grupo', 'tipoAprobaciones']),

    mostrarMinuta: function () {
      return Object.keys(this.bitacora).length > 0
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
    async enviarComentarios () {
      const comentarios = {
        id: this.id,
        comentarios: this.comentarios,
        tipo_aprobacion_id: this.aprobacion
      }
      try {
        await axios.post(this.apiUrl + '/comentarios', comentarios, { headers: Auth.postHeader() })
      } catch (e) {
        console.log('No fue posible enviar los comentarios')
        console.log(e)
      }
    },
    recibirComentarios: function (comentarios) {
      this.comentarios = comentarios
      this.mostrarAprobacion = true
    },
    cerrarRevision: function () {
      this.$emit('cerrar')
    },
    establecerEstado: function () {
      this.enviarComentarios()
      this.$emit('cerrar')
      this.mostrarAprobacion = false
    },
    limpiarCampos: function () {
      this.bitacora = {}
      this.comentarios = []
      this.aprobacion = 0
    }
  },
  mounted () {
    this.obtenerMinuta(this.id)
  }
}
</script>
