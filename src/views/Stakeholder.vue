<template lang="html">
  <div>

    <Header/>

    <div class="container">
      <div class="tabs is-centered is-toggle is-toggle-rounded">
        <ul>
          <li v-bind:class="tabs.revision" v-on:click="verRevision">
            <a>
              <span>Para revisión</span>
            </a>
          </li>
          <li v-bind:class="tabs.comentadas" v-on:click="verComentadas">
            <a>
              <span>Comentadas</span>
            </a>
          </li>
          <li v-bind:class="tabs.respondidas" v-on:click="verRespondidas">
            <a>
              <span>Respondidas</span>
            </a>
          </li>
          <li v-bind:class="tabs.cerradas" v-on:click="verCerradas">
            <a>
              <span>Cerradas</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <Footer/>

  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Stakeholder',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      tabs: {
        revision: 'is-active',
        comentadas: '',
        respondidas: '',
        cerradas: ''
      },
      componentes: {
        revision: 'inline',
        comentadas: 'none',
        respondidas: 'none',
        cerradas: 'none'
      }
    }
  },
  methods: {
    verRevision: function () {
      return true
    },
    /*  verComentadas: function () {
      for (var valor in this.tabs) {
        if (valor === 'is-active') {
          set(valor) = ''
        }
      }
      this.tabs.comentadas = 'is-active'
      for (var item in this.componentes) {
        if (item === 'inline') {
          this.componentes.set(item) = 'none'
        }
      }
      this.componentes.comentadas = 'inline'
      console.log(this.tabs)
      console.log(this.componentes)
      return true
    }, */
    verRespondidas: function () {
      return true
    },
    verCerradas: function () {
      return true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
