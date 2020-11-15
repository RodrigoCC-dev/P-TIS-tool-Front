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
        <tr class="is-vcentered" v-for="item in listaItems" :key="item.id">
          <th>{{ item.correlativo }}</th>
          <td>{{ item.tipo }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ fechaItem(item.fecha) }}</td>
          <td>{{ item.responsables }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['lista'],
  data () {
    return {
      listaItems: this.lista
    }
  },
  methods: {
    fechaItem: function (cadena) {
      var separar = cadena.split('T')
      var fecha = separar[0].split('-')
      return fecha[2] + '-' + fecha[1] + '-' + fecha[0]
    }
  }
}
</script>
