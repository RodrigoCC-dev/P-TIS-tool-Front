<template lang="html">
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <Minuta v-bind:tipo-minuta="tipo" v-bind:id-minuta="idMinuta" v-if="verFormulario" @cerrar="cerrarFormulario"/>

      <div v-else>

        <div class="columns">
          <div class="column is-10"></div>
          <div class="column is-2">
            <button class="button is-success" @click="nuevaMinuta">Nueva Minuta</button>
          </div>
        </div>
        <div v-if="seleccionarMinuta">
          <div class="columns">
            <div class="column is-half is-offset-3">
              <div class="field is-horizontal">
                <div class="field-label-2c">
                  <label class="label">Elegir tipo minuta:</label>
                </div>
                <div class="field-body">
                  <div class="field has-addons has-addons-right">
                    <div class="control is-expanded">
                      <div class="select is-fullwidth">
                        <select v-model="tipo">
                          <option v-for="item in tipos_minutas" :key="item.id" :value="item.id">{{ item.tipo }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="control">
                      <a class="button is-info" @click="elegirTipo">Elegir</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
        </div>

        <Tablero/>

      </div>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Minuta from '@/components/Minuta.vue'
import Tablero from '@/components/TableroEst.vue'

import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Estudiante',
  components: {
    Header,
    Footer,
    Minuta,
    Tablero
  },
  data () {
    return {
      verFormulario: false,
      tipos_minutas: [],
      tipo: 0,
      seleccionarMinuta: false,
      idMinuta: ''
    }
  },
  computed: {
    ...mapState(['apiUrl'])
  },
  methods: {
    ...mapMutations(['removeFromArray']),

    nuevaMinuta: function () {
      this.seleccionarMinuta = true
    },
    elegirTipo: function () {
      this.verFormulario = true
      this.seleccionarMinuta = false
    },
    cerrarFormulario: function () {
      this.verFormulario = false
    },
    async obtenerTipoMinutas () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_minutas', { headers: Auth.authHeader() })
        this.tipos_minutas = response.data
      } catch {
        console.log('No se han obtenido los tipos de minutas')
      }
    }
  },
  mounted () {
    this.obtenerTipoMinutas()
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
