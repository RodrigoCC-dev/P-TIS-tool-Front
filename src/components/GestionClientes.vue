<template>
  <div>
    <br>

    <SelectorJornada @jornada="cambiarJornada"/>

    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-success" @click="agregarCliente">Agregar Cliente</button>
      </div>
    </div>

    <div v-if="verFormulario">
      <form class="form">
        <div class="columns has-text-left">
          <div class="column is-4">
            <div class="field">
              <label class="label">Nombre:</label>
              <div class="control">
                <input v-model="stakeholder.usuario.nombre" @input="validarNombre" class="input" :class="{ 'is-danger' : entradas.nombre.error }" type="text" placeholder="ej.: Sergio">
              </div>
              <p class="is-danger help" v-if="entradas.nombre.error">{{ entradas.nombre.mensaje }}</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">Apellido paterno:</label>
              <div class="control">
                <input v-model="stakeholder.usuario.apellido_paterno" @input="validarApellidoP" class="input" :class="{ 'is-danger' : entradas.apellido_paterno.error }" type="text" placeholder="ej.: Maldonado">
              </div>
              <p class="is-danger help" v-if="entradas.apellido_paterno.error">{{ entradas.apellido_paterno.mensaje }}</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">Apellido materno:</label>
              <div class="control">
                <input v-model="stakeholder.usuario.apellido_materno" @input="validarApellidoM" class="input" :class="{ 'is-danger' : entradas.apellido_materno.error }" type="text" placeholder="ej.: Zamorano">
              </div>
              <p class="is-danger help" v-if="entradas.apellido_materno.error">{{ entradas.apellido_materno.mensaje }}</p>
            </div>
          </div>
        </div>

        <div class="columns has-text-left">
          <div class="column is-4">
            <div class="field">
              <label class="label">Correo electrónico:</label>
              <div class="control">
                <input v-model="stakeholder.usuario.email" @input="validarEmail" class="input" :class="{ 'is-danger' : entradas.correo_elec.error }" type="text" placeholder="ej.: sergio.maldonado@gmail.com">
              </div>
              <p class="is-danger help" v-if="entradas.correo_elec.error">{{ entradas.correo_elec.mensaje }}</p>
            </div>
          </div>
          <div class="column is-8">
            <div class="field">
              <label class="label">Grupo a asignar:</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="stakeholder.grupo_id" @change="validarGrupo" :class="{ 'is-danger' : entradas.grupo.error}">
                    <option v-for="grupo in listaFiltrada" :key="grupo.id" :value="grupo.id">
                      {{ grupo.nombre }} - {{ grupo.proyecto }}
                    </option>
                  </select>
                </div>
              </div>
              <p class="is-danger help" v-if="entradas.grupo">No ha seleccionado el grupo a asignar</p>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <a class="button is-link" @click="agregar">Agregar</a>
              </div>
              <div class="control">
                <a class="button is-light" @click="noAgregar"><strong>Cancelar</strong></a>
              </div>
            </div>
          </div>
        </div>
      </form>
      <hr>
    </div>

    <br>
    <div v-if="mostrarLista">
      <p>Aquí se mostrarán los stakeholders en el sistema</p>
    </div>
  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState } from 'vuex'
import SelectorJornada from '@/components/SelectorJornada.vue'

