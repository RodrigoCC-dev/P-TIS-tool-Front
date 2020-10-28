<template lang="html">
  <div>
    <Header/>

    <div class="container">
      <nav>
        <div class="tabs">
          <ul>
            <li v-bind:class="{ 'is-active' : nombreTabActiva === nombreTabs.Estudiantes }" v-on:click="elegirTab(nombreTabs.Estudiantes)"><a><strong>Estudiantes</strong></a></li>
            <li v-bind:class="{ 'is-active' : nombreTabActiva === nombreTabs.Grupos }" v-on:click="elegirTab(nombreTabs.Grupos)"><a><strong>Grupos</strong></a></li>
          </ul>
        </div>
      </nav>
      <Estudiantes v-if="nombreTabActiva === nombreTabs.Estudiantes"/>
      <Grupos v-else-if="nombreTabActiva === nombreTabs.Grupos"/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Estudiantes from '@/components/Estudiantes.vue'
import Grupos from '@/components/Grupos.vue'

const nombreTabs = {
  Estudiantes: 'estudiantes',
  Grupos: 'grupos'
}

export default {
  name: 'Profesor',
  components: {
    Header,
    Footer,
    Estudiantes,
    Grupos
  },
  data () {
    return {
      nombreTabActiva: 'estudiantes',
      nombreTabs
    }
  },
  methods: {
    elegirTab: function (nombreTab) {
      this.nombreTabActiva = nombreTab
    }
  }
}
</script>

<style lang="css" scoped>
</style>
