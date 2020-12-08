<template>
  <div>

    <div v-if="mostrarMinuta">
      <Informacion :proyecto="grupo" :minuta="bitacora"/>
      <Objetivos :lista="bitacora.minuta.objetivos"/>
      <Conclusiones :lista="bitacora.minuta.conclusiones"/>
      <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia"/>
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
      bitacora: {}
    }
  },
  computed: {
    ...mapState(['apiUrl', 'grupo']),

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
    }
  },
  mounted () {
    this.obtenerMinuta(this.id)
  }
}
</script>
