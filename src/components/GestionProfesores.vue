<template>
  <div>

    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-success" @click="agregarProfesor">Agregar Profesor</button>
      </div>
    </div>

    <div v-if="verFormulario">
      <div class="columns">

        <div class="column is-5">
          <form class="form">
            <div class="columns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Nombre:</label>
                  <div class="control">
                    <input v-model="usuario.nombre" class="input" type="text" @input="validarNombre" placeholder="ej.: Ana">
                  </div>
                  <p class="is-danger help" v-if="entradas.nombre.error">{{ entradas.nombre.mensaje }}</p>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Apellido Paterno:</label>
                  <div class="control">
                    <input v-model="usuario.apellido_paterno" type="text" @input="validarApellidoP" placeholder="ej.: Rosas">
                  </div>
                  <p class="is-danger help" v-if="entradas.apellidoPaterno.error">{{ entradas.apellidoPaterno.mensaje }}</p>
                </div>
              </div>
            </div>
            <div class="conlumns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Apellido Materno</label>
                  <div class="control">
                    <input v-model="usuario.apellido_materno" type="text" @input="validarApellidoM" placehodler="ej.: Molina">
                  </div>
                  <p class="is-danger help" v-if="entradas.apellidoMaterno.error">{{ entradas.apellidoMaterno.mensaje }}</p>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Correo electrónico:</label>
                  <div class="control">
                    <input v-model="usuario.email" type="text" @input="validarEmail" placeholder="ej.: ana.rosas@gmail.com">
                  </div>
                  <p class="is-danger help" v-if="entradas.correo_elec.error">{{ entradas.correo_elec.mensaje }}</p>
                </div>
              </div>
            </div>
            <br>
            <div class="columns">
              <div class="column is-full">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-link" @click="agregar">Agregar Profesor</a>
                  </div>
                  <div class="control">
                    <a class="button is-light" @click="noAgregar"><strong>Cancelar</strong></a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="column is-7 has-text-centered">
          <div class="field">
            <label class="label">Secciones a asignar:</label>
          </div>
          <p class="is-danger help" v-if="entradas.secciones.error">{{ entradas.secciones.mensaje }}</p>
          <br>
          <div v-if="mostrarLista">
            <table class="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr class="has-text-centered has-background-light">
                  <th>N°</th>
                  <th>Código</th>
                  <th>Curso</th>
                  <th>Sección</th>
                  <th>Jornada</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(seccion, index) in secciones" :key="seccion.id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ seccion.curso.codigo }}</td>
                  <td class="has-text-left">{{ seccion.curso.nombre }}</td>
                  <td>{{ seccion.codigo }}</td>
                  <td>{{ seccion.jornada.nombre }}</td>
                  <td><input type="checkbox" v-model="seccionesAsigandas" :value="seccion.id"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>No hay secciones para asignar</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GestionProfesores',
  data () {
    return {
      verFormulario: false,
      usuario: {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: ''
      },
      seccionesAsignadas: [],
      entradas: {
        nombre: {
          error: false,
          mensaje: ''
        },
        apellidoPaterno: {
          error: false,
          mensaje: ''
        },
        apellidoMaterno: {
          error: false,
          mensaje: ''
        },
        correo_elec: {
          error: false,
          mensaje: ''
        },
        secciones: false
      },
      mensajes: {
        sin_nombre: 'Debe ingresar el nombre del/la profesor/a',
        sin_apellido: 'Debe ingresar el apellido del/la profesor/a',
        sin_correo: 'Debe ingresar el correo electrónico del/la profesor/a',
        sin_especiales: 'Sólo letras. Verificar que no tenga caracteres especiales',
        correo_mal: 'El correo ingresado no es válido',
        correo_repetido: 'El correo ingresado ya se encuentra en el sistema'
      }
    }
  },
  computed: {
    ...mapState(['apiUrl', 'secciones']),

    mostrarLista: function () {
      return this.secciones.length > 0
    }
  },
  methods: {
    validarNombre: function () {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      const nombre = this.usuario.nombre
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
      return this.validarApellido(this.usuario.apellido_paterno, this.entradas.apellidoPaterno)
    },
    validarApellidoM: function () {
      return this.validarApellido(this.usuario.apellido_materno, this.entradas.apellidoMaterno)
    },
    validarEmail: function () {
      const regExp = /^([a-z0-9_.-]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/
      const correo = this.usuario.email
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
    validarSecciones: function () {
      if (this.seccionesAsignadas.length > 0) {
        this.entradas.secciones = false
        return true
      } else {
        this.entradas.secciones = true
        return false
      }
    },
    existeProfesor: function () {
      let existe = false
      let aux = false
      for (var i = 0; i < this.listaProfesores.length; i++) {
        aux = (this.listaProfesores[i].email === this.usuario.email)
        existe = aux || existe
      }
      if (existe) {
        this.entradas.correo_elec.error = true
        this.entradas.correo_elec.mensaje = this.mensajes.correo_repetido
      }
      return existe
    },
    validarFormulario: function () {
      var esValido = true
      esValido = esValido && this.validarNombre()
      esValido = esValido && this.validarApellidoP()
      esValido = esValido && this.validarApellidoM()
      esValido = esValido && this.validarEmail()
      esValido = esValido && this.validarSecciones()
      esValido = esValido && !this.existeProfesor()
      return esValido
    }
  }
}
</script>
