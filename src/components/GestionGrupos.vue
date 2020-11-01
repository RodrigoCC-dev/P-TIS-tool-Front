<template>
  <div class="">
    <br>
    <div v-if="mostrarJornadas">
      <section>
        <div class="tabs is-toggle is-toggle-rounded is-centered">
          <ul>
            <li class="is-active">
              <a>
                <span>Diurnos</span>
              </a>
            </li>
            <li>
              <a>
                <span>Vespertinos</span>
              </a>
            </li>
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
                    <input v-model="grupo.nombre" class="input" :class="{ 'is-danger' : entradas.proyecto.error }" type="text" disabled>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Proyecto:</label>
                  <div class="control">
                    <input class="input" v-model="grupo.proyecto" :class="{ 'is-danger' : entradas.proyecto.error }" type="text">
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
              <tbody v-for="(estudiante, index) in listaEstudiantes" :key="estudiante.id">
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
  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState } from 'vuex'

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
        }
      },
      listaEstudiantes: {}
    }
  },
  computed: {
    ...mapState(['apiUrl'])
  },
  methods: {
    nombreCompleto: function (estudiante) {
      return estudiante.nombre_est + ' ' + estudiante.apellido1 + ' ' + estudiante.apellido2
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
    validarDatos: function () {
      return true
    }
  },
  mounted () {
    this.obtenerEstudiantes()
    this.obtenerJornadas()
  }
}
</script>
