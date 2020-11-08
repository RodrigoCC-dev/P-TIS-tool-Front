<template lang="html">
  <div id="header" class="is-12 mb-3">
    <div class="columns">
      <div class="header-nav-blue column is-5"></div>
      <div class="header-nav-orange column is-7"></div>
    </div>
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-4">
          <img src="../assets/images/logo_diinf.jpeg">
        </div>
        <template v-if="this.authenticated">
          <div class="column is-6"></div>
          <div class="column is-2">
            <button class="button is-link" v-on:click="cerrarSesion">Cerrar sesión</button>
          </div>
        </template>
        <template v-else>
          <div class="column is-8"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['authenticated'])
  },
  methods: {
    cerrarSesion: function () {
      localStorage.removeItem('user_tk')
      this.$store.commit('setAutenticacion', false)
      this.$store.commit('setUsuario', {})
      return this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
.header-nav {
  width: 100%;
  display: flex;
}

.header-nav-blue {
  background: rgba(14, 53, 108, 1);
  min-height: 10px;
  float: left;
  display: inline-block;
}

.header-nav-orange {
  background: rgba(229, 111, 31, 1);
  float: left;
  display: inline-block;
}
</style>
