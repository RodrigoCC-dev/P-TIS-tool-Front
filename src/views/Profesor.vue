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
      <GestionEstudiantes v-if="nombreTabActiva === nombreTabs.Estudiantes"/>
      <GestionGrupos v-else-if="nombreTabActiva === nombreTabs.Grupos"/>
      <br>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GestionEstudiantes from '@/components/GestionEstudiantes.vue'
import GestionGrupos from '@/components/GestionGrupos.vue'

const nombreTabs = {
  Estudiantes: 'estudiantes',
  Grupos: 'grupos'
}

export default {
  name: 'Profesor',
  components: {
    Header,
    Footer,
    GestionEstudiantes,
    GestionGrupos
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
