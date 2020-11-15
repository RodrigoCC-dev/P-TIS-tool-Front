<template>
  <div>

    <div class="columns">
      <div class="column is-full">
        <p class="title is-4 has-text-centered">MINUTA DE REUNIÓN</p>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Proyecto:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-static" type="text" :value="grupo.proyecto">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label-2c is-normal">
        <label class="label">Grupo:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="text" :value="grupo.correlativo">
          </p>
        </div>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">N° de reunión:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="text" :value="bitacora.minuta.correlativo">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label-2c is-normal">
        <label class="label">Revisión:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="text" :value="bitacora.revision">
          </p>
        </div>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">Fecha de la reunión:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="text" :value="bitacora.minuta.fecha_reunion">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label-2c is-normal">
        <label class="label">Hora de inicio:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="text" :value="bitacora.minuta.h_inicio">
          </p>
        </div>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">Hora de término:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input has-text-centered is-static" type="text" :value="bitacora.minuta.h_termino">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Tema:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-static" type="text" :value="bitacora.minuta.tema">
          </p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-11 is-offset-1">
        <br>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Participantes</th>
              <th></th>
              <th class="has-text-centered">Iniciales</th>
              <th class="has-text-centered">Asistencia</th>
            </tr>
          </thead>
          <tbody class="has-text-centered">
            <tr v-for="estudiante in grupo.estudiantes" :key="estudiante.id">
              <td class="has-text-left has-text-info has-text-wight-semibold">{{ nombreCompleto(estudiante) }}</td>
              <td></td>
              <td>{{ estudiante.iniciales_est }}</td>
              <td>{{ asistenciaEstudiante(estudiante.iniciales_est) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="columns">
      <div class="column is-full">
        <p class="title is-5 has-text-centered">CLASIFICACIÓN</p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth is-offset-1">
        <div class="tags has-addons">
          <span class="tag">Informativa</span>
          <span class="tag" :class="bitacora.minuta.clasificacion.informativa ? 'is-info' : 'is-danger is-light'">{{ bitacora.minuta.clasificacion.informativa ? 'Si' : 'No'}}</span>
        </div>
      </div>
      <div class="column">
        <div class="tags has-addons">
          <span class="tag">Control de Avance</span>
          <span class="tag" :class="bitacora.minuta.clasificacion.avance ? 'is-info' : 'is-danger is-light'">{{ bitacora.minuta.clasificacion.avance ? 'Si' : 'No' }}</span>
        </div>
      </div>
      <div class="column">
        <div class="tags has-addons">
          <span class="tag">Coordinación</span>
          <span class="tag" :class="bitacora.minuta.clasificacion.coordinacion ? 'is-info' : 'is-danger is-light'">{{ bitacora.minuta.clasificacion.coordinacion ? 'Si' : 'No' }}</span>
        </div>
      </div>
      <div class="column">
        <div class="tags has-addons">
          <span class="tag">Decisión</span>
          <span class="tag" :class="bitacora.minuta.clasificacion.decision ? 'is-info' : 'is-danger is-light'">{{ bitacora.minuta.clasificacion.decision ? 'Si' : 'No'}}</span>
        </div>
      </div>
      <div class="column">
        <div class="tags has-addons">
          <span class="tag">Otros</span>
          <span class="tag" :class="bitacora.minuta.clasificacion.otro ? 'is-info' : 'is-danger is-light'">{{ bitacora.minuta.clasificacion.otro ? 'Si' : 'No'}}</span>
        </div>
      </div>
    </div>
    <br>

  </div>
</template>

<script>
export default {
  name: 'Informacion',
  props: ['proyecto', 'minuta'],
  data () {
    return {
      grupo: this.proyecto,
      bitacora: this.minuta
    }
  },
  methods: {
    nombreCompleto: function (estudiante) {
      return estudiante.nombre_est + ' ' + estudiante.apellido1 + ' ' + estudiante.apellido2
    },
    asistenciaEstudiante: function (iniciales) {
      for (var i = 0; i < this.bitacora.minuta.asistencia.length; i++) {
        if (this.bitacora.minuta.asistencia[i].iniciales === iniciales) {
          return this.bitacora.minuta.asistencia[i].descripcion
        }
      }
    }
  },
  mounted () {
    console.log(this.grupo)
    console.log(this.bitacora)
  }
}
</script>
