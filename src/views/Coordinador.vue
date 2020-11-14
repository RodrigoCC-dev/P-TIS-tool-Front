<template lang="html">
  <div>
    <Header/>

    <div class="container">
      <nav>
        <div class="tabs">
          <ul>
            <li :class="{ 'is-active' : nombreTabActiva === nombreTabs.Estudiantes }" @click="elegirTab(nombreTabs.Estudiantes)"><a><strong>Estudiantes</strong></a></li>
            <li :class="{ 'is-active' : nombreTabActiva === nombreTabs.Grupos }" @click="elegirTab(nombreTabs.Grupos)"><a><strong>Grupos</strong></a></li>
            <li :class="{ 'is-active' : nombreTabActiva === nombreTabs.Minutas}" @click="elegirTab(nombreTabs.Minutas)"><a><strong>Revisar Minutas</strong></a></li>
          </ul>
        </div>
      </nav>
      <GestionEstudiantes v-if="nombreTabActiva === nombreTabs.Estudiantes"/>
      <GestionGrupos v-else-if="nombreTabActiva === nombreTabs.Grupos"/>
      <RevisionMinutas v-else-if="nombreTabActiva === nombreTabs.Minutas"/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GestionEstudiantes from '@/components/GestionEstudiantes.vue'
import GestionGrupos from '@/components/GestionGrupos.vue'
import RevisionMinutas from '@/components/RevisionMinutas.vue'

const nombreTabs = {
  Estudiantes: 'estudiantes',
  Grupos: 'grupos',
  Minutas: 'minutas'
}

export default {
  name: 'Coordinador',
  components: {
    Header,
    Footer,
    GestionEstudiantes,
    GestionGrupos,
    RevisionMinutas
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
