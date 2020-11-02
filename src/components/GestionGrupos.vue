<template>
  <div class="">
    <br>

    <div v-if="mostrarJornadas">
      <section>
        <div class="tabs is-toggle is-toggle-rounded is-centered">
          <ul>
            <li :class="{ 'is-active' : jornadaActual === nombreTabs.diurna }" @click="elegirTab(nombreTabs.diurna)"><a><span>Diurnos</span></a></li>
            <li :class="{ 'is-active' : jornadaActual === nombreTabs.vespertina }" @click="elegirTab(nombreTabs.vespertina)"><a><span>Vespertinos</span></a></li>
          </ul>
        </div>
      </section>
    </div>

    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-success" @click="agregarGrupo">Agregar Grupo</button>
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
                    <a class="button is-link" @click="agregar">Crear grupo</a>
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
            <label class="label">Estudiantes a asignar:</label>
          </div>
          <p class="is-danger help" v-if="entradas.estudiantes.error">{{ entradas.estudiantes.mensaje }}</p>
          <br>
          <div v-if="mostrarLista">
            <table class="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr class="has-text-centered has-background-light">
                  <th>N°</th>
                  <th>R.U.N.</th>
                  <th>Nombre estudiante</th>
                  <th>Sección</th>
                  <th><input type="checkbox" name="" value=""></th>
                </tr>
              </thead>
              <tbody v-for="(estudiante, index) in sinAsignar" :key="estudiante.id">
                <tr>
                  <th>{{ index + 1 }}</th>
                  <td>{{ estudiante.run_est}}</td>
                  <td class="has-text-left">{{ nombreCompleto(estudiante) }}</td>
                  <td>{{ estudiante.codigo_seccion}}</td>
                  <td><input type="checkbox" v-model="estudiantes" :value="estudiante.id"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>No hay estudiantes para asignar</p>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="columns">
      <div v-for="grupo in listaGrupos" :key="grupo.id">
        <div class="column is-narrow" v-if="grupo.jornada === jornadaActual">
          <article class="message is-info">
            <div class="message-header">
              <p>{{ grupo.nombre }}</p>
            </div>
            <div class="message-body">
              <p class="title is-6">{{ grupo.proyecto }}</p>
              <p v-for="estudiante in grupo.estudiantes" :key="estudiante.id">{{ nombreCompleto(estudiante) }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState } from 'vuex'

const nombreTabs = {
  diurna: 'Diurna',
  vespertina: 'Vespertina'
}

export default {
  name: 'GestionGrupos',
  data () {
    return {
      verFormulario: false,
      mostrarLista: false,
      jornadasProfesor: [],
      mostrarJornadas: false,
      jornadaActual: 'Diurna',
      grupo: {
        nombre: '',
        proyecto: '',
        correlativo: 0
      },
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
      listaEstudiantes: {},
      listaGrupos: [],
      nombreTabs
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    sinAsignar: function () {
      var lista = []
      for (var i = 0; i < this.listaEstudiantes.length; i++) {
        if (this.listaEstudiantes[i].jornada === this.jornadaActual) {
          lista.push(this.listaEstudiantes[i])
        }
      }
      return lista
    }
  },
  methods: {
    nombreCompleto: function (estudiante) {
      return estudiante.nombre_est + ' ' + estudiante.apellido1 + ' ' + estudiante.apellido2
    },
    elegirTab: function (nombreTab) {
      this.jornadaActual = nombreTab
    },
    agregarGrupo: function () {
      this.verFormulario = true
      this.nuevoGrupo()
      this.obtenerCorrelativo(this.jornadaActual)
    },
    async obtenerEstudiantes () {
      try {
        const response = await axios.get(this.apiUrl + '/estudiantes/sin_grupo', { headers: Auth.authHeader() })
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
    async obtenerJornadas () {
      try {
        const response = await axios.get(this.apiUrl + '/jornadas', { headers: Auth.authHeader() })
        var datos = response.data
        if (Object.keys(datos).length > 0) {
          var aux = 0
          for (var i = 0; i < Object.keys(datos).length; i++) {
            if (this.jornadasProfesor.indexOf(datos[i].nombre) === -1) {
              aux = this.jornadasProfesor.push(datos[i].nombre)
            }
          }
          if (aux === 2) {
            this.mostrarJornadas = true
          } else if (aux === 1) {
            this.jornadaActual = this.jornadasProfesor[0]
          } else {
            this.mostrarJornadas = false
          }
        }
      } catch {
        console.log('No fue posible obtener las jornadas del profesor')
      }
    },
    async obtenerGrupos () {
      try {
        const response = await axios.get(this.apiUrl + '/grupos', { headers: Auth.authHeader() })
        this.listaGrupos = response.data
        console.log(this.listaGrupos)
      } catch {
        console.log('No se han obtenido los grupos')
      }
    },
    async agregar () {
      if (this.validarDatos()) {
        const nuevoGrupo = {
          grupo: this.grupo,
          estudiantes: this.estudiantes
        }
        try {
          await axios.post(this.apiUrl + '/grupos', nuevoGrupo, { headers: Auth.postHeader() })
        } catch {
          console.log('No fue posible crear el grupo')
        }
        this.verFormulario = false
      }
    },
    noAgregar: function () {
      this.nuevoGrupo()
      this.verFormulario = false
      this.entradas.proyecto.error = false
      this.entradas.estudiantes.error = false
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
      } catch {
        console.log('No se pudo obtener correlativo')
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
        this.entradas.proyecto.mensaje = 'Sólo se admiten letras. Verificar que no tenga caracteres especiales'
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
    }
  },
  mounted () {
    this.obtenerEstudiantes()
    this.obtenerJornadas()
    this.obtenerGrupos()
  }
}
</script>
