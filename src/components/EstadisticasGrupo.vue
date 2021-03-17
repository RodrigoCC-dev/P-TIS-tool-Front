<template>
  <div>
    <br>

    <div>
      <SelectorJornada/>
      <SelectorGrupo @eleccion="seleccionGrupo"/>
    </div>

    <div v-if="mostrarRegistros">
      <table class="table is-bordered is-fullwidth">
        <thead>
          <tr class="has-background-light">
            <th scope="col">R.U.N.</th>
            <th scope="col">Estudiante</th>
            <th scope="col"><abbr title="Definición de los datos de las minutas como: hora de inicio, hora de término, clasificación y asistencia">Minutas</abbr></th>
            <th scope="col"><abbr title="Definición del tema a tratar en las minutas">Tema</abbr></th>
            <th scope="col"><abbr title="Definición de los objetivos de las minutas">Objetivos</abbr></th>
            <th scope="col"><abbr title="Definición de las conclusiones de las minutas">Conclusiones</abbr></th>
            <th scope="col"><abbr title="Definición de los ítems de las minutas, estableciendo los responsables y fechas de los compromisos">Items</abbr></th>
            <th scope="col"><abbr title="Ingreso de comentarios a las minutas realizadas">Comentarios</abbr></th>
            <th scope="col"><abbr title="Ingreso de respuestas a los comentarios realizados a las minutas">Respuestas</abbr></th>
            <th scope="col">Subtotal</th>
            <th scope="col">Participación</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Total:</th>
            <th scope="col">{{totalRegistros}}</th>
            <th scope="col"></th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="estudiante in registros" :key="estudiante.id">
            <td>{{estudiante.usuario.run}}</td>
            <td>{{nombreCompleto(estudiante.usuario)}}</td>
            <td>{{estudiante.usuario.registros.minutas}}</td>
            <td>{{estudiante.usuario.registros.tema}}</td>
            <td>{{estudiante.usuario.registros.objetivos}}</td>
            <td>{{estudiante.usuario.registros.conclusiones}}</td>
            <td>{{estudiante.usuario.registros.items}}</td>
            <td>{{estudiante.usuario.registros.comentarios}}</td>
            <td>{{estudiante.usuario.registros.respuestas}}</td>
            <th scope="row">{{subTotalRegistros(estudiante)}}</th>
            <th scope="row">{{porcentajeParcial(estudiante)}} %</th>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import axios from 'axios'
import { mapState } from 'vuex'
import Funciones from '@/services/funciones.js'

import SelectorJornada from '@/components/SelectorJornada.vue'
import SelectorGrupo from '@/components/SelectorGrupo.vue'

export default {
  name: 'EstadisticasGrupo',
  components: {
    SelectorJornada,
    SelectorGrupo
  },
  data () {
    return {
      grupoSeleccionado: {},
      registros: []
    }
  },
  computed: {
    ...mapState(['apiUrl']),

    mostrarRegistros: function () {
      return this.registros.length > 0
    },
    totalRegistros: function () {
      if (this.registros.length > 0) {
        var total = 0
        for (var i = 0; i < this.registros.length; i++) {
          total = total + this.subTotalRegistros(this.registros[i])
        }
        return total
      } else {
        return 0
      }
    }
  },
  methods: {
    nombreCompleto: function (usuario) {
      return Funciones.nombreCompleto(usuario)
    },
    seleccionGrupo: function (grupo) {
      this.grupoSeleccionado = grupo
      this.obtenerRegistros(grupo.id)
    },
    async obtenerRegistros (id) {
      try {
        const response = await axios.get(this.apiUrl + '/registros/grupo/' + id, { headers: Auth.authHeader() })
        this.registros = response.data
      } catch (e) {
        console.log(e)
      }
    },
    subTotalRegistros: function (estudiante) {
      var suma = 0
      var arreglo = Object.keys(estudiante.usuario.registros)
      for (var i = 0; i < arreglo.length; i++) {
        suma = suma + estudiante.usuario.registros[arreglo[i]]
      }
      return suma
    },
    porcentajeParcial: function (estudiante) {
      if (this.registros.length > 0) {
        var subTotal = this.subTotalRegistros(estudiante)
        var porcentaje = 0
        if (this.totalRegistros > 0) {
          porcentaje = (subTotal / this.totalRegistros) * 100
        }
        return porcentaje.toFixed(1)
      } else {
        return 0
      }
    }
  }
}
</script>
