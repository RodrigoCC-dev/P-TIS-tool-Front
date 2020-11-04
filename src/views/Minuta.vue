<template>
  <div>
    <Header/>

    <div class="container">

      <div class="columns">
        <div class="column is-full">
          <p class="title is-4">MINUTA DE REUNIÓN</p>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Proyecto:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input" type="text" disabled>
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
              <input class="input" type="text" disabled>
            </p>
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">N° de reunión:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input" type="text" disabled>
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
            <input class="input" type="text">
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">Fecha:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <input class="input" v-model="minuta.fecha_reunion" type="text">
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
              <input class="input is-normal" v-model="minuta.h_inicio" type="text">
            </p>
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">Hora de termino:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-normal" v-model="minuta.h_termino" type="text">
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
        <div class="column is-three-quarters is-offset-1 has-text-left">
          <div class="field">
            <label class="label">Participantes:</label>
          </div>
          <p class="has-text-info has-text-weight-semibold" v-for="estudiante in grupo.estudiantes" :key="estudiante.id">{{ estudiante }}</p>
          <p class="has-text-info has-text-weight-semibold">Juanito</p>
          <p class="has-text-info">Pepito</p>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Iniciales:</label>
          </div>
          <p>JPP</p>
          <p>PCQ</p>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <p class="title is-5">CLASIFICACIÓN</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-fifth">
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
              <input type="checkbox" v-model="clasificacion" value="coordinación">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">Decisión</p>
            <div class="control">
              <input type="checkbox" v-model="clasificacion" value="decisión">
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
          <p class="title is-5">Agenda / Objetivos</p>
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
              <li>Primer objetivo</li>
              <li>Segundo objetivo</li>
              <li>Tercer objetivo</li>
              <li>
                <input class="input" type="text">
              </li>
            </dl>
          </div>
        </div>
      </div>

      <br>
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <p class="title is-5">Resultados / Conclusiones</p>
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
              <li>Primer resultado</li>
              <li>Segundo resultado</li>
              <li>
                <input class="input" type="text">
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
              <th class="is-narrow">N°</th>
              <th><abbr title="Tipo de actividad">Item</abbr></th>
              <th><abbr title="Descripción de la actividad realizada">Descripción</abbr></th>
              <th><abbr title="Fecha comprometida para la actividad">Fecha</abbr></th>
              <th><abbr title="Responsable de realizarla">Responsable</abbr></th>
              <th><a class="button is-success is-small" @click="agregarItem"><strong>+</strong></a></th>
            </tr>
          </thead>
          <tbody>
            <tr class="is-vcentered">
              <th>1</th>
              <td>INFO</td>
              <td class="has-text-left">Se realizan el primer set de historias de usuario en Taiga.io</td>
              <td></td>
              <td></td>
            </tr>
            <tr class="is-vcentered" v-for="(item, index) in listaItems" :key="index">
              <th>{{ index + 1 }}</th>
              <td>
                <div class="select is-small">
                  <select v-model="item.tipo_item_id">
                    <option value="1">INFO</option>
                    <option value="2">COMP</option>
                    <option value="3">AGENDA</option>
                  </select>
                </div>
              </td>
              <td><textarea class="textarea is-small is-extend" v-model="item.descripcion"></textarea></td>
              <td><input class="input is-small has-text-centered" type="date" v-model="item.fecha"></td>
              <td>
                <div class="select is-small">
                  <select v-model="item.responsables">
                    <option value="0" selected>- Sin Asig -</option>
                    <option value="1">MCR</option>
                    <option value="2">PTR</option>
                    <option value="3">ITZ</option>
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
              <a class="button is-success">Guardar</a>
            </div>
            <div class="control">
              <a class="button is-link">Emitir</a>
            </div>
            <div class="control">
              <a class="button is-dark">Cancelar</a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Minuta',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      minuta: {
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
        }
      },
      tema: '',
      asistencia: {},
      objetivos: [''],
      conclusiones: [''],
      item: {
        correlativo: 0,
        descripcion: '',
        fecha: '',
        tipo_item_id: 0
      },
      responsables: [],
      listaItems: [
        {
          correlativo: 1,
          descripcion: '',
          fecha: '',
          tipo_item_id: 0,
          responsables: []
        }
      ],
      tipo_items: [],
      grupo: {},
      clasificacion: []
    }
  },
  methods: {
    removeFromArray: function (arr, item) {
      var i = arr.indexOf(item)
      i !== -1 && arr.splice(i, 1)
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
    }
  }
}
</script>
