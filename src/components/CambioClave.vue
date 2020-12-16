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
import axios from 'axios'
import Auth from '@/services/auth.js'
import { mapState } from 'vuex'

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
        nueva: {
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
  computed: {
    ...mapState(['apiUrl', 'usuario'])
  },
  methods: {
    validarActual: function () {
      if (this.actual !== undefined) {
        if (this.actual !== '') {
          this.entradas.actual.error = false
          this.entradas.actual.mensaje = ''
          return true
        } else {
          this.entradas.actual.error = true
          this.entradas.actual.mensaje = 'No se ha ingresado la nueva clave'
          return false
        }
      } else {
        this.entradas.actual.error = true
        this.entradas.actual.mensaje = 'Este campo no puede estar vacío'
        return false
      }
    },
    validarNueva: function () {
      if (this.nueva !== undefined) {
        if (this.nueva !== '') {
          this.entradas.nueva.error = false
          this.entradas.nueva.mensaje = ''
          return true
        } else {
          this.entradas.nueva.error = true
          this.entradas.nueva.mensaje = 'No se ha ingresado la nueva clave'
          return false
        }
      } else {
        this.entradas.nueva.error = true
        this.entradas.nueva.mensaje = 'Este campo no puede estar vacío'
        return false
      }
    },
    validarPass: function () {
      if (this.nueva !== undefined) {
        if (this.repetirNueva !== undefined) {
          if (this.nueva !== '') {
            if (this.repetirNueva !== '') {
              if (this.nueva === this.repetirNueva) {
                this.entradas.nueva.error = false
                this.entradas.repetir.error = false
                return true
              } else {
                this.entradas.nueva.error = true
                this.entradas.nueva.mensaje = ''
                this.entradas.repetir.error = true
                this.entradas.repetir.mensaje = 'Las contraseñas no coinciden'
                return false
              }
            } else {
              this.entradas.repetir.error = true
              this.entradas.repetir.mensaje = 'No se ha reingresado la nueva contraseña'
              return false
            }
          } else {
            this.entradas.nueva.error = true
            this.entradas.nueva.mensjae = 'No se ha ingresado la nueva contraseña'
            return false
          }
        } else {
          this.entradas.repetir.error = true
          this.entradas.repetir.mensaje = 'Falta reingresar la nueva contraseña'
          return false
        }
      } else {
        this.entradas.nueva.error = true
        this.entradas.nueva.mensaje = 'Falta ingresar la nueva contraseña'
        return false
      }
    }
    async cambiarClave () {
      const usuario = {
        id: this.usuario.id,
        password: this.actual
        usuario: {
          password: this.nueva,
          password_confirmation: this.repetirNueva
        }
      }
      try {
        await axios.patch(this.apiUrl + '/usuarios/' + this.usuario.id, usuario, { headers: Auth.postHeader() })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
