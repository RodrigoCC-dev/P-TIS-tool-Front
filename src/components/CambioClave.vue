<template>
  <div>

    <div class="columns">

      <div class="column is-6 is-offset-3">

        <div class="field">
          <label class="labe">Contraseña actual:</label>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input" v-model="actual" type="password" placeholder="Contraseña actual">
            <span class="icon is-small is-left">
              <i class="fas fa-id-card"></i>
            </span>
            <p class="help is-danger" v-if="entradas.actual.error">{{ entradas.actual.mensaje }}</p>
          </div>
        </div>

        <div class="field">
          <label class="label">Nueva contraseña:</label>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input" v-model="nueva" type="password" placeholder="Nueva contraseña">
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Repita nueva contraseña:</label>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input" v-model="repetirNueva" type="password" placeholder="Repita nueva contraseña">
            <span class="icons is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <p class="help is-danger" v-if="entradas.repetir.error">{{ entradas.repetir.mensaje }}</p>
          </div>
        </div>

      </div>
    </div>

    <div class="column is-3"></div>

  </div>
</template>

<script>
export default {
  name: 'CambioClave',
  data () {
    return {
      actual: '',
      nueva: '',
      repetirNueva: '',
      entradas: {
        actual : {
          error: false,
          mensaje: ''
        },
        repetir: {
          error: false,
          mensaje: ''
        }
      }
    }
  },
  methods: {
    validarActual: function () {
      if (this.actual !== undefined) {
        return this.actual !== ''
      } else {
        return false
      }
    },
    validarPass: function () {
      if (this.nueva !== undefined) {
        if (this.repetirNueva !== undefined) {
          if (this.nueva !== '' && this.repetirNueva !== '') {
            return this.nueva === this.repetirNueva
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}
</script>
