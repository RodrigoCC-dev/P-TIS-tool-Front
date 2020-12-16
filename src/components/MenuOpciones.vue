<template>
  <div>

    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="verMenu">
          <span>{{ this.nombreCompleto(this.usuario) }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu" v-if="mostrarMenu">
        <div class="dropdown-content">
          <a class="dropdown-item" @click="volverInicio">Inicio</a>
          <a class="dropdown-item" @click="cambioClave">Cambiar clave</a>
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
    verMenu: function () {
      this.mostrarMenu = !this.mostrarMenu
    },
    volverInicio: function () {
      if (this.usuario.rol.rango === 1) {
        this.$router.push('coordinador')
      } else if (this.usuario.rol.rango === 2) {
        this.$router.push('profesor')
      } else if (this.usuario.rol.rango === 3) {
        this.$router.push('estudiante')
      } else if (this.usuario.rol.rango === 4) {
        this.$router.push('cliente')
      } else {
        this.$router.push('/')
      }
    },
    cambiarClave: function () {
      this.$router.push('usuario/cambio/clave')
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