export default {
  name: 'GestionClientes',
  components: {
    SelectorJornada
  },
  data () {
    return {
      verFormulario: false,
      jornadaActual: 'Diurna',
      mostrarJornadas: false,
      mostrarLista: false,
      stakeholder: {
        usuario: {
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          email: ''
        },
        grupo_id: null
      },
      listaStakeholders: [],
      listaGrupos: [],
      entradas: {
        nombre: {
          error: false,
          mensaje: ''
        },
        apellido_paterno: {
          error: false,
          mensaje: ''
        },
        apellido_materno: {
          error: false,
          mensaje: ''
        },
        correo_elec: {
          error: false,
          mensaje: ''
        },
        grupo: false
      },
      mensajes: {
        sin_nombre: 'Debe ingresar el nombre del cliente',
        sin_apellido: 'Debe ingresar el apellido del cliente',
        sin_correo: 'Debe ingresar el correo electrónico del cliente',
        sin_especiales: 'Sólo letras. Verificar que no tenga caracteres especiales',
        correo_mal: 'El correo ingresado no es válido',
        correo_repetido: 'El correo ingresado ya se encuentra en el sistema'
      }
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    listaFiltrada: function () {
      var lista = []
      for (var i = 0; i < this.listaGrupos.length; i++) {
        if (this.listaGrupos[i].jornada === this.jornadaActual) {
          lista.push(this.listaGrupos[i])
        }
      }
      return lista
    }
  },
  methods: {
    cambiarJornada: function (nuevaJornada) {
      this.jornadaActual = nuevaJornada
    },
    agregarCliente: function () {
      this.verFormulario = true
      this.nuevoStakeholder()
    },
    nuevoStakeholder: function () {
      this.stakeholder.usuario.nombre = ''
      this.stakeholder.usuario.apellido_paterno = ''
      this.stakeholder.usuario.apellido_materno = ''
      this.stakeholder.usuario.email = ''
      this.stakeholder.grupo_id = null
    },
    agregar: function () {
      if (this.validarFormulario()) {
        const nuevoStakeholder = {
          stakeholder: {
            grupo_id: this.stakeholder.grupo_id,
            usuario_attributes: this.stakeholder.usuario
          }
        }
        console.log(nuevoStakeholder)
      }
    },
    noAgregar: function () {
      this.nuevoStakeholder()
      this.verFormulario = false
      this.entradas.nombre.error = false
      this.entradas.apellido_paterno.error = false
      this.entradas.apellido_materno.error = false
      this.entradas.correo_elec.error = false
      this.entradas.grupo = false
    },
    async obtenerGrupos () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos', { headers: Auth.authHeader() })
        this.listaGrupos = response.data
      } catch {
        console.log('No se han obtenido los grupos')
      }
    },
    validarNombre: function () {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      const nombre = this.stakeholder.usuario.nombre
      try {
        if (nombre === null || nombre.length === 0 || nombre === undefined || nombre === '') {
          this.entradas.nombre.error = true
          this.entradas.nombre.mensaje = this.mensajes.sin_nombre
          return false
        } else if (!regExp.test(nombre)) {
          this.entradas.nombre.error = true
          this.entradas.nombre.mensaje = this.mensajes.sin_especiales
          return false
        } else {
          this.entradas.nombre.error = false
          this.entradas.nombre.mensaje = ''
          return true
        }
      } catch {
        this.entradas.nombre.error = true
        this.entradas.nombre.mensaje = ''
        return false
      }
    },
    validarApellido: function (apellido, entradas) {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      try {
        if (apellido === null || apellido.length === 0 || apellido === undefined || apellido === '') {
          entradas.error = true
          entradas.mensaje = this.mensajes.sin_apellido
          return false
        } else if (!regExp.test(apellido)) {
          entradas.error = true
          entradas.mensaje = this.mensajes.sin_especiales
          return false
        } else {
          entradas.error = false
          entradas.mensaje = ''
          return true
        }
      } catch {
        entradas.error = true
        entradas.mensaje = ''
        return false
      }
    },
    validarApellidoP: function () {
      return this.validarApellido(this.stakeholder.usuario.apellido_paterno, this.entradas.apellido_paterno)
    },
    validarApellidoM: function () {
      return this.validarApellido(this.stakeholder.usuario.apellido_materno, this.entradas.apellido_materno)
    },
    validarEmail: function () {
      const regExp = /^([a-z0-9_.-]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/
      const correo = this.stakeholder.usuario.email
      var separarCorreo = correo.split('@')
      try {
        if (correo === undefined || correo.length === 0 || correo === '' || correo === null) {
          this.entradas.correo_elec.error = true
          this.entradas.correo_elec.mensaje = this.mensajes.sin_correo
          return false
        } else if (!regExp.test(correo)) {
          this.entradas.correo_elec.error = true
          this.entradas.correo_elec.mensaje = this.mensajes.correo_mal
          return false
        } else if (separarCorreo.length !== 2) {
          this.entradas.correo_elec.error = true
          this.entradas.correo_elec.mensaje = this.mensajes.correo_mal
          return false
        } else {
          this.entradas.correo_elec.error = false
          this.entradas.correo_elec.mensaje = ''
          return true
        }
      } catch {
        this.entradas.correo_elec.error = true
        this.entradas.correo_elec.mensaje = ''
        return false
      }
    },
    validarGrupo: function () {
      const seleccion = this.stakeholder.grupo_id
      if (seleccion === null || seleccion === '' || seleccion === 0 || seleccion === undefined) {
        this.entradas.grupo = true
        return false
      } else {
        this.entradas.grupo = false
        return true
      }
    },
    existeStakeholder: function () {
      let existe = false
      let aux = false
      for (var i = 0; i < this.listaStakeholders.length; i++) {
        aux = (this.listaStakeholders[i].email === this.stakeholder.usuario.email)
        existe = aux || existe
      }
      if (existe) {
        this.entradas.correo_elec.error = true
        this.entradas.correo_elec.mensaje = this.mensaje.correo_repetido
      }
      return existe
    },
    validarFormulario: function () {
      var esValido = true
      esValido = esValido && this.validarNombre()
      esValido = esValido && this.validarApellidoP()
      esValido = esValido && this.validarApellidoM()
      esValido = esValido && this.validarEmail()
      esValido = esValido && this.validarGrupo()
      esValido = esValido && !this.existeStakeholder()
      return esValido
    }
  },
  mounted () {
    this.obtenerGrupos()
  }
}
</script>
