<template>
  <div>
    <br>
    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-success" @click="agregarEstudiante">Agregar Estudiante</button>
      </div>
    </div>
    <div v-if="verFormulario">
      <form class="form" method="post">
        <div class="columns has-text-left">
          <div class="column is-3">
            <div class="field">
              <label class="label">R.U.N.:</label>
              <div class="control">
                <input v-model="estudiante.usuario.run" class="input" type="text" placeholder="ej.: 12345678-9">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Nombre:</label>
              <div class="control">
                <input v-model="estudiante.usuario.nombre" class="input" type="text" placeholder="ej.: Pablo">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Apellido paterno:</label>
              <div class="control">
                <input v-model="estudiante.usuario.apellido_paterno" class="input" type="text" placeholder="ej.: Contreras">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Apellido materno:</label>
              <div class="control">
                <input v-model="estudiante.usuario.apellido_materno" class="input" type="text" placeholder="ej.: Soto">
              </div>
            </div>
          </div>
        </div>
        <div class="columns has-text-left">
          <div class="column is-3">
            <div class="field">
              <label class="label">Correo electrónico:</label>
              <div class="control">
                <input v-model="estudiante.usuario.email" class="input" type="text" placeholder="ej.: pablo.contreras@usach.cl">
              </div>
            </div>
          </div>
          <div class="column is-9">
            <div class="field">
              <label class="label">Sección - Curso:</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="estudiante.seccion_id">
                    <option v-for="seccion in secciones" :key="seccion.id" :value="seccion.id">
                      {{ seccion.codigo }} - {{ seccion.curso.nombre }} ({{ seccion.curso.codigo }}) - Jornada: {{ seccion.jornada.nombre }}
                    </option>
                  </select>
                </div>
              </div>
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
                <a class="button is-light" @click="noAgregar">Cancelar</a>
              </div>
            </div>
          </div>
        </div>
      </form>
      <hr>
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
            <th>Jornada</th>
          </tr>
        </thead>
        <tbody v-for="(estudiante, index) in listaEstudiantes" :key="estudiante.id">
          <tr>
            <th>{{ index + 1 }}</th>
            <td>{{ estudiante.usuario.run }}</td>
            <td class="has-text-left">{{ nombreCompleto(estudiante.usuario) }}</td>
            <td>{{ estudiante.seccion.codigo }}</td>
            <td>{{ estudiante.seccion.jornada.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      secciones: {},
      estudiante: {
        usuario: {
          nombre: null,
          apellido_paterno: null,
          apellido_materno: null,
          run: null,
          email: null
        },
        seccion_id: null
      },
      listaEstudiantes: {},
      mostrarLista: false
    }
  },
  computed: {
    ...mapState(['apiUrl'])
  },
  methods: {
    async obtenerSecciones () {
      try {
        const secciones = await axios.get(this.apiUrl + '/secciones', { headers: Auth.authHeader() })
        this.secciones = secciones.data
      } catch (error) {
        console.log(error)
      }
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
      this.estudiante.usuario.nombre = null
      this.estudiante.usuario.apellido_paterno = null
      this.estudiante.usuario.apellido_materno = null
      this.estudiante.usuario.run = null
      this.estudiante.usuario.email = null
      this.estudiante.seccion_id = null
    },
    agregarEstudiante: function () {
      this.verFormulario = true
      this.nuevoEstudiante()
    },
    async agregar () {
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
    },
    noAgregar: function () {
      this.nuevoEstudiante()
      this.verFormulario = false
    },
    nombreCompleto: function (estudiante) {
      return estudiante.nombre + ' ' + estudiante.apellido_paterno + ' ' + estudiante.apellido_materno
    }
  },
  mounted () {
    this.obtenerSecciones()
    this.obtenerEstudiantes()
  }
}
</script>
