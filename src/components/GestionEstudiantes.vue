<template>
  <div>
    <br>
    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-info-usach" @click="agregarEstudiante">Agregar Estudiante</button>
      </div>
    </div>
    <div v-if="verFormulario">
      <form class="form" method="post">
        <div class="columns has-text-left">
          <div class="column is-3">
            <div class="field">
              <label class="label">R.U.N.:</label>
              <div class="control">
                <input v-model="estudiante.usuario.run" v-on:input="validarRun" :class="{ 'is-danger' : runEntrada.error }" class="input" type="text" placeholder="ej.: 12345678-9">
              </div>
              <p class="is-danger help" v-if="runEntrada.error">{{ runEntrada.mensaje }}</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Nombre:</label>
              <div class="control">
                <input v-model="estudiante.usuario.nombre" v-on:input="validarNombre" class="input" :class="{ 'is-danger' : nombreEntrada.error }" type="text" placeholder="ej.: Pablo">
              </div>
              <p class="is-danger help" v-if="nombreEntrada.error">{{ nombreEntrada.mensaje }}</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Apellido paterno:</label>
              <div class="control">
                <input v-model="estudiante.usuario.apellido_paterno" v-on:input="validarApellidoP" :class="{ 'is-danger' : apellidoPaternoEntrada.error }" class="input" type="text" placeholder="ej.: Contreras">
              </div>
              <p class="is-danger help" v-if="apellidoPaternoEntrada.error">{{ apellidoPaternoEntrada.mensaje }}</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Apellido materno:</label>
              <div class="control">
                <input v-model="estudiante.usuario.apellido_materno" v-on:input="validarApellidoM" :class="{ 'is-danger' : apellidoMaternoEntrada.error }" class="input" type="text" placeholder="ej.: Soto">
              </div>
              <p class="is-danger help" v-if="apellidoMaternoEntrada.error">{{ apellidoMaternoEntrada.mensaje }}</p>
            </div>
          </div>
        </div>
        <div class="columns has-text-left">
          <div class="column is-3">
            <div class="field">
              <label class="label">Correo electrónico:</label>
              <div class="control">
                <input v-model="estudiante.usuario.email" v-on:input="validarEmail" :class="{ 'is-danger' : emailEntrada.error }" class="input" type="text" placeholder="ej.: pablo.contreras@usach.cl">
              </div>
              <p class="is-danger help" v-if="emailEntrada.error">{{ emailEntrada.mensaje }}</p>
            </div>
          </div>
          <div class="column is-9">
            <div class="field">
              <label class="label">Sección - Curso:</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="estudiante.seccion_id" v-on:change="validarSeccion" :class="{ 'is-danger' : seccionEntrada}">
                    <option v-for="seccion in secciones" :key="seccion.id" :value="seccion.id">
                      {{ seccion.codigo }} - {{ seccion.curso.nombre }} ({{ seccion.curso.codigo }}) - Jornada: {{ seccion.jornada.nombre }}
                    </option>
                  </select>
                </div>
              </div>
              <p class="is-danger help" v-if="seccionEntrada">No ha seleccionado la sección</p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <a class="button is-primary-usach" @click="agregar">Agregar</a>
              </div>
              <div class="control">
                <a class="button is-secondary-usach">Desde nómina</a>
              </div>
              <div class="control">
                <a class="button is-light-usach" @click="noAgregar"><strong>Cancelar</strong></a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div v-if="mostrarNomina">
      <div class="file is-centered has-name">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Subir nómina
            </span>
          </span>
          <span class="file-name">
            No se ha subido el archivo
          </span>
        </label>
      </div>
    </div>

    <hr>
    <br>
    <div v-if="mostrarLista">

      <table class="table is-bordered is-narrow is-fullwidth" summary="Estudiantes">
        <thead>
          <tr class="has-background-light">
            <th scope="col" class="has-text-centered">N°</th>
            <th scope="col" class="has-text-centered">R.U.N.</th>
            <th scope="col" class="has-text-centered">Nombre estudiante</th>
            <th scope="col" class="has-text-centered">Sección</th>
            <th scope="col" class="has-text-centered">Jornada</th>
            <th scope="col" class="has-text-centered"><input type="checkbox" @click="seleccionarTodos"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(estudiante, index) in listaEstudiantes" :key="estudiante.id">
            <th scope="row" class="has-text-centered">{{ index + 1 }}</th>
            <td class="has-text-centered">{{ estudiante.run_est }}</td>
            <td class="has-text-left">{{ nombreCompleto(estudiante) }}</td>
            <td class="has-text-centered">{{ estudiante.codigo_seccion }}</td>
            <td class="has-text-centered">{{ estudiante.jornada }}</td>
            <td class="has-text-centered"><input type="checkbox" v-model="eliminados" :value="estudiante.id"></td>
          </tr>
        </tbody>
      </table>

      <div v-if="mostrarEliminar">
        <br>
        <div class="columns">
          <div class="column is-half is-offset-3">
            <div class="field">
              <div class="control">
                <button class="button is-secondary-usach is-fullwidth" @click="eliminarEstudiantes">Eliminar</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" :class="{ 'is-active ' : notificar }">
          <div class="modal-background"></div>
          <div class="modal-content">

            <div class="box">
              <div class="columns">
                <div class="column is-full">
                  <p class="title is-5">¿Confirma la eliminación de {{ numeroEst }} estudiantes?</p>
                  <div class="columns is-centered">
                    <div class="column is-3">
                      <div class="field is-grouped is-grouped-centered">
                        <div class="control">
                          <a class="button is-info-usach is-rounded" @click="confirmarEliminacion">Aceptar</a>
                        </div>
                      </div>
                    </div>
                    <div class="column is-1"></div>
                    <div class="column is-3">
                      <div class="field is-grouped is-grouped-centered">
                        <div class="control">
                          <a class="button is-light-usach is-rounded" @click="cancelarEliminacion">Cancelar</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <br>
  </div>
