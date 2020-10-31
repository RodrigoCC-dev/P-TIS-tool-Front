<template>
  <p>Este es el componente de los grupos - editado</p>
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
        <div class="column is-6">
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
          </form>
        </div>
        <div class="column is-6 has-text-centered">
          <div class="field">
            <label label="label">Estudiantes:</label>
          </div>
          <br>
          <table class="table is-bordered is-narrow is-fullwidth">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>R.U.N.</th>
                <th>Nombre estudiante</th>
                <th>Sección</th>
              </tr>
            </thead>
            <tbody v-for="(estudiante, index) in listaEstudiantes" :key="estuidante.id">
              <tr>
                <th>{{ index + 1 }}</th>
                <td>{{ estudiante.run_est}}</td>
                <td class="has-text-left">{{ nombreCompleto(estudiante) }}</td>
                <td>{{ estuidante.codigo_seccion}}</td>
              </tr>
            </tbody>
          </table>
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
      verFormulario: true,
      proyecto: '',
      entradas: {
        proyecto: {
          error: false,
          mensaje: ''
        }
      },
      estudiantes: {},
      grupo: []
    }
  },
  methods: {
    agregarGrupo: function () {
      return true
    }
  }
}
</script>
