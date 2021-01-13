<template>
  <div>
    <Header/>

    <div class="container">
      <nav>
        <div class="tabs">
          <ul>
            <li v-bind:class="{ 'is-active-usach' : nombreTabActiva === nombreTabs.Estudiantes }" v-on:click="elegirTab(nombreTabs.Estudiantes)"><a><strong>Estudiantes</strong></a></li>
            <li v-bind:class="{ 'is-active-usach' : nombreTabActiva === nombreTabs.Grupos }" v-on:click="elegirTab(nombreTabs.Grupos)"><a><strong>Grupos</strong></a></li>
            <li v-bind:class="{ 'is-active-usach' : nombreTabActiva === nombreTabs.Stakeholders}" v-on:click="elegirTab(nombreTabs.Stakeholders)"><a><strong>Clientes</strong></a></li>
            <li v-bind:class="{ 'is-active-usach' : nombreTabActiva === nombreTabs.Minutas}" v-on:click="elegirTab(nombreTabs.Minutas)"><a><strong>Revisar Minutas</strong></a></li>
            <li v-bind:class="{ 'is-active-usach' : nombreTabActiva === nombreTabs.Avances}" v-on:click="elegirTab(nombreTabs.Avances)"><a><strong>Revisar Avances</strong></a></li>
          </ul>
        </div>
      </nav>
      <GestionEstudiantes v-if="nombreTabActiva === nombreTabs.Estudiantes"/>
      <GestionGrupos v-else-if="nombreTabActiva === nombreTabs.Grupos"/>
      <RevisionMinutas v-else-if="nombreTabActiva === nombreTabs.Minutas"/>
      <GestionClientes v-else-if="nombreTabActiva === nombreTabs.Stakeholders"/>
      <RevisionAvances v-else-if="nombreTabActiva === nombreTabs.Avances"/>
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
import RevisionMinutas from '@/components/RevisionMinutas.vue'
import GestionClientes from '@/components/GestionClientes.vue'
import RevisionAvances from '@/components/RevisionAvances.vue'

const nombreTabs = {
  Estudiantes: 'estudiantes',
  Grupos: 'grupos',
  Minutas: 'minutas',
  Stakeholders: 'clientes',
  Avances: 'avances'
}

export default {
  name: 'Profesor',
  components: {
    Header,
    Footer,
    GestionEstudiantes,
    GestionGrupos,
    RevisionMinutas,
    GestionClientes,
    RevisionAvances
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
