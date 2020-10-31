<template>
  <div class="">
    <br>
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
                  <div class="constrol">
                    <button class="button is-link">Crear grupo</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="column is-7 has-text-centered">
          <div class="field">
            <label class="label">Estudiantes</label>
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
                </tr>
              </thead>
              <tbody v-for="(estudiante, index) in listaEstudiantes" :key="estudiante.id">
                <tr>
                  <th>{{ index + 1 }}</th>
                  <td>{{ estudiante.run_est}}</td>
                  <td class="has-text-left">{{ nombreCompleto(estudiante) }}</td>
                  <td>{{ estudiante.codigo_seccion}}</td>
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
    }
  },
  mounted () {
    this.obtenerEstudiantes()
  }
}
</script>
