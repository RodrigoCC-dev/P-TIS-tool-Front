<template>
  <div>

    <div class="columns is-centered">
      <div class="column is-7">
        <div v-if="notificacion.mostrar">
          <div class="notification" :class="tipoNotificacion">
            <button class="delete" @click="cerrar"></button>
            {{ notificacion.mensaje }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Notificacion',
  computed: {
    ...mapState(['notificacion', 'claseNotificacion']),

    tipoNotificacion: function () {
      if (this.claseNotificacion.exito) {
        return 'is-success-usach'
      } else if (this.claseNotificacion.alarma) {
        return 'is-warning-usach'
      } else if (this.claseNotificacion.error) {
        return 'is-danger-usach'
      } else {
        return ''
      }
    }
  },
  methods: {
    cerrar: function () {
      this.$store.commit('cerrarNotificacion')
    }
  }
}
</script>
