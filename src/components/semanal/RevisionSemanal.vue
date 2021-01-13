<template>
  <div>

    <br>
    <InfoAvance :grupo="grupoSeleccionado" :minuta="bitacora"/>
    <br>

    <div v-for="estudiante in grupoSeleccionado.estudiantes" :key="estudiante.id">
      <VisorEstudiante :est="estudiante" :logros="logrosPorEstudiante(estudiante.id)" :metas="metasPorEstudiante(estudiante.id)"/>
      <br>
    </div>

  </div>
</template>

<script>
import InfoAvance from '@/components/semanal/InfoAvance.vue'
import VisorEstudiante from '@/components/semanal/VisorEstudiante.vue'

export default {
  name: 'RevisionSemanal',
  components: {
    InfoAvance,
    VisorEstudiante
  },
  props: ['grupo', 'minuta'],
  data () {
    return {
      grupoSeleccionado: this.grupo,
      bitacora: this.minuta,
      itemsLogros: [],
      itemsMetas: []
    }
  },
  computed: {
    mostrarBitacora: function () {
      return Object.keys(this.bitacora).length > 0
    }
  },
  methods: {
    separarItems: function (listaItems) {
      for (var i = 0; i < listaItems.length; i++) {
        if (listaItems[i].tipo_item.tipo === 'Logro') {
          this.itemsLogros.push(listaItems[i])
        } else if (listaItems[i].tipo_item.tipo === 'Meta') {
          this.itemsMetas.push(listaItems[i])
        }
      }
    },
    buscarIdAsistencia: function (idEstudiante) {
      if (this.mostrarBitacora) {
        for (var i = 0; i < this.bitacora.minuta.asistencia.length; i++) {
          if (this.bitacora.minuta.asistencia[i].id_estudiante === idEstudiante) {
            return this.bitacora.minuta.asistencia[i].id
          }
        }
      }
    },
    separarPorEstudiante: function (listaFuente, idEstudiante) {
      var lista = []
      const idAsistencia = this.buscarIdAsistencia(idEstudiante)
      for (var i = 0; i < listaFuente.length; i++) {
        if (listaFuente[i].responsables.asistencia_id === idAsistencia) {
          lista.push(listaFuente[i])
        }
      }
      return lista
    },
    logrosPorEstudiante: function (idEstudiante) {
      return this.separarPorEstudiante(this.itemsLogros, idEstudiante)
    },
    metasPorEstudiante: function (idEstudiante) {
      return this.separarPorEstudiante(this.itemsMetas, idEstudiante)
    }
  },
  mounted () {
    if (this.mostrarBitacora) {
      this.separarItems(this.bitacora.minuta.items)
    }
  }
}
</script>
