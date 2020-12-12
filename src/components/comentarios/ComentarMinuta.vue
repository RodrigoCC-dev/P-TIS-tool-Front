<template>
  <div>

    <div v-if="mostrarMinuta">
      <Informacion :proyecto="grupo" :minuta="bitacora"/>
      <Objetivos :lista="bitacora.minuta.objetivos"/>
      <Conclusiones :lista="bitacora.minuta.conclusiones"/>
      <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia" :comentar="true" @comentar="recibirComentarios" @cerrar="cerrarRevision"/>
    </div>

    <div v-if="mostrarAprobacion">
      <br>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <div class="field is horizontal">
            <div class="field-label is-normal">
              <label class="label">Estado de aprobación: </label>
            </div>
            <div class="field-body">
              <div class="field has-addons has-addons-right">
                <p class="control">
                  <span class="select">
                    <select v-model="aprobacion">
                      <option v-for="(aprobacion, index) in tipoAprobaciones" :key="aprobacion.id" :value="aprobacion.id">{{ index + 1 }} - {{ aprobacion.descripcion }}</option>
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
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

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
      tipoAprobaciones: [],
      aprobacion: 0
    }
  },
  computed: {
    ...mapState(['apiUrl', 'grupo']),

    mostrarMinuta: function () {
      return Object.keys(this.bitacora).length > 0
    }
  },
  methods: {
    ...mapActions(['obtenerParaRevisar']),

    async obtenerAprobaciones () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_aprobaciones', { headers: Auth.authHeader() })
        this.tipoAprobaciones = response.data
      } catch (e) {
        console.log(e)
      }
    },
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
      this.obtenerParaRevisar()
    },
    limpiarCampos: function () {
      this.bitacora = {}
      this.comentarios = []
      this.aprobacion = 0
    }
  },
  mounted () {
    this.obtenerAprobaciones()
    this.obtenerMinuta(this.id)
  }
}
</script>
