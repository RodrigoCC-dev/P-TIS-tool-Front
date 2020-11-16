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
        </tr>
      </thead>
      <tbody>
        <tr class="is-vcentered" v-for="item in listaOrdenada" :key="item.id">
          <th>{{ item.correlativo }}</th>
          <td>{{ item.tipo }}</td>
          <td class="has-text-left">{{ item.descripcion }}</td>
          <td>{{ fechaItem(item.fecha) }}</td>
          <td>{{ obtenerIniciales(item.responsables) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['lista', 'asistentes'],
  data () {
    return {
      listaItems: this.lista,
      asistencia: this.asistentes
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
    }
  }
}
</script>
