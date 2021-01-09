<template>
  <div>

    <div class="columns is-centered">
      <div class="column is-half">
        <p class="title is-4 has-text-centered">MINUTA DE AVANCE SEMANAL</p>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
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
      <div class="field-label-2c is-normal">
        <label class="label">Grupo:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="grupo.correlativo" class="input has-text-centered" type="text" disabled>
          </p>
        </div>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">N° de avance:</label>
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
      <div class="field-label-2c is-normal">
        <label class="label">N° de Sprint:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="numeroSprint" class="input has-text-centered" type="text">
          </p>
        </div>
        <p class="is-danger help" v-if="entradas.numeroSprint">No se ha ingresado el núermo del Sprint</p>
      </div>
      <div class="field-label-2c is-normal">
        <label class="label">Fecha avance:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input v-model="minuta.fechaAvance" class="input has-text-centered" type="date">
          </p>
        </div>
        <p class="is-danger help" v-if="entradas.fechaAvance">No se ha ingresado la fecha del avance</p>
      </div>
    </div>

    <br>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <p class="title is-5 has-text-centered">Logros de la semana anterior</p>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column is-2 is-offset-3">
            <a class="button is-small is-info-usach is-rounded" @click="agregarLogro"><strong>+</strong></a>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-10">
        <div class="content has-text-left">
          <ul>
            <li v-for="(logro, index) in logros" :key="index">
              <div class="field is-grouepd">
                <p class="control is-expanded has-icons-right">
                  <input v-model="logros[index].descripcion" class="input is-normal" type="text">
                  <span class="icon is-right">
                    <button class="delete" @click="removerLogro(logro)"></button>
                  </span>
                </p>
              </div>
            </li>
          </ul>
          <p class="is-danger help" v-if="entradas.logros">No se han llenado todos los logros</p>
        </div>
      </div>
    </div>

    <br>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <p class="title is-5 has-text-centered">Metas para la nueva semana</p>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column is-2 is-offset-3">
            <a class="button is-small is-info-usach is-rounded" @click="agregarMeta"><strong>+</strong></a>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <div class="content has-text-left">
          <ul>
            <li v-for="(meta, index) in metas" :key="index">
              <div class="field is-grouped">
                <p class="control is-expanded has-icons-right">
                  <input v-model="metas[index].descripcion" class="input is-normal" type="text">
                  <span class="icon is-right">
                    <button class="delete" @click="removerMeta(meta)"></button>
                  </span>
                </p>
              </div>
            </li>
          </ul>
          <p class="is-danger help" v-if="entradas.metas">No se han agregado todas las metas</p>
        </div>
      </div>
    </div>

    <br>
    <br>
    <div class="columns is-centered">
      <div class="column is-3">
        <div class="field">
          <div class="control">
            <a class="button is-primary-usach is-fullwidth" @click="guardar">Guardar</a>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="control">
          <a class="button is-light-usach is-fullwidth" @click="cerrar">Cancelar</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Auth from '@/services/auth.js'
import Funciones from '@/services/funciones.js'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Semanal',
  props: [],
  data () {
    return {
      minuta: {
        estudiante_id: 0,
        codigo: '',
        correlativo: 0,
        fechaAvance: ''
      },
      numeroSprint: '',
      logros: [{ id: 0, descripcion: '' }],
      metas: [{ id: 0, descripcion: '' }],
      entradas: {
        logros: false,
        metas: false
      }
    }
  },
  computed: {
    ...mapState(['apiUrl', 'estudiante', 'grupo'])
  },
  methods: {
    removeFromArray: function (arreglo, item) {
      return Funciones.removeFromArray(arreglo, item)
    },
    agregarLogro: function () {
      this.logros.push({ id: 0, descripcion: '' })
    },
    removerLogro: function (logro) {
      if (this.logros.length > 1) {
        this.removeFromArray(this.logros, logro)
      }
    },
    agregarMeta: function () {
      this.metas.push({ id: 0, descripcion: '' })
    },
    removerMeta: function (meta) {
      if (this.metas.length > 1) {
        this.removeFromArray(this.metas, meta)
      }
    },
    establecerCodigo: function () {
      var codigo = 'AVANCE_'
      var correlativo = ''
      if (this.minuta.correlativo < 10) {
        correlativo = '0' + this.minuta.correlativo
      } else {
        correlativo = this.minuta.correlativo
      }
      var sprint = ''
      if (this.numeroSprint < 10) {
        sprint = '0' + this.numeroSprint
      } else {
        sprint = this.numeroSprint
      }
      var fecha = this.minuta.fechaAvance.split('-')
      codigo += this.grupo.nombre + '_' + correlativo + '_S' + sprint + fecha[1] + fecha[2]
      return codigo
    },
    async guardar () {
      const items = {
        logros: this.logros,
        metas: this.metas
      }
      try {
        await axios.post(this.apiUrl + '/minutas/avance/semanal', items, { headers: Auth.postHeader() })
        this.$emit('cerrar')
      } catch (e) {
        console.log('No fue posible guardar los logros y metas de la semana')
        console.log(e)
      }
    },
    cerrar: function () {
      this.$emit('cerrar')
    }
  }
}
</script>
