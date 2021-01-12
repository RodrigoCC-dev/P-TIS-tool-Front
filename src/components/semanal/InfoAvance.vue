<template>
  <div>

    <div class="columns is-centered">
      <div class="column is-half">
        <p class="title is-4 has-text-centered">MINUTA DE AVANCE SEMANAL</p>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <p class="title is-4 has-text-centered">{{ bitacora.minuta.codigo }}</p>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Proyecto:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="grupo.proyecto" class="input is-static" type="text">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label-2c is-normal">
        <label class="label">Grupo:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="grupo.correlativo" class="input has-text-centered is-static" type="text">
          </p>
        </div>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">N° de avance:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="bitacora.minuta.correlativo" class="input has-text-centered is-static" type="text">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label-2c is-normal">
        <label class="label">N° de Sprint:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="bitacora.minuta.numero_sprint" class="input has-text-centered is-static" type="text">
          </p>
        </div>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">Fecha avance:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="date" :value="extraerFecha(bitacora.minuta.fecha_reunion)">
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Funciones from '@/services/funciones.js'
import { mapState } from 'vuex'

export default {
  name: 'InfoAvance',
  props: ['minuta'],
  data () {
    return {
      bitacora: this.minuta
    }
  },
  computed: {
    ...mapState(['grupo'])
  },
  methods: {
    extraerFecha: function (timestamp) {
      return Funciones.convertirFecha(timestamp)
    }
  }
}
</script>
