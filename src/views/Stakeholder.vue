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
    }
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
</style>
