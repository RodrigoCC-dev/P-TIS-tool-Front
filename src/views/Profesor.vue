<template lang="html">
  <div>
    <Header/>

    <div class="container">
      <Navbar/>
      <p>Esta es la página del profesor</p>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Profesor',
  components: {
    Header,
    Footer,
    Navbar
  }
}
</script>

<style lang="css" scoped>
</style>
