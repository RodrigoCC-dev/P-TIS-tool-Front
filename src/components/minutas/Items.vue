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
          <th v-show="comentarios"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listaOrdenada" :key="item.id">
          <th class="is-vcentered">{{ item.correlativo }}</th>
          <td class="is-vcentered">{{ item.tipo }}</td>
          <td class="is-vcentered has-text-left">{{ item.descripcion }}</td>
          <td class="is-vcentered">{{ fechaItem(item.fecha) }}</td>
          <td class="is-vcentered has-text-centered">{{ obtenerIniciales(item.responsables) }}</td>
          <td v-show="comentarios">
            <div v-if="!this.mostrarComentar[index]">
              <a @click="abrirComentario(index)">comentar</a>
            </div>
            <div v-else>
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <textarea class="textarea is-small is-extend"></textarea>
                  </div>
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

  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['lista', 'asistentes', 'comentar'],
  data () {
    return {
      listaItems: this.lista,
      asistencia: this.asistentes,
      comentarios: this.comentar,
      mostrarComentar: []
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
      if (cadena !== null) {
        var separar = cadena.split('T')
        var fecha = separar[0].split('-')
        return fecha[2] + '-' + fecha[1] + '-' + fecha[0]
      } else {
        return ''
      }
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
    crearMostrarComentar: function () {
      for (var i = 0; i < this.listaItems.length; i++) {
        this.mostrarComentar.push(false)
      }
    },
    abrirComentario: function (index) {
      this.mostrarComentar[index] = true
    },
    cerrarComentario: function (index) {
      this.mostrarComentar[index] = false
    }
  },
  mounted () {
    this.crearMostrarComentar()
  }
}
</script>
