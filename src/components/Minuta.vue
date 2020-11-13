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
            <input v-model="revision" class="input has-text-centered" type="text" v-on:input="validarRevision">
          </div>
          <p class="is-danger help" v-if="entradas.revision.error">{{ entradas.revision.mensaje }}</p>
        </div>
        <div class="field-label-2c">
          <label class="label">Fecha de la reunión:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <input class="input has-text-centered" v-model="minuta.fecha_reunion" type="date" v-on:input="validarFecha">
          </div>
          <p class="is-danger help" v-if="entradas.fecha_reunion">No se ha ingresado fecha de la reunión</p>
        </div>
      </div>
      <div class="field is-horizontal is-grouped">
        <div class="field-label-2c">
          <label class="label">Hora de inicio:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-normal has-text-centered" v-model="minuta.h_inicio" type="time" v-on:input="validarHinicio">
            </p>
          </div>
          <p class="is-danger help" v-if="entradas.h_inicio">No se ha ingresado la hora de inicio</p>
        </div>
        <div class="field-label-2c">
          <label class="label">Hora de termino:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-normal has-text-centered" v-model="minuta.h_termino" type="time" @input="validarHtermino">
            </p>
          </div>
          <p class="is-danger help" v-if="entradas.h_termino">No se ha ingresado la hora de término</p>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Tema:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input" v-model="tema" type="text" @input="validarTema">
            </p>
          </div>
        </div>
        <p class="is-danger help" v-if="entradas.tema">No se ha ingresado el tema de la reunión</p>
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
            <tbody>
              <tr v-for="(estudiante, index) in grupo.estudiantes" :key="estudiante.id">
                <td class="has-text-info has-text-weight-semibold">{{ nombreCompleto(estudiante) }}</td>
                <td></td>
                <td class="has-text-centered">{{ estudiante.iniciales }}</td>
                <td class="has-text-centered">
                  <div class="select control is-small is-expanded">
                    <select v-model="asistencia[index]" @change="limpiarAsistencias">
                      <option class="is-fullwidth" v-for="asistencia in tipo_asistencias" :key="asistencia.id" :value="{ 'estudiante': estudiante.id, 'asistencia': asistencia.id}">{{ asistencia.descripcion }}</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="is-danger help" v-if="entradas.asistencias">No se han ingresado todas las asistencias a esta reunión</p>
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
              <input type="checkbox" v-model="listaClasificacion" value="informativa" @change="limpiarClasificacion">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Control de Avance</p>
            <div class="control">
              <input type="checkbox" v-model="listaClasificacion" value="avance" @change="limpiarClasificacion">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Coordinación</p>
            <div class="control">
              <input type="checkbox" v-model="listaClasificacion" value="coordinacion" @change="limpiarClasificacion">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Decisión</p>
            <div class="control">
              <input type="checkbox" v-model="listaClasificacion" value="decision" @change="limpiarClasificacion">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Otros</p>
            <div class="control">
              <input type="checkbox" v-model="listaClasificacion" value="otro" @change="limpiarClasificacion">
            </div>
          </div>
        </div>
      </div>
      <div class="columns" v-if="entradas.clasificacion">
        <div class="column is-4 is-offset-4">
          <p class="is-danger help has-text-centered">No se ha ingresado la clasificación de la reunión</p>
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
                    <input v-model="objetivos[index]" class="input" type="text" @input="validarObjetivos">
                  </p>
                  <p class="control">
                    <a class="button is-danger is-light" @click="removerObjetivo(objetivo)"><strong>X</strong></a>
                  </p>
                </div>
              </li>
            </dl>
            <p class="is-danger help" v-if="entradas.objetivos">No se han llenado todos los objetivos</p>
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
                    <input v-model="conclusiones[index]" class="input" type="text" @input="validarConclusiones">
                  </p>
                  <p class="control">
                    <a class="button is-danger is-light" @click="removerConclusion(conclusion)"><strong>X</strong></a>
                  </p>
                </div>
              </li>
            </dl>
            <p class="is-danger help" v-if="entradas.conclusiones">No se han ingresado todas las conclusiones</p>
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
              <td class="has-text-centered">
                <div class="select is-small">
                  <select v-model="item.tipo_item_id" @change="validarItem(index)">
                    <option v-for="item in tipo_items" :key="item.id" :value="item.id">{{ item.tipo }}</option>
                  </select>
                </div>
                <p class="is-danger help" v-if="item.entradas.tipo_item">No se ha ingresado el tipo de ítem</p>
              </td>
              <td>
                <textarea class="textarea is-small is-extend" v-model="item.descripcion" @input="validarItem(index)"></textarea>
                <p class="is-danger help" v-if="item.entradas.descripcion">No se ha ingresado la descripción del ítem</p>
              </td>
              <td>
                <input class="input is-small has-text-centered" type="date" v-model="item.fecha" @input="validarItem(index)">
                <p class="is-danger help" v-if="item.entradas.fecha">No se ha ingresado la fecha</p>
              </td>
              <td class="has-text-centered">
                <div class="select is-small">
                  <select v-model="item.responsables" @change="validarItem(index)">
                    <option selected>- Sin Asig -</option>
                    <option v-for="integrante in grupo.estudiantes" :key="integrante.id" :value="integrante.id">{{ integrante.iniciales }}</option>
                  </select>
                </div>
                <p class="is-danger help" v-if="item.entradas.responsables">Falta asignar responsable</p>
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
              <a class="button is-dark" @click="cancelarEnvio">Cancelar</a>
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
        tipo_minuta_id: this.tipoMinuta
      },
      clasificacion: {
        informativa: false,
        avance: false,
        coordinacion: false,
        decision: false,
        otro: false
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
        responsables: 0,
        entradas: {
          descripcion: false,
          fecha: false,
          tipo_item: false,
          responsables: false
        }
      },
      motivo_id: 1,
      listaItems: [
        {
          correlativo: 1,
          descripcion: '',
          fecha: '',
          tipo_item_id: 0,
          responsables: 0,
          entradas: {
            descripcion: false,
            fecha: false,
            tipo_item: false,
            responsables: false
          }
        }
      ],
      tipo_items: [],
      tipo_asistencias: [],
      tipo_estados: [],
      motivos: [],
      listaClasificacion: [],
      estudiante: {},
      grupo: {},
      semestre: {},
      entradas: {
        revision: {
          error: false,
          mensaje: ''
        },
        fecha_reunion: false,
        tema: false,
        h_inicio: false,
        h_termino: false,
        asistencias: false,
        clasificacion: false,
        objetivos: false,
        conclusiones: false
      }
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
    limpiarCampos: function () {
      this.minuta = {
        estudiante_id: 0,
        codigo: '',
        correlativo: 0,
        fecha_reunion: '',
        h_inicio: '',
        h_termino: '',
        tipo_minuta_id: this.tipoMinuta
      }
      this.clasificacion = {
        informativa: false,
        avance: false,
        coordinacion: false,
        decision: false,
        otro: false
      }
      this.tema = ''
      this.revision = ''
      this.asistencia = []
      this.objetivos = ['']
      this.conclusiones = ['']
      this.motivo_id = 1
      this.listaItems = [
        {
          correlativo: 1,
          descripcion: '',
          fecha: '',
          tipo_item_id: 0,
          responsables: 0,
          entradas: {
            descripcion: false,
            fecha: false,
            tipo_item: false,
            responsables: false
          }
        }
      ]
    },
    async obtenerTiposItem () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_items', { headers: Auth.authHeader() })
        this.tipo_items = response.data
      } catch {
        console.log('No fue posible obtener los tipos de items')
      }
    },
    async obtenerTiposAsistencia () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_asistencias', { headers: Auth.authHeader() })
        this.tipo_asistencias = response.data
      } catch {
        console.log('No fue posible obtener los tipos de asistencia')
      }
    },
    async obtenerTiposEstado () {
      try {
        const response = await axios.get(this.apiUrl + '/tipo_estados', { headers: Auth.authHeader() })
        this.tipo_estados = response.data
      } catch {
        console.log('No fue posible obtener los tipos de estados')
      }
    },
    async obtenerMotivos () {
      try {
        const response = await axios.get(this.apiUrl + '/motivos', { headers: Auth.authHeader() })
        this.motivos = response.data
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
      for (var i = 0; i < this.listaClasificacion.length; i++) {
        if (this.listaClasificacion[i] === 'informativa') {
          this.clasificacion.informativa = true
        } else if (this.listaClasificacion[i] === 'avance') {
          this.clasificacion.avance = true
        } else if (this.listaClasificacion[i] === 'decision') {
          this.clasificacion.decision = true
        } else if (this.listaClasificacion[i] === 'coordinacion') {
          this.clasificacion.coordinacion = true
        } else if (this.listaClasificacion[i] === 'otro') {
          this.clasificacion.otro = true
        }
      }
    },
    establecerCodigo: function () {
      var codigo = 'MINUTA_'
      var correlativo = ''
      if (this.minuta.correlativo < 10) {
        correlativo = '0' + this.minuta.correlativo
      } else {
        correlativo = this.minuta.correlativo
      }
      var semestre = this.semestre.agno + '-' + this.semestre.numero
      var fecha = this.minuta.fecha_reunion.split('-')
      codigo += this.grupo.nombre + '_' + correlativo + '_' + semestre + '_' + fecha[1] + fecha[2]
      return codigo
    },
    async enviarMinuta (estado) {
      if (this.validarFormulario()) {
        this.establecerId()
        this.establecerClasificacion()
        const lista = []
        for (var i = 0; i < this.listaItems.length; i++) {
          var listaResp = []
          if (this.listaItems[i].responsables.length === undefined) {
            listaResp.push(this.listaItems[i].responsables)
          } else {
            listaResp = this.listaItems[i].responsables
          }
          var item = {
            correlativo: this.listaItems[i].correlativo,
            descripcion: this.listaItems[i].descripcion,
            fecha: this.listaItems[i].fecha,
            tipo_item_id: this.listaItems[i].tipo_item_id,
            responsables: listaResp
          }
          lista.push(item)
        }
        const nuevaMinuta = {
          minuta: {
            estudiante_id: this.minuta.estudiante_id,
            codigo: this.establecerCodigo(),
            correlativo: this.minuta.correlativo,
            fecha_reunion: this.minuta.fecha_reunion,
            h_inicio: this.minuta.h_inicio,
            h_termino: this.minuta.h_termino,
            tipo_minuta_id: this.minuta.tipo_minuta_id
          },
          clasificacion: this.clasificacion,
          tema: this.tema,
          objetivos: this.objetivos,
          conclusiones: this.conclusiones,
          items: lista,
          bitacora_revision: {
            revision: this.revision,
            motivo_id: this.motivo_id
          },
          asistencia: this.asistencia,
          tipo_estado: this.buscarIdEstado(this.tipo_estados, estado)
        }
        try {
          await axios.post(this.apiUrl + '/minutas', nuevaMinuta, { headers: Auth.postHeader() })
          this.$emit('cerrar')
          this.limpiarCampos()
        } catch {
          if (estado === 'BOR') {
            console.log('No se pudo guardar la minuta')
          } else {
            console.log('No se pudo emitir la minuta')
          }
        }
      }
    },
    guardarMinuta: function () {
      this.enviarMinuta('BOR')
    },
    emitirMinuta: function () {
      this.enviarMinuta('EMI')
    },
    cancelarEnvio: function () {
      this.$emit('cerrar')
      this.limpiarCampos()
    },
    validarRevision: function () {
      const regExp = /^([A-Z0-9]{1})$/
      const revision = this.revision
      if (revision === '' || revision === undefined) {
        this.entradas.revision.error = true
        this.entradas.revision.mensaje = 'No se ha ingresado la revisión de la minuta'
        return false
      } else if (!regExp.test(revision)) {
        this.entradas.revision.error = true
        this.entradas.revision.mensaje = 'Sólo letras mayúsculas o números'
        return false
      } else {
        this.entradas.revision.error = false
        this.entradas.revision.mensaje = ''
        return true
      }
    },
    validarFecha: function () {
      const regExp = /^(\d{4})-(\d{2})-(\d{2})$/
      const fecha = this.minuta.fecha_reunion
      if (fecha === '' || fecha === undefined || !regExp.test(fecha)) {
        this.entradas.fecha_reunion = true
        return false
      } else {
        this.entradas.fecha_reunion = false
        return true
      }
    },
    validarHora: function (hora) {
      const regExp = /^(\d{2}):(\d{2})$/
      if (regExp.test(hora)) {
        return true
      } else {
        return false
      }
    },
    validarHinicio: function () {
      const validacion = this.validarHora(this.minuta.h_inicio)
      if (validacion) {
        this.entradas.h_inicio = false
        return true
      } else {
        this.entradas.h_inicio = true
        return false
      }
    },
    validarHtermino: function () {
      const validacion = this.validarHora(this.minuta.h_termino)
      if (validacion) {
        this.entradas.h_termino = false
        return true
      } else {
        this.entradas.h_termino = true
        return false
      }
    },
    validarTema: function () {
      if (this.tema === '') {
        this.entradas.tema = true
        return false
      } else {
        this.entradas.tema = false
        return true
      }
    },
    limpiarAsistencias: function () {
      this.entradas.asistencias = false
    },
    validarAsistencia: function () {
      if (this.asistencia.length < this.grupo.estudiantes.length) {
        this.entradas.asistencias = true
        return false
      } else {
        this.entradas.asistencias = false
        return true
      }
    },
    limpiarClasificacion: function () {
      this.entradas.clasificacion = false
    },
    validarClasificacion: function () {
      if (this.listaClasificacion.length === 0) {
        this.entradas.clasificacion = true
        return false
      } else {
        this.entradas.clasificacion = false
        return true
      }
    },
    validarObjetivos: function () {
      if (this.objetivos.length === 1) {
        if (this.objetivos[0] === '') {
          this.entradas.objetivos = true
          return false
        } else {
          this.entradas.objetivos = false
          return true
        }
      } else {
        var validar = true
        for (var i = 0; i < this.objetivos.length; i++) {
          if (this.objetivos[i] === '') {
            validar = false
            this.entradas.objetivos = true
          }
        }
        return validar
      }
    },
    validarConclusiones: function () {
      if (this.conclusiones.length === 1) {
        if (this.conclusiones[0] === '') {
          this.entradas.conclusiones = true
          return false
        } else {
          this.entradas.conclusiones = false
          return true
        }
      } else {
        var validar = true
        for (var i = 0; i < this.conclusiones.length; i++) {
          if (this.conclusiones[i] === '') {
            validar = false
            this.entradas.conclusiones = true
          }
        }
        return validar
      }
    },
    obtenerIdTipoItem: function (tipo) {
      for (var i = 0; i < this.tipo_items.length; i++) {
        if (this.tipo_items[i].tipo === tipo) {
          return this.tipo_items[i].id
        }
      }
    },
    validarItem: function (index) {
      var validacion = true
      if (this.listaItems[index].descripcion === '' || this.listaItems[index].descripcion === undefined) {
        this.listaItems[index].entradas.descripcion = true
        validacion = validacion && false
      } else {
        this.listaItems[index].entradas.descripcion = false
      }
      if (this.listaItems[index].tipo_item_id === 0) {
        this.listaItems[index].entradas.tipo_item = true
        validacion = validacion && false
      } else if (this.listaItems[index].tipo_item_id === this.obtenerIdTipoItem('Agenda') || this.listaItems[index].tipo_item_id === this.obtenerIdTipoItem('Por hacer') || this.listaItems[index].tipo_item_id === this.obtenerIdTipoItem('Compromiso')) {
        this.listaItems[index].entradas.tipo_item = false
        if (this.listaItems[index].fecha === '') {
          this.listaItems[index].entradas.fecha = true
          validacion = validacion && false
        } else {
          this.listaItems[index].entradas.fecha = false
        }
      } else if (this.listaItems[index].tipo_item_id === this.obtenerIdTipoItem('Hecho') || this.listaItems[index].tipo_item_id === this.obtenerIdTipoItem('Idea') || this.listaItems[index].tipo_item_id === this.obtenerIdTipoItem('Compromiso')) {
        this.listaItems[index].entradas.tipo_item = false
        if (this.listaItems[index].responsables === 0) {
          this.listaItems[index].entradas.responsables = true
          validacion = validacion && false
        } else {
          this.listaItems[index].entradas.responsables = false
        }
      } else {
        this.listaItems[index].entradas.tipo_item = false
      }
      return validacion
    },
    validarListaItems: function () {
      const items = this.listaItems
      var validacion = true
      for (var i = 0; i < items.length; i++) {
        validacion = validacion && this.validarItem(i)
      }
      return validacion
    },
    validarFormulario: function () {
      var validacion = true
      validacion = validacion && this.validarRevision()
      validacion = validacion && this.validarFecha()
      validacion = validacion && this.validarHinicio()
      validacion = validacion && this.validarHtermino()
      validacion = validacion && this.validarTema()
      validacion = validacion && this.validarAsistencia()
      validacion = validacion && this.validarClasificacion()
      validacion = validacion && this.validarObjetivos()
      validacion = validacion && this.validarConclusiones()
      validacion = validacion && this.validarListaItems()
      return validacion
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