</template>

<script>
import Auth from '@/services/auth.js'

import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'GestionEstudiantes',
  data () {
    return {
      verFormulario: false,
      estudiante: {
        usuario: {
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          run: '',
          email: ''
        },
        seccion_id: null
      },
      listaEstudiantes: {},
      mostrarLista: false,
      runEntrada: {
        error: false,
        mensaje: ''
      },
      nombreEntrada: {
        error: false,
        mensaje: ''
      },
      apellidoPaternoEntrada: {
        error: false,
        mensaje: ''
      },
      apellidoMaternoEntrada: {
        error: false,
        mensaje: ''
      },
      emailEntrada: {
        error: false,
        mensaje: ''
      },
      seccionEntrada: false,
      mensajes: {
        sin_nombre: 'Debe ingresar el nombre del estudiante',
        sin_apellido: 'Debe ingresar el apellido del estudiante',
        sin_correo: 'Debe ingresar el correo electrónico del estudiante',
        sin_especiales: 'Sólo letras. Verificar que no tenga caracteres especiales.',
        correo_mal: 'El correo ingresado no es válido',
        sin_usach: 'El correo ingresado no es corporativo (@usach.cl)',
        sin_run: 'No se ha ingresado R.U.N. del estudiante',
        run_error: 'No es un R.U.N. válido',
        run_repetido: 'Usuario ya se encuentra en el sistema'
      },
      eliminados: [],
      notificar: false,
      mostrarNomina: true
    }
  },
  computed: {
    ...mapState(['apiUrl', 'secciones']),

    mostrarEliminar: function () {
      return this.eliminados.length > 0
    },
    numeroEst: function () {
      return this.eliminados.length
    }
  },
  methods: {
    async obtenerSecciones () {
      try {
        const secciones = await axios.get(this.apiUrl + '/secciones', { headers: Auth.authHeader() })
        this.$store.commit('setSecciones', secciones.data)
      } catch (error) {
        console.log(error)
      }
    },
    nombreCompleto: function (estudiante) {
      return estudiante.nombre_est + ' ' + estudiante.apellido1 + ' ' + estudiante.apellido2
    },
    async obtenerEstudiantes () {
      try {
        const response = await axios.get(this.apiUrl + '/estudiantes', { headers: Auth.authHeader() })
        this.listaEstudiantes = response.data
        if (Object.keys(this.listaEstudiantes).length > 0) {
          this.mostrarLista = true
        } else {
          this.mostrarLista = false
        }
      } catch (error) {
        console.log(error)
        this.mostrarLista = false
      }
    },
    nuevoEstudiante: function () {
      this.estudiante.usuario.nombre = ''
      this.estudiante.usuario.apellido_paterno = ''
      this.estudiante.usuario.apellido_materno = ''
      this.estudiante.usuario.run = ''
      this.estudiante.usuario.email = ''
      this.estudiante.seccion_id = null
    },
    agregarEstudiante: function () {
      this.verFormulario = true
      this.nuevoEstudiante()
    },
    existeEstudiante: function () {
      let existe = false
      let aux = false
      for (var i = 0; i < this.listaEstudiantes.length; i++) {
        aux = (this.listaEstudiantes[i].run_est === this.estudiante.usuario.run)
        existe = aux || existe
      }
      if (existe) {
        this.runEntrada.error = true
        this.runEntrada.mensaje = this.mensajes.run_repetido
      }
      return existe
    },
    async agregar () {
      if (this.validarFormulario()) {
        const nuevoEstudiante = {
          estudiante: {
            seccion_id: this.estudiante.seccion_id,
            usuario_attributes: this.estudiante.usuario
          }
        }
        try {
          await axios.post(this.apiUrl + '/estudiantes', nuevoEstudiante, { headers: Auth.postHeader() })
          this.obtenerEstudiantes()
        } catch (e) {
          console.log(e)
        }
        this.verFormulario = false
      }
    },
    noAgregar: function () {
      this.nuevoEstudiante()
      this.verFormulario = false
      this.nombreEntrada.error = false
      this.apellidoPaternoEntrada.error = false
      this.apellidoMaternoEntrada.error = false
      this.runEntrada.error = false
      this.emailEntrada.error = false
      this.seccionEntrada = false
    },
    validarNombre: function () {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      const nombre = this.estudiante.usuario.nombre
      try {
        if (nombre === null || nombre === undefined || nombre === '' || nombre.length === 0) {
          this.nombreEntrada.error = true
          this.nombreEntrada.mensaje = this.mensajes.sin_nombre
          return false
        } else if (!regExp.test(nombre)) {
          this.nombreEntrada.error = true
          this.nombreEntrada.mensaje = this.mensajes.sin_especiales
          return false
        } else {
          this.nombreEntrada.error = false
          this.nombreEntrada.mensaje = ''
          return true
        }
      } catch {
        this.nombreEntrada.error = true
        this.nombreEntrada.mensaje = ''
        return false
      }
    },
    validarApellidoP: function () {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      const apellido = this.estudiante.usuario.apellido_paterno
      try {
        if (apellido === null || apellido === undefined || apellido === '' || apellido.length === 0) {
          this.apellidoPaternoEntrada.error = true
          this.apellidoPaternoEntrada.mensaje = this.mensajes.sin_apellido
          return false
        } else if (!regExp.test(apellido)) {
          this.apellidoPaternoEntrada.error = true
          this.apellidoPaternoEntrada.mensaje = this.mensajes.sin_especiales
          return false
        } else {
          this.apellidoPaternoEntrada.error = false
          this.apellidoPaternoEntrada.mensaje = ''
          return true
        }
      } catch {
        this.apellidoPaternoEntrada.error = true
        this.apellidoPaternoEntrada.mensaje = ''
        return false
      }
    },
    validarApellidoM: function () {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      const apellido = this.estudiante.usuario.apellido_materno
      try {
        if (apellido === null || apellido === undefined || apellido === '' || apellido.length === 0) {
          this.apellidoMaternoEntrada.error = true
          this.apellidoMaternoEntrada.mensaje = this.mensajes.sin_apellido
          return false
        } else if (!regExp.test(apellido)) {
          this.apellidoMaternoEntrada.error = true
          this.apellidoMaternoEntrada.mensaje = this.mensajes.sin_especiales
          return false
        } else {
          this.apellidoMaternoEntrada.error = false
          this.apellidoMaternoEntrada.mensaje = ''
          return true
        }
      } catch {
        this.apellidoMaternoEntrada.error = true
        this.apellidoMaternoEntrada.mensaje = ''
        return false
      }
    },
    validarEmail: function () {
      const regExp = /^([a-z0-9_.-]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/
      const correo = this.estudiante.usuario.email
      var separarCorreo = []
      if (correo !== null && correo !== undefined) {
        separarCorreo = correo.split('@')
      }
      try {
        if (correo === null || correo === undefined || correo === '' || correo.length === 0) {
          this.emailEntrada.error = true
          this.emailEntrada.mensaje = this.mensajes.sin_correo
          return false
        } else if (!regExp.test(correo) || separarCorreo.length !== 2) {
          this.emailEntrada.error = true
          this.emailEntrada.mensaje = this.mensajes.correo_mal
          return false
        } else if (separarCorreo[1] !== 'usach.cl') {
          this.emailEntrada.error = true
          this.emailEntrada.mensaje = this.mensajes.sin_usach
          return false
        } else {
          this.emailEntrada.error = false
          this.emailEntrada.mensaje = ''
          return true
        }
      } catch {
        this.emailEntrada.error = true
        this.emailEntrada.mensaje = ''
        return false
      }
    },
    validarRun: function () {
      const regExp = /(\d{7,8})-(\d|K)/i
      const run = this.estudiante.usuario.run
      if (run === null || run === undefined || run === '' || run.length === 0) {
        this.runEntrada.error = true
        this.runEntrada.mensaje = this.mensajes.sin_run
        return false
      } else {
        let valor = run.replace('.', '')
        valor = valor.replace('-', '')
        var cuerpo = valor.slice(0, -1)
        var dv = valor.slice(-1).toUpperCase()
        this.estudiante.usuario.run = cuerpo + '-' + dv
        let suma = 0
        let multiplo = 2
        let index
        for (var i = 1; i <= cuerpo.length; i++) {
          index = multiplo * cuerpo.charAt(cuerpo.length - i)
          suma = suma + index
          if (multiplo < 7) {
            multiplo++
          } else {
            multiplo = 2
          }
        }
        var dvEsperado = 11 - (suma % 11)
        var dvReal = (dv === 'K') ? 10 : ((dv === '0') ? 11 : parseInt(dv))
        if (!regExp.test(run) || (dvEsperado !== dvReal)) {
          this.runEntrada.error = true
          this.runEntrada.mensaje = this.mensajes.run_error
          return false
        } else {
          this.runEntrada.error = false
          this.runEntrada.mensaje = ''
          return true
        }
      }
    },
    validarSeccion: function () {
      const seleccion = this.estudiante.seccion_id
      if (seleccion === null || seleccion === undefined || seleccion === '' || seleccion === 0) {
        this.seccionEntrada = true
        return false
      } else {
        this.seccionEntrada = false
        return true
      }
    },
    validarFormulario: function () {
      var esvalido = true
      esvalido = esvalido && this.validarRun()
      esvalido = esvalido && this.validarNombre()
      esvalido = esvalido && this.validarApellidoP()
      esvalido = esvalido && this.validarApellidoM()
      esvalido = esvalido && this.validarEmail()
      esvalido = esvalido && this.validarSeccion()
      esvalido = esvalido && !this.existeEstudiante()
      return esvalido
    },
    seleccionarTodos: function () {
      if (this.eliminados.length === this.listaEstudiantes.length) {
        this.eliminados = []
      } else {
        this.eliminados = []
        for (var i = 0; i < this.listaEstudiantes.length; i++) {
          this.eliminados.push(this.listaEstudiantes[i].id)
        }
      }
    },
    eliminarEstudiantes: function () {
      this.notificar = true
    },
    cancelarEliminacion: function () {
      this.notificar = false
    },
    async confirmarEliminacion () {
      const estudiante = { eliminados: this.eliminados }
      try {
        await axios.post(this.apiUrl + '/estudiantes/eliminar', estudiante, { headers: Auth.postHeader() })
        this.notificar = false
        this.obtenerEstudiantes()
        this.eliminados = []
      } catch (e) {
        this.notificar = false
        console.log('No fue posible eliminar los estudiantes seleccioandos')
        console.log(e)
      }
    }
  },
  mounted () {
    this.obtenerSecciones()
    this.obtenerEstudiantes()
  }
}
</script>
