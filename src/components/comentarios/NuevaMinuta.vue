<template>
  <div>

    <div v-if="">
      <div class="columns">
        <div class="column is-half is-offset-3">
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <a class="button is-link">Emitir nueva versión</a>
            </div>
            <div class="control">
              <a class="button is-info">Revisar aprobación</a>
            </div>
            <div class="control">
              <a class="button is-light">Cancelar</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="mostrarMinuta">
        <Informacion :proyecto="grupo" :minuta="bitacora"/>
        <Objetivos :lista="bitacora.minuta.objetivos"/>
        <Conclusiones :lista="bitacora.minuta.conclusiones"/>
        <Items :lista="bitacora.minuta.items" :asistentes="bitacora.minuta.asistencia" :comentar="false" :responder="true" :lista-com="comentarios" :ver-respuestas="true"/>
      </div>

      <div class="columns">
        <div class="column is-half is-offset-3">
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <a class="button is-link">Emitir nueva versión</a>
            </div>
            <div class="control">
              <a class="button is-link">Cancelar</a>
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
  name: 'NuevaMinuta',
  components: {
    Informacion,
    Objetivos,
    Conclusiones,
    Items
  }
  props: ['idBitacora']
  data () {
    return {
      id: this.idBitacora,
      bitacora: {},
      comentarios: []
    }
  },
  computed: {
    ...mapState(['apiUrl'])
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
    this.obtenerMinuta()
    this.obtenerRespuestas()
  }
}
</script>
