<template lang="html">
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <Minuta v-bind:tipo-minuta="tipo" v-if="verFormulario"/>

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
                    <div class="control">
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
        </div>

        <section class="new-section">
          <div class="container">
            <p class="title is-5">Borradores</p>
            <table class="table is-fullwidth is-bordered is-narrow">
              <thead>
                <tr class="has-text-centered has-background-light">
                  <th>N°</th>
                  <th>Código</th>
                  <th>Realizado por</th>
                  <th>Iniciada el</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <a href="">MINUTA_G02_06_2020-2_1006</a>
                  </td>
                  <td>RCC</td>
                  <td>12-10-2020</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <a href="">MINUTA_G02_07_2020-2_1008</a>
                  </td>
                  <td>RCC</td>
                  <td>13-10-2020</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <hr>
        <section class="new-section is-small">
          <div class="container">
            <p class="title is-5">Revisadas por el grupo</p>
            <table class="table is-fullwidth is-bordered is-narrow">
              <thead>
                <tr class="has-text-centered has-background-light">
                  <th>N°</th>
                  <th>Código</th>
                  <th>Realizada por</th>
                  <th>Emitida el</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <a href="">MINUTA_G02_04_2020-2_0923</a>
                  </td>
                  <td>RCC</td>
                  <td>23-09-2020</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <a href="">MINUTA_G02_05_2020-2_0930</a>
                  </td>
                  <td>RCC</td>
                  <td>30-09-2020</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Minuta from '@/components/Minuta.vue'

import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Estudiante',
  components: {
    Header,
    Footer,
    Minuta
  },
  data () {
    return {
      verFormulario: false,
      tipos_minutas: [],
      tipo: 0,
      seleccionarMinuta: false
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
    async obtenerTipoMinutas () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_minutas', { headers: Auth.authHeader() })
        this.tipos_minutas = response.data
        console.log(this.tipos_minutas)
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
