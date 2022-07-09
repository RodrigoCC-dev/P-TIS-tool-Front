<template>
  <div>

    <div v-if="mostrarMinuta">
      <Informacion :proyecto="grupo" :minuta="bitacora"/>
      <Objetivos :lista="bitacora.minuta.objetivos"/>
      <Conclusiones :lista="bitacora.minuta.conclusiones"/>
      <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia" :comentar="false" :responder="true" :lista-com="comentarios" :ver-respuestas="false" @responder="recibirRespuestas" @cerrar="cerrarRespuestas"/>
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
  name: 'ResponderMinuta',
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
    ...mapState(['apiUrl', 'grupo', 'mensajeNotificacion']),

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
        this.$store.commit('setClaseNotError', true)
        this.$store.commit('setNotificacion', 'No fue posible obtener la información de la minuta seleccionada. ' + this.mensajeNotificacion.general)
        console.log(e)
      }
    },
    async obtenerComentarios (bitacoraId) {
      try {
        const response = await axios.get(this.apiUrl + '/comentarios/' + bitacoraId, { headers: Auth.authHeader() })
        this.comentarios = response.data
      } catch (e) {
        this.$store.commit('setClaseNotAlarma', true)
        this.$store.commit('setNotificacion', 'No fue posible obtener los comentarios de la minuta. ' + this.mensajeNotificacion.general)
        console.log(e)
      }
    },
    async enviarRespuestas (respuestas) {
      var envio = { id: this.id, respuestas: respuestas }
      try {
        await axios.post(this.apiUrl + '/respuestas', envio, { headers: Auth.postHeader() })
        this.$emit('cerrar')
        this.$store.commit('setClaseNotExito', true)
        this.$store.commit('setNotificacion', 'Se han guardado con éxito sus respuestas.')
      } catch (e) {
        this.$store.commit('setClaseNotError', true)
        this.$store.commit('setNotificacion', 'No fue posible guardar las respuestas. ' + this.mensajeNotificacion.general)
        console.log(e)
      }
    },
    recibirRespuestas: function (respuestas) {
      this.enviarRespuestas(respuestas)
    },
    cerrarRespuestas: function () {
      this.$emit('cerrar')
    }
  },
  created () {
    if (localStorage.user_tk) {
      this.obtenerMinuta(this.id)
      this.obtenerComentarios(this.id)
    }
  }
}
</script>
