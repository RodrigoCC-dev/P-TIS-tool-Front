<template>
  <nav>
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active' : activeTabName === tabNames.Estudiantes }" v-on:click="elegirTab(tabNames.Estudiantes)"><a><strong>Estudiantes</strong></a></li>
        <li v-bind:class="{ 'is-active' : activeTabName === tabNames.Grupos }" v-on:click="elegirTab(tabNames.Grupos)"><a><strong>Grupos</strong></a></li>
      </ul>
    </div>
  </nav>
</template>

<script>

const tabNames = {
  Estudiantes: 'estudiantes',
  Grupos: 'grupos'
}

export default {
  name: 'Navbar',
  data () {
    return {
      tabNames,
      currentTab: null,
      activeTabName: null
    }
  },
  computed: {
    estudiantes: function () {
      return this.opciones[0]
    },
    grupos: function () {
      return this.opciones[1]
    }
  },
  methods: {
    elegirTab: function (tabName) {
      this.activeTabName = tabName
    }
  }
}

</script>
