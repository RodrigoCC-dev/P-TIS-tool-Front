<template lang="html">
  <div>
    <Header/>
    <div class="container">
      <div id="init-container" class="columns is-vcentered is-fullheight">
        <img src="@/assets/images/eao-usach.png" class="is-tablet" style="z-index: 1"/>
        <div class="column is-3" style="z-index: 999"></div>
        <div class="column is-6 bg-semitransparent px-5 py-5" style="z-index: 999">
          <div class="title is-2">Módulo de minutas de reunión</div>
          <div class="subtitle is-5 my-3">
            <p>Herramienta de apoyo a las actividades de desarrollo de proyecto de software de los cursos P/TIS</p>
          </div>

          <div class="is-vcentered">

            <div class="field">
              <label class="label has-text-left">Correo electrónico</label>
              <div class="control">
                <input v-model="correo" class="input" type="text" placeholder="nombre.apellido@usach.cl">
              </div>
            </div>
            <br>
            <div class="field has-text-left">
              <label class="label">Clave de acceso</label>
              <div class="control">
                <input v-model="password" class="input" type="password" v-bind:class="{ 'is-danger' : passError }" v-on:click="noError">
                <span></span>
              </div>
              <p class="help is-danger" v-bind:style="{ display: clases.displayText }">Usuario o contraseña incorrectos</p>
            </div>
            <br>
          </div>

          <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-6">
              <div class="field">
                <div class="control">
                  <button class="button is-link is-fullwidth" v-on:click="disteClick">Acceder</button>
                </div>
              </div>
            </div>
            <div class="column is-3"></div>
          </div>

        </div>
        <div class="column is-3" style="z-index: 999"></div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Auth from '@/services/auth.js'

import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Inicio',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      correo: '',
      password: '',
      passError: false,
      clases: {
        inputBox: '',
        displayText: 'none'
      }
    }
  },
  computed: {
    ...mapState(['apiUrl', 'authenticated', 'usuario']),

    registrarAutenticacion: {
      get: function () {
        return this.$store.state.authenticated
      },
      set: function (valor) {
        return this.$store.commit('setAutenticacion', valor)
      }
    }
  },
  methods: {
    noError: function () {
      this.passError = false
      this.ocultarError()
      return 0
    },
    mostrarError: function () {
      this.clases.displayText = 'inline'
      return true
    },
    ocultarError: function () {
      this.clases.displayText = 'none'
      return true
    },
    redirigirUsuario () {
      if (this.usuario.rol.rango === 1) {
        this.$router.push('coordinador')
      } else if (this.usuario.rol.rango === 2) {
        this.$router.push('profesor')
      } else if (this.usuario.rol.rango === 3) {
        this.$router.push('estudiante')
      } else if (this.usuario.rol.rango === 4) {
        this.$router.push('stakeholder')
      } else {
        this.$router.push('inicio')
      }
    },

    async disteClick () {
      console.log(this.correo)
      console.log(this.password)
      try {
        await Auth.login(this.correo, this.password)
        console.log('Logueado')
        try {
          const usuario = await axios.get(this.apiUrl + '/login/user', { headers: Auth.authHeader() })
          console.log(usuario.data)
          this.$store.commit('setUsuario', usuario.data)
          this.redirigirUsuario()
        } catch (e1) {
          console.log(e1)
        }
        this.registrarAutenticacion = true
      } catch (e2) {
        console.log(e2)
        this.passError = true
        this.mostrarError()
      }
    }
  }
}
</script>

<style lang="css" scoped>
#init-container {
  height: 585px;
  width: 100%;
  margin: 0;
  padding: 0;
}

.bg-semitransparent {
  background-color: rgba(255, 255, 255, .8);
}

.has-textline-through {
  text-decoration: line-through;
}

#init-container img {
  position: absolute;
  height: 585px;
  object-fit: cover;
}
</style>
