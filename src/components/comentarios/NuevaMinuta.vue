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

    <div v-if="seleccionarMotivo">

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
      comentarios: [],
      aprobaciones: []
    }
  },
  computed: {
    ...mapState(['apiUrl', 'grupo', 'motivos']),

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
    async obtenerRespuestas (bitacoraId) {
      try {
        const response = await axios.get(this.apiUrl + '/respuestas/' + bitacoraId, { headers: Auth.authHeader() })
        this.comentarios = response.data
      } catch (e) {
        console.log('No fue posible obtener los comentarios y respuestas de la minuta')
        console.log(e)
      }
    },
    async obtenerAprobaciones (bitacoraId) {
      try {
        const response = await axios.get(this.apiUrl + '/aprobaciones/' + bitacoraId, { headers: Auth.authHeader() })
        this.aprobaciones = response.data
      } catch (e) {
        console.log('No fue posible obtener las aprobaciones de la minuta')
        console.log(e)
      }
    },
    obtenerNuevoMotivo: function () {
      if (this.bitacora.identificador === 'EF') {
        return 'EF'
      } else {
        var revisores = 0
        var aprobaciones = 0
        if (this.bitacora.minuta.tipo === 'Coordinacion') {
          revisores = this.grupo.estudiantes.length - 1
        } else if (this.bitacora.minuta.tipo === 'Cliente') {
          if (this.bitacora.identificador === 'ECI') {
            revisores = this.grupo.estudiantes.length - 1
          } else if (this.bitacora.identificador !== 'EF') {
            revisores = this.grupo.stakeholders.length
          }
        }
        for (var i = 0; i < this.aprobaciones.length; i++) {
          if (this.aprobaciones[i].tipo_aprobacion.identificador === 'A') {
            aprobaciones++
          }
        }
        if (aprobaciones === revisores) {
          if (this.bitacora.minuta.tipo === 'Coordinacion') {
            return 'EF'
          } else if (this.bitacora.minuta.tipo === 'Cliente') {
            if (this.bitacora.identificador === 'ECI') {
              return 'ERC'
            } else {
              return 'EF'
            }
          } else {
            return 'EF'
          }
        } else {
          if (this.bitacora.minuta.tipo === 'Coordinacion') {
            return 'ECI'
          } else if (this.bitacora.minuta.tipo === 'Cliente') {
            if (this.bitacora.identificador === 'ECI') {
              return 'ECI'
            } else {
              return 'EAC'
            }
          } else {
            return 'EAC'
          }
        }
      }
    }
  },
  mounted () {
    this.obtenerMinuta()
    this.obtenerRespuestas()
    this.obtenerAprobaciones()
  }
}
</script>
