<template>
  <div class="">
    <br>

    <SelectorJornada/>

    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-info-usach" @click="agregarGrupo">Agregar Grupo</button>
      </div>
    </div>

    <div v-if="verFormulario">
      <div class="columns">
        <div class="column is-5">
          <form class="form">
            <div class="columns has-text-left">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Grupo:</label>
                  <div class="control">
                    <input v-model="grupo.nombre" class="input" type="text" disabled>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Proyecto:</label>
                  <div class="control">
                    <input class="input" v-model="grupo.proyecto" :class="{ 'is-danger' : entradas.proyecto.error }" type="text" v-on:input="validarProyecto">
                  </div>
                  <p class="is-danger help" v-if="entradas.proyecto.error">{{ entradas.proyecto.mensaje}}</p>
                </div>
              </div>
            </div>
            <br>
            <div class="columns">
              <div class="column is-12">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-primary-usach" @click="agregar">{{ actualizarGrupo ? 'Actualizar grupo' : 'Crear grupo'}}</a>
                  </div>
                  <div class="control">
                    <a class="button is-light-usach" @click="noAgregar"><strong>Cancelar</strong></a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="column is-7 has-text-centered">
          <div class="field">
            <label id="estudiantes" class="label">Estudiantes a asignar:</label>
          </div>
          <p class="is-danger help" v-if="entradas.estudiantes.error">{{ entradas.estudiantes.mensaje }}</p>
          <br>
          <div v-if="mostrarLista">
            <table class="table is-bordered is-narrow is-fullwidth" aria-decribedby="estudiantes">
              <thead>
                <tr class="has-background-light">
                  <th scope="col" class="has-text-centered">N°</th>
                  <th scope="col" class="has-text-centered">R.U.N.</th>
                  <th scope="col" class="has-text-centered">Nombre estudiante</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(estudiante, index) in sinAsignar" :key="estudiante.id">
                  <th class="has-text-centered" scope="row">{{ index + 1 }}</th>
                  <td class="has-text-centered">{{ visualizarRun(estudiante.run_est) }}</td>
                  <td class="has-text-left">{{ concatenarNombre(estudiante) }}</td>
                  <td class="has-text-centered"><input type="checkbox" v-model="estudiantes" :value="estudiante.id"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>No hay estudiantes para asignar</p>
          </div>
        </div>
      </div>
      <hr>
    </div>

    <div class="columns is-multiline">
      <div class="column is-3" v-for="grupo in gruposJornada" :key="grupo.id">
        <article class="message is-info">
          <div class="message-header">
            <p>{{ grupo.nombre }}</p>
            <a class="button is-small is-link is-rounded" @click="editarGrupo(grupo)">Editar</a>
            <button class="delete" aria-label="delete" @click="borrarGrupo(grupo.id)"></button>
          </div>
          <div class="message-body">
            <p class="title is-6">{{ grupo.proyecto }}</p>
            <p v-for="estudiante in grupo.estudiantes" :key="estudiante.id">{{ nombreCompleto(estudiante.usuario) }}</p>
            <div v-if="mostrarClientes(grupo)">
              <br>
              <p class="subtitle is-6"><strong>Clientes:</strong></p>
              <p v-for="cliente in grupo.stakeholders" :key="cliente.id">{{ nombreCompleto(cliente.usuario) }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div v-if="this.notificar.mostrar">
      <Confirmacion :mostrar="notificar.mostrar" :texto="notificar.mensaje" @accion="confirmarBorrado" @cerrar="cerrarNotificacion"/>
    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import axios from 'axios'
import { mapState } from 'vuex'

import SelectorJornada from '@/components/SelectorJornada.vue'
import Confirmacion from '@/components/Confirmacion.vue'

export default {
  name: 'GestionGrupos',
  components: {
    SelectorJornada,
    Confirmacion
  },
  data () {
    return {
      verFormulario: false,
      estudiantes: [],
      entradas: {
        proyecto: {
          error: false,
          mensaje: ''
        },
        estudiantes: {
          error: false,
          mensaje: ''
        }
      },
      grupo: {
        nombre: '',
        proyecto: '',
        correlativo: 0
      },
      listaEstudiantes: [],
      listaGrupos: [],
      notificar: {
        id: 0,
        mostrar: false,
        mensaje: '¿Confirma la eliminación del grupo?'
      },
      actualizarGrupo: false,
      idGrupo: 0
    }
  },
  computed: {
    ...mapState(['apiUrl', 'jornadaActual']),

    sinAsignar: function () {
      var lista = []
      for (var i = 0; i < this.listaEstudiantes.length; i++) {
        if (this.listaEstudiantes[i].jornada === this.jornadaActual) {
          lista.push(this.listaEstudiantes[i])
        }
      }
      return lista
    },
    mostrarLista: function () {
      return this.sinAsignar.length > 0
    },
    gruposJornada: function () {
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
    concatenarNombre: function (estudiante) {
      return estudiante.nombre_est + ' ' + estudiante.apellido1 + ' ' + estudiante.apellido2
    },
    nombreCompleto: function (estudiante) {
      return Funciones.nombreCompleto(estudiante)
    },
    visualizarRun: function (run) {
      return Funciones.visualizarRun(run)
    },
    mostrarClientes: function (grupo) {
      return grupo.stakeholders.length > 0
    },
    agregarGrupo: function () {
      this.verFormulario = true
      this.nuevoGrupo()
      this.obtenerCorrelativo(this.jornadaActual)
      this.obtenerEstudiantes()
    },
    async obtenerEstudiantes () {
      try {
        const response = await axios.get(this.apiUrl + '/estudiantes/asignacion/sin_grupo', { headers: Auth.authHeader() })
        if (response.data !== null) {
          this.listaEstudiantes = response.data
        } else {
          this.listaEstudiantes = []
        }
      } catch (error) {
        console.error(error)
        this.$store.commit('setClaseNotError', true)
        try {
          this.$store.commit('setNotificacion', error.response)
        } catch (e) {
          this.$store.commit('setNotificacion', 'Error. No se ha podido obtener los estudiantes a asignar. Por favor recargue la página e intente nuevamente.')
        }
      }
    },
    async obtenerGrupos () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos', { headers: Auth.authHeader() })
        this.listaGrupos = response.data
      } catch (e) {
        console.error(e)
        this.$store.commit('setClaseNotError', true)
        try {
          this.$store.commit('setNotificacion', e.response)
        } catch {
          this.$store.commit('setNotificacion', 'Error. No se han obtenido los grupos. Por favor recargue la página.')
        }
      }
    },
    async agregar () {
      if (this.validarDatos()) {
        const nuevoGrupo = {
          grupo: this.grupo,
          estudiantes: this.estudiantes
        }
        if (!this.actualizarGrupo) {
          try {
            await axios.post(this.apiUrl + '/grupos', nuevoGrupo, { headers: Auth.postHeader() })
            this.obtenerGrupos()
            this.$store.commit('setClaseNotExito', true)
            this.$store.commit('setNotificacion', 'Se ha creado el grupo exitosamente')
          } catch (e) {
            console.error(e)
            this.$store.commit('setClaseNotError', true)
            try {
              this.$store.commit('setNotificacion', e.response)
            } catch {
              this.$store.commit('setNotificacion', 'Error. No fue posible crear el grupo. Por favor, intente nuevamente.')
            }
          }
        } else {
          try {
            await axios.patch(this.apiUrl + '/grupos/' + this.idGrupo, nuevoGrupo, { headers: Auth.postHeader() })
            this.obtenerGrupos()
            this.actualizarGrupo = false
            this.$store.commit('setClaseNotExito', true)
            this.$store.commit('setNotificacion', 'Se ha actualizado el grupo correctamente')
          } catch (e) {
            console.error(e)
            this.$store.commit('setClaseNotError', true)
            try {
              this.$store.commit('setNotificacion', e.response)
            } catch {
              this.$store.commit('Error. No fue posible actualizar el grupo. Por favor intente nuevamente.')
            }
          }
        }
        this.verFormulario = false
      }
    },
    noAgregar: function () {
      this.nuevoGrupo()
      this.verFormulario = false
      this.entradas.proyecto.error = false
      this.entradas.estudiantes.error = false
      this.quitarEstudiantesGrupo()
      this.actualizarGrupo = false
    },
    nuevoGrupo: function () {
      this.grupo.nombre = ''
      this.grupo.proyecto = ''
      this.grupo.correlativo = 0
      this.estudiantes = []
    },
    async obtenerCorrelativo (jornadaAct) {
      try {
        const solicitud = {
          jornada: jornadaAct
        }
        const response = await axios.post(this.apiUrl + '/grupos/ultimo_grupo', solicitud, { headers: Auth.postHeader() })
        if (response.data === null) {
          this.grupo.correlativo = 1
          this.grupo.nombre = 'G01'
        } else {
          this.grupo.correlativo = response.data.correlativo + 1
          if (this.grupo.correlativo < 10) {
            this.grupo.nombre = 'G0' + this.grupo.correlativo
          } else {
            this.grupo.nombre = 'G' + this.grupo.correlativo
          }
        }
      } catch (e) {
        console.error(e)
        this.$store.commit('setClaseNotError', true)
        try {
          this.$store.commit('setNotificacion', e.response)
        } catch {
          this.$store.commit('setNotificacion', 'No se pudo obtener el correlativo del grupo. Por favor intente nuevamente.')
        }
      }
    },
    validarProyecto: function () {
      const regExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
      const proyecto = this.grupo.proyecto
      if (proyecto === null || proyecto === undefined || proyecto === '') {
        this.entradas.proyecto.error = true
        this.entradas.proyecto.mensaje = 'Se debe ingresar el nombre del proyecto a realizar'
        return false
      } else if (!regExp.test(proyecto)) {
        this.entradas.proyecto.error = true
        this.entradas.proyecto.mensaje = 'Sólo se admiten letras. Verificar que no tenga caracteres especiales.'
        return false
      } else {
        this.entradas.proyecto.error = false
        this.entradas.proyecto.mensaje = ''
        return true
      }
    },
    validarAsignacion: function () {
      if (this.estudiantes.length === 0) {
        this.entradas.estudiantes.error = true
        this.entradas.estudiantes.mensaje = 'No se han asignado estudiantes al grupo'
        return false
      } else {
        this.entradas.estudiantes.error = false
        this.entradas.estudiantes.mensaje = ''
        return true
      }
    },
    validarDatos: function () {
      var esvalido = true
      esvalido = esvalido && this.validarProyecto()
      esvalido = esvalido && this.validarAsignacion()
      return esvalido
    },
    borrarGrupo: function (id) {
      this.notificar.mostrar = true
      this.notificar.id = id
    },
    async confirmarBorrado () {
      try {
        await axios.delete(this.apiUrl + '/grupos/' + this.notificar.id, { headers: Auth.authHeader() })
        this.obtenerGrupos()
        this.$store.commit('setClaseNotExito', true)
        this.$store.commit('setNotificacion', 'Se ha borrado el grupo exitosamente')
      } catch (e) {
        console.error(e)
        this.$store.commit('setClaseNotError', true)
        try {
          this.$store.commit('setNotificacion', e.response)
        } catch {
          this.$store.commit('setNotificacion', 'Error. No se ha podido eliminar el grupo. Por favor, intente nuevamente.')
        }
      }
      this.notificar.mostrar = false
      this.notificar.id = 0
    },
    cerrarNotificacion: function () {
      this.notificar.mostrar = false
    },
    convertirEstudiantes: function (grupo) {
      var lista = []
      for (var i = 0; i < grupo.estudiantes.length; i++) {
        lista.push(grupo.estudiantes[i].id)
      }
      return lista
    },
    existeEstudiante: function (id) {
      return Funciones.buscarIndexPorId(this.listaEstudiantes, id) !== -1
    },
    agregarEstudiantesGrupo: function (grupo) {
      var lista = []
      var estudiante = {
        id: 0,
        run_est: '',
        nombre_est: '',
        apellido1: '',
        apellido2: '',
        codigo_seccion: 'Act',
        jornada: this.jornadaActual
      }
      for (var i = 0; i < grupo.estudiantes.length; i++) {
        if (!this.existeEstudiante(grupo.estudiantes[i].id)) {
          var aux = Object.assign({}, estudiante)
          aux.id = grupo.estudiantes[i].id
          aux.run_est = grupo.estudiantes[i].usuario.run
          aux.nombre_est = grupo.estudiantes[i].usuario.nombre
          aux.apellido1 = grupo.estudiantes[i].usuario.apellido_paterno
          aux.apellido2 = grupo.estudiantes[i].usuario.apellido_materno
          lista.push(aux)
        }
      }
      return lista
    },
    quitarEstudiantesGrupo: function () {
      var indices = []
      for (var i = 0; i < this.listaEstudiantes.length; i++) {
        if (this.listaEstudiantes[i].codigo_seccion === 'Act') {
          indices.push(i)
        }
      }
      for (var j = indices.length - 1; j >= 0; j--) {
        this.listaEstudiantes.splice(indices[j], 1)
      }
    },
    editarGrupo: function (grupo) {
      this.idGrupo = grupo.id
      this.grupo.nombre = grupo.nombre
      this.grupo.proyecto = grupo.proyecto
      this.grupo.correlativo = grupo.correlativo
      this.estudiantes = this.convertirEstudiantes(grupo)
      this.listaEstudiantes = this.agregarEstudiantesGrupo(grupo).concat(this.listaEstudiantes)
      this.verFormulario = true
      this.actualizarGrupo = true
    }
  },
  watch: {
    jornadaActual: function () {
      this.obtenerCorrelativo(this.jornadaActual)
    }
  },
  created () {
    if (localStorage.user_tk) {
      this.obtenerEstudiantes()
      this.obtenerGrupos()
    }
  }
}
</script>
