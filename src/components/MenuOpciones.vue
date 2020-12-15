<template>
  <div>

    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{{ this.nombreCompleto(this.usuario) }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a class="dropdown-item" @click="volverInicio">Inicio</a>
          <a class="dropdown-item">Cambiar clave</a>
          <a class="dropdown-item">Cerrar sesión</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Funciones from '@/services/funciones.js'
import { mapState } from 'vuex'

export default {
  name: 'MenuOpciones',
  computed: {
    ...mapState(['usuario'])
  },
  methods: {
    nombreCompleto: function (usuario) {
      return Funciones.nombreCompleto(usuario)
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
    }
  }
}
</script>
