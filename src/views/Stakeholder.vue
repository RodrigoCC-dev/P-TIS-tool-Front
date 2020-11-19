<template lang="html">
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <Tablero/>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Tablero from '@/components/TableroStk.vue'

export default {
  name: 'Stakeholder',
  components: {
    Header,
    Footer,
    Tablero
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
      },
      mostrar: false
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
