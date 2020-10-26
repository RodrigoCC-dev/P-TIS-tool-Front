<template lang="html">
  <div>
    <Header/>

    <div class="container">
      <p>Esta es la página del profesor</p>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Profesor',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="css" scoped>
</style>
