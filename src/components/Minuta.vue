<template>
  <div>

      <div class="columns">
        <div class="column is-full">
          <p class="title is-4 has-text-centered">MINUTA DE REUNIÓN</p>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Proyecto:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input v-model="grupo.proyecto" class="input" type="text" disabled>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label-2c">
          <label class="label">Grupo:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input v-model="grupo.correlativo" class="input has-text-centered" type="text" disabled>
            </p>
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">N° de reunión:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input v-model="minuta.correlativo" class="input has-text-centered" type="text" disabled>
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label-2c">
          <label class="label">Revisión:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <input v-model="revision" class="input has-text-centered" type="text">
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">Fecha de la reunión:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <input class="input has-text-centered" v-model="minuta.fecha_reunion" type="date">
          </div>
        </div>
      </div>
      <div class="field is-horizontal is-grouped">
        <div class="field-label-2c">
          <label class="label">Hora de inicio:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-normal has-text-centered" v-model="minuta.h_inicio" type="time">
            </p>
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">Hora de termino:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-normal has-text-centered" v-model="minuta.h_termino" type="time">
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Tema:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input" v-model="tema" type="text">
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-two-thirds is-offset-1 has-text-left">
          <div class="field">
            <label class="label">Participantes:</label>
          </div>
          <p class="has-text-info has-text-weight-semibold" v-for="estudiante in grupo.estudiantes" :key="estudiante.id">{{ nombreCompleto(estudiante) }}</p>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Iniciales:</label>
          </div>
          <p v-for="estudiante in grupo.estudiantes" :key="estudiante.id">{{ estudiante.iniciales }}</p>
        </div>
        <div class="column">
          <div class="field">
            <label class="label"><abbr title="ACA: Ausente con aviso">Asistencia:</abbr></label>
            <div v-for="(estudiante, index) in grupo.estudiantes" :key="estudiante.id">
              <div class="select control is-small">
                <select v-model="asistencia[index]">
                  <option v-for="asistencia in tipo_asistencias" :key="asistencia.id" :value="{ 'estudiante': estudiante.id, 'asistencia': asistencia.id }">{{ asistencia.tipo }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <p class="title is-5 has-text-centered">CLASIFICACIÓN</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth is-offset-1">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Informativa</p>
            <div class="control">
              <input type="checkbox" v-model="clasificacion" value="informativa">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Control de Avance</p>
            <div class="control">
              <input type="checkbox" v-model="clasificacion" value="avance">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Coordinación</p>
            <div class="control">
              <input type="checkbox" v-model="clasificacion" value="coordinacion">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Decisión</p>
            <div class="control">
              <input type="checkbox" v-model="clasificacion" value="decision">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Otros</p>
            <div class="control">
              <input type="checkbox" v-model="clasificacion" value="otro">
            </div>
          </div>
        </div>
      </div>

      <br>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <p class="title is-5 has-text-centered">Agenda / Objetivos</p>
        </div>
        <div class="column">
          <div class="columns">
            <div class="column is-2 is-offset-3">
              <a class="button is-small is-success" @click="agregarObjetivo"><strong>+</strong></a>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="content has-text-left">
            <dl>
              <li v-for="(objetivo, index) in objetivos" :key="index">
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input v-model="objetivos[index]" class="input" type="text">
                  </p>
                  <p class="control">
                    <a class="button is-danger is-light" @click="removerObjetivo(objetivo)"><strong>X</strong></a>
                  </p>
                </div>
              </li>
            </dl>
          </div>
        </div>
      </div>

      <br>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <p class="title is-5 has-text-centered">Resultados / Conclusiones</p>
        </div>
        <div class="column">
          <div class="columns">
            <div class="column is-2 is-offset-3">
              <a class="button is-small is-success" @click="agregarConclusion"><strong>+</strong></a>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="content has-text-left">
            <dl>
              <li v-for="(conclusion, index) in conclusiones" :key="index">
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input v-model="conclusiones[index]" class="input" type="text">
                  </p>
                  <p class="control">
                    <a class="button is-danger is-light" @click="removerConclusion(conclusion)"><strong>X</strong></a>
                  </p>
                </div>
              </li>
            </dl>
          </div>
        </div>
      </div>

      <div>
        <br>
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th class="is-narrow has-text-centered">N°</th>
              <th class="has-text-centered"><abbr title="Tipo de actividad">Item</abbr></th>
              <th class="has-text-centered"><abbr title="Descripción de la actividad realizada">Descripción</abbr></th>
              <th class="has-text-centered"><abbr title="Fecha comprometida para la actividad">Fecha</abbr></th>
              <th class="has-text-centered"><abbr title="Responsable de realizarla">Responsable</abbr></th>
              <th><a class="button is-success is-small" @click="agregarItem"><strong>+</strong></a></th>
            </tr>
          </thead>
          <tbody>
            <tr class="is-vcentered" v-for="(item, index) in listaItems" :key="index">
              <th>{{ index + 1 }}</th>
              <td>
                <div class="select is-small">
                  <select v-model="item.tipo_item_id">
                    <option v-for="item in tipo_items" :key="item.id" :value="item.id">{{ item.tipo }}</option>
                  </select>
                </div>
              </td>
              <td><textarea class="textarea is-small is-extend" v-model="item.descripcion"></textarea></td>
              <td><input class="input is-small has-text-centered" type="date" v-model="item.fecha"></td>
              <td>
                <div class="select is-small">
                  <select v-model="item.responsables">
                    <option value="0" selected="true">- Sin Asig -</option>
                    <option v-for="integrante in grupo.estudiantes" :key="integrante.id" :value="integrante.id">{{ integrante.iniciales }}</option>
                  </select>
                </div>
              </td>
              <td><a class="button is-small is-danger is-light" @click="removerItem(item)"><strong>X</strong></a></td>
            </tr>
          </tbody>
        </table>
        <br>
      </div>

      <div class="columns">
        <div class="column is-half is-offset-3">
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <a class="button is-success" @click="guardarMinuta" disabled>Guardar</a>
            </div>
            <div class="control">
              <a class="button is-link" @click="emitirMinuta">Emitir</a>
            </div>
            <div class="control">
              <a class="button is-dark">Cancelar</a>
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
  name: 'Minuta',
  props: ['tipoMinuta', 'idMinuta'],
  data () {
    return {
      minuta: {
        estudiante_id: 0,
        codigo: '',
        correlativo: 0,
        fecha_reunion: '',
        h_inicio: '',
        h_termino: '',
        clasificacion: {
          informativa: false,
          avance: false,
          coordinacion: false,
          decision: false,
          otro: false
        },
        tipo_minuta_id: this.tipoMinuta
      },
      tema: '',
      revision: '',
      asistencia: [],
      objetivos: [''],
      conclusiones: [''],
      item: {
        correlativo: 0,
        descripcion: '',
        fecha: '',
        tipo_item_id: 0,
        responsables: 0
      },
      motivo_id: 1,
      listaItems: [
        {
          correlativo: 1,
          descripcion: '',
          fecha: '',
          tipo_item_id: 0,
          responsables: 0
        }
      ],
      tipo_items: [],
      tipo_asistencias: [],
      tipo_estados: [],
      motivos: [],
      clasificacion: [],
      estudiante: {},
      grupo: {},
      semestre: {}
    }
  },
  computed: {
    ...mapState(['apiUrl', 'usuario'])

  },
  methods: {
    removeFromArray: function (arr, item) {
      var i = arr.indexOf(item)
      i !== -1 && arr.splice(i, 1)
    },
    nombreCompleto (estudiante) {
      return estudiante.nombre + ' ' + estudiante.apellido_paterno + ' ' + estudiante.apellido_materno
    },
    buscarIdEstado: function (array, busqueda) {
      var id = 0
      for (var i = 0; i < array.length; i++) {
        if (array[i].abreviacion === busqueda) {
          id = array[i].id
        }
      }
      return id
    },
    agregarItem: function () {
      var nuevoItem = Object.assign({}, this.item)
      const anterior = this.listaItems[this.listaItems.length - 1].correlativo
      nuevoItem.correlativo = anterior + 1
      this.listaItems.push(nuevoItem)
    },
    removerItem: function (item) {
      if (this.listaItems.length > 1) {
        this.removeFromArray(this.listaItems, item)
      }
    },
    agregarObjetivo: function () {
      this.objetivos.push('')
    },
    removerObjetivo: function (objetivo) {
      if (this.objetivos.length > 1) {
        this.removeFromArray(this.objetivos, objetivo)
      }
    },
    agregarConclusion: function () {
      this.conclusiones.push('')
    },
    removerConclusion: function (conclusion) {
      if (this.conclusiones.length > 1) {
        this.removeFromArray(this.conclusiones, conclusion)
      }
    },
    async obtenerTiposItem () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_items', { headers: Auth.authHeader() })
        this.tipo_items = response.data
        console.log(this.tipo_items)
      } catch {
        console.log('No fue posible obtener los tipos de items')
      }
    },
    async obtenerTiposAsistencia () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_asistencias', { headers: Auth.authHeader() })
        this.tipo_asistencias = response.data
        console.log(this.tipo_asistencias)
      } catch {
        console.log('No fue posible obtener los tipos de asistencia')
      }
    },
    async obtenerTiposEstado () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_estados', { headers: Auth.authHeader() })
        this.tipo_estados = response.data
        console.log(this.tipo_estados)
      } catch {
        console.log('No fue posible obtener los tipos de estados')
      }
    },
    async obtenerMotivos () {
      try {
        const response = await axios.get(this.apiUrl + '/motivos', { headers: Auth.authHeader() })
        this.motivos = response.data
        console.log(this.motivos)
      } catch {
        console.log('No fue posible obtener los motivos de emisión')
      }
    },
    async obtenerInfoEstudiante () {
      try {
        const response = await axios.get(this.apiUrl + '/estudiantes/' + this.usuario.id, { headers: Auth.authHeader() })
        this.estudiante = response.data
        try {
          const respuesta = await axios.get(this.apiUrl + '/grupos/' + this.estudiante.grupo_id, { headers: Auth.authHeader() })
          this.grupo = respuesta.data
          this.obtenerCorrelativo()
        } catch {
          console.log('No fue posible obtener la información del grupo del estudiante')
        }
      } catch {
        console.log('No fue posible obtener la información del estudiante')
      }
    },
    async obtenerSemestre () {
      try {
        const response = await axios.get(this.apiUrl + '/semestres', { headers: Auth.authHeader() })
        this.semestre = response.data
      } catch {
        console.log('No se obtuvo la información del semestre')
      }
    },
    async obtenerCorrelativo () {
      try {
        if (this.idMinuta === '') {
          const response = await axios.get(this.apiUrl + '/minutas/correlativo/' + this.grupo.id.toString(), { headers: Auth.authHeader() })
          this.minuta.correlativo = response.data
        } else {
          console.log(this.idMinuta)
        }
      } catch (e) {
        console.log('No fue posible obtener el correlativo')
      }
    },
    establecerId: function () {
      this.minuta.estudiante_id = this.estudiante.id
    },
    establecerClasificacion: function () {
      for (var i = 0; i < this.clasificacion.length; i++) {
        if (this.clasificacion[i] === 'informativa') {
          this.minuta.clasificacion.informativa = true
        } else if (this.clasificacion[i] === 'avance') {
          this.minuta.clasificacion.avance = true
        } else if (this.clasificacion[i] === 'decision') {
          this.minuta.clasificacion.decision = true
        } else if (this.clasificacion[i] === 'coordinacion') {
          this.minuta.clasificacion.coordinacion = true
        } else if (this.clasificacion[i] === 'otro') {
          this.minuta.clasificacion.otro = true
        }
      }
    },
    establecerCodigo: function () {
      var codigo = 'MINUTA'
      var correlativo = ''
      if (this.minuta.correlativo < 10) {
        correlativo = '0' + this.minuta.correlativo
      } else {
        correlativo = this.minuta.correlativo
      }
      var semestre = this.semestre.agno + '-' + this.semestre.numero
      var fecha = this.minuta.fecha_reunion.split('-')
      codigo += '_' + this.grupo.nombre + '_' + correlativo + '_' + semestre + '_' + fecha[2] + fecha[1] + '_' + this.revision
      return codigo
    },
    async enviarMinuta (estado) {
      this.establecerId()
      this.establecerClasificacion()
      const nuevaMinuta = {
        minuta: {
          estudiante_id: this.minuta.estudiante_id,
          codigo: this.establecerCodigo(),
          correlativo: this.minuta.correlativo,
          fecha_reunion: this.minuta.fecha_reunion,
          h_inicio: this.minuta.h_inicio,
          h_termino: this.minuta.h_termino,
          tipo_minuta_id: this.minuta.tipo_minuta_id,
          clasificacion_attributes: this.minuta.clasificacion
        },
        tema: this.tema,
        objetivos: this.objetivos,
        conclusiones: this.conclusiones,
        items: this.listaItems,
        bitacora_revision: {
          revision: this.revision,
          motivo_id: this.motivo_id
        },
        asistencia: this.asistencia,
        tipo_estado: this.buscarIdEstado(this.tipo_estados, estado)
      }
      try {
        await axios.post(this.apiUrl + '/minutas', nuevaMinuta, { headers: Auth.postHeader() })
        console.log(true)
      } catch {
        console.log('No se pudo emitir la minuta')
      }
    },
    guardarMinuta: function () {
      this.enviarMinuta('BOR')
    },
    emitirMinuta: function () {
      this.enviarMinuta('EMI')
    }
  },
  mounted () {
    this.obtenerTiposItem()
    this.obtenerTiposAsistencia()
    this.obtenerTiposEstado()
    this.obtenerMotivos()
    this.obtenerInfoEstudiante()
    this.obtenerSemestre()
  }
}
</script>
