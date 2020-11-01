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
          <form class="form" method="post">
            <div class="columns has-text-left">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Grupo:</label>
                  <div class="control">
                    <input v-model="proyecto" class="input" :class="{ 'is-danger' : entradas.proyecto.error }" type="text" disabled>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Proyecto:</label>
                  <div class="control">
                    <input class="input" :class="{ 'is-danger' : entradas.proyecto.error }" type="text">
                  </div>
                  <p class="is-danger help" v-if="entradas.proyecto.error">{{ entradas.proyecto.mensaje}}</p>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <button class="button is-link">Crear grupo</button>
                  </div>
                  <div class="control">
                    <button class="button is-light"><strong>Cancelar</strong></button>
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
                  <td><input type="checkbox" name="" value=""></td>
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
      proyecto: '',
      entradas: {
        proyecto: {
          error: false,
          mensaje: ''
        }
      },
      listaEstudiantes: {},
      grupo: []
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
        if (Object.keys(response.data).length > 0) {
          var aux = 0
          for (var i = 0; i < Object.keys(response.data); i++) {
            if (this.jornadasProfesor.indexOf(response.data[i].nombre) === -1) {
              aux = this.jornadasProfesor.push(response.data[i].nombre)
            }
          }
          if (aux === 2) {
            this.mostrarJornadas = true
          } else {
            this.mostrarJornadas = false
          }
        }
        console.log(this.jornadasProfesor)
      } catch {
        console.log('No fue posible obtener las jornadas del profesor')
      }
    }
  },
  mounted () {
    this.obtenerEstudiantes()
    this.obtenerJornadas()
  }
}
</script>
