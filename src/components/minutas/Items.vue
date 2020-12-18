<template>
  <div>

    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr class="has-text-centered">
          <th class="is-narrow">N°</th>
          <th><abbr title="Tipo de actividad">Item</abbr></th>
          <th><abbr title="Descripción de la actividad realizada">Descripción</abbr></th>
          <th><abbr title="Fecha comprometida para la actividad">Fecha</abbr></th>
          <th><abbr title="Responsable de realizarla">Responsable</abbr></th>
          <th v-if="comentarios"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listaOrdenada" :key="item.id">
          <th class="is-vcentered">{{ item.correlativo }}</th>
          <td class="is-vcentered">{{ item.tipo }}</td>
          <td class="is-vcentered has-text-left">{{ item.descripcion }}</td>
          <td class="is-vcentered">{{ fechaItem(item.fecha) }}</td>
          <td class="is-vcentered has-text-centered">{{ obtenerIniciales(item.responsables) }}</td>
          <td v-if="comentarios">
            <div v-if="!this.mostrarComentar[index]">
              <a @click="abrirComentario(index, item.id)">comentar</a>
            </div>
            <div v-else>
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <textarea v-model="this.listaComentarios[index].comentario" class="textarea is-small is-extend" :class="{ 'is-danger' : this.listaEntradas[index].error }" @input="limpiarErrorItem"></textarea>
                  </div>
                  <p v-if="this.listaEntradas[index].error" class="is-danger help">{{ this.listaEntradas[index].mensaje }}</p>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item" @click="cerrarComentario(index)">Cancelar</a>
                </footer>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="comentarios">

      <div class="columns">
        <div class="column is-half is-offset-3">
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <a class="button is-success" @click="agregaComentario">Agregar comentario</a>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="content has-text-left">
            <dl>
              <li v-for="(comentario, index) in listaGenerales" :key="index">
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input v-model="listaGenerales[index].comentario" class="input"  :class="{ 'is-danger' : this.entradas.comentarios }" type="text" @input="limpiarErrorGeneral">
                  </p>
                  <p class="control">
                    <a class="button is-danger is-light" @click="removerComentario(comentario)"><strong>X</strong></a>
                  </p>
                </div>
              </li>
            </dl>
            <p class="is-danger help" v-if="entradas.comentarios">No se han ingresado todos los comentarios</p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half is-offset-3">
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <a class="button is-link" @click="enviarComentarios">Guardar comentarios</a>
            </div>
            <div class="control">
              <a class="button is-dark is-light" @click="cancelarEnvio">Cancelar</a>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Funciones from '@/services/funciones.js'

export default {
  name: 'Item',
  props: ['lista', 'asistentes', 'comentar'],
  data () {
    return {
      listaItems: this.lista,
      asistencia: this.asistentes,
      comentarios: this.comentar,
      mostrarComentar: [],
      listaComentarios: [],
      listaGenerales: [],
      comentario: {
        comentario: '',
        es_item: true,
        id_item: 0
      },
      entrada: {
        error: false,
        mensaje: ''
      },
      listaEntradas: [],
      entradas: {
        comentarios: false
      }
    }
  },
  computed: {
    listaOrdenada: function () {
      var lista = this.listaItems
      return lista.sort((a, b) => {
        if (a.correlativo < b.correlativo) {
          return -1
        } else {
          return 1
        }
      })
    }
  },
  methods: {
    fechaItem: function (cadena) {
      return Funciones.obtenerFecha(cadena)
    },
    obtenerIniciales: function (listaResponsables) {
      var resp = []
      for (var i = 0; i < listaResponsables.length; i++) {
        for (var j = 0; j < this.asistencia.length; j++) {
          if (listaResponsables[i].asistencia_id === this.asistencia[j].id) {
            resp.push(this.asistencia[j].iniciales)
          }
        }
      }
      return resp.join(' / ')
    },
    crearListas: function () {
      this.limpiarCampos()
      for (var i = 0; i < this.listaItems.length; i++) {
        this.mostrarComentar.push(false)
        this.listaComentarios.push(Object.assign({}, this.comentario))
        this.listaEntradas.push(Object.assign({}, this.entrada))
      }
    },
    abrirComentario: function (index, id) {
      this.mostrarComentar[index] = true
      this.listaComentarios[index].id_item = id
    },
    cerrarComentario: function (index) {
      this.mostrarComentar[index] = false
      this.listaComentarios[index].comentario = ''
      this.listaEntradas[index].error = false
    },
    agregaComentario: function () {
      var comentario = Object.assign({}, this.comentario)
      comentario.es_item = false
      this.listaGenerales.push(comentario)
    },
    removerComentario: function (comentario) {
      return Funciones.removeFromArray(this.listaGenerales, comentario)
    },
    limpiarCampos: function () {
      this.mostrarComentar = []
      this.listaComentarios = []
      this.listaGenerales = []
    },
    enviarComentarios: function () {
      if (this.validarComentarios()) {
        var comentarios = this.listaComentarios.concat(this.listaGenerales)
        this.$emit('comentar', comentarios)
      }
    },
    cancelarEnvio: function () {
      this.$emit('cerrar')
      this.limpiarCampos()
      this.limpiarErrorGeneral()
      for (var i = 0; i < this.listaEntradas.length; i++) {
        this.listaEntradas[i].error = false
        this.listaEntradas[i].mensaje = ''
      }
    },
    validarComentarioItem: function (index) {
      if (this.mostrarComentar[index]) {
        if (this.listaComentarios[index].comentario === '' || this.listaComentarios[index].comentario === undefined) {
          this.listaEntradas[index].error = true
          this.listaEntradas[index].mensaje = 'Falta ingresar el comentario'
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    validarListaComentarios: function () {
      const comentarios = this.listaComentarios
      var validacion = true
      for (var i = 0; i < comentarios.length; i++) {
        validacion = validacion && this.validarComentarioItem(i)
      }
      return validacion
    },
    validarListaGenerales: function () {
      if (this.listaGenerales.length > 0) {
        var validar = true
        for (var i = 0; i < this.listaGenerales.length; i++) {
          if (this.listaGenerales[i].comentario === '') {
            validar = false
            this.entradas.comentarios = true
          }
        }
        return validar
      } else {
        return true
      }
    },
    validarComentarios: function () {
      return this.validarListaComentarios() && this.validarListaGenerales()
    },
    limpiarErrorItem: function (index) {
      this.listaEntradas[index].error = false
      this.listaEntradas[index].mensaje = ''
    },
    limpiarErrorGeneral: function () {
      this.entradas.comentarios = false
    }
  },
  mounted () {
    this.crearListas()
  }
}
</script>
