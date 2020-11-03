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
          <p>Informativa</p>
          <div class="control">
            <input type="checkbox" v-model="clasificacion" value="informativa">
          </div>
        </div>
        <div class="column">
          <p>Control de Avance</p>
          <div class="control">
            <input type="checkbox" v-model="clasificacion" value="avance">
          </div>
        </div>
        <div class="column">
          <p>Coordinación</p>
          <div class="control">
            <input type="checkbox" v-model="clasificacion" value="coordinación">
          </div>
        </div>
        <div class="column">
          <p>Decisión</p>
          <div class="control">
            <input type="checkbox" v-model="clasificacion" value="decisión">
          </div>
        </div>
        <div class="column">
          <p>Otros</p>
          <div class="control">
            <input type="checkbox" v-model="clasificacion" value="otro">
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <p class="title is-5">Agenda / Objetivos</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="content has-text-left">
            <dl>
              <li v-for="(objetivo, index) in objetivos" :key="index">
                <input v-model="objetivos[index]" class="input" type="text">
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

      <div class="columns">
        <div class="column is-full">
          <p class="title is-5">Resultados / Conclusiones</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="content has-text-left">
            <dl>
              <li v-for="(conclusion, index) in conclusiones" :key="index">
                <input v-model="conclusiones[index]" class="input" type="text">
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

      <div class="">
        <br>
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th class="is-narrow">N°</th>
              <th><abbr title="Tipo de actividad">Item</abbr></th>
              <th><abbr title="Descripción de la actividad realizada">Descripción</abbr></th>
              <th><abbr title="Fecha comprometida para la actividad">Fecha</abbr></th>
              <th><abbr title="Responsable de realizarla">Responsable</abbr></th>
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
            <tr class="is-vcentered">
              <th>2</th>
              <td>
                <div class="select is-small">
                  <select>
                    <option value="">INFO</option>
                    <option value="">COMP</option>
                    <option value="">AGENDA</option>
                  </select>
                </div>
              </td>
              <td><textarea class="textarea is-small is-extend" type="text" name="" value=""></textarea></td>
              <td><input class="input is-small has-text-centered" type="date" name="" value=""></td>
              <td>
                <div class="select is-small">
                  <select>
                    <option value="">-- SA --</option>
                    <option value="">MCR</option>
                    <option value="">PTR</option>
                    <option value="">ITZ</option>
                  </select>
                </div>
              </td>
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
          correlativo: 0,
          descripcion: '',
          fecha: '',
          tipo_item_id: 0
        }
      ],
      tipo_items: [],
      grupo: {},
      clasificacion: []
    }
  }
}
</script>
