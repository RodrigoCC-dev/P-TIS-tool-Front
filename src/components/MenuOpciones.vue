<template>
  <div>

    <div class="dropdown is-hoverable is-right">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="verMenu">
          <span>{{ this.nombreCompleto(this.usuario) }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a class="dropdown-item" @click="cambiarClave">Cambiar clave</a>
          <a class="dropdown-item" @click="cerrarSesion">Cerrar sesión</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import { mapState } from 'vuex'

export default {
  name: 'MenuOpciones',
  data () {
    return {
      mostrarMenu: false
    }
  },
  computed: {
    ...mapState(['usuario'])
  },
  methods: {
    nombreCompleto: function (usuario) {
      return Funciones.nombreCompleto(usuario)
    },
    cambiarClave: function () {
      this.$router.push({ path: '/usuario/cambio/clave' })
    },
    cerrarSesion: function () {
      localStorage.removeItem('user_tk')
      this.$store.commit('setAutenticacion', false)
      this.$store.commit('setUsuario', {})
      Auth.deleteUser('userLogged')
      return this.$router.push('/')
    }
  }
}
</script>
