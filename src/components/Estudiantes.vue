<template>
  <div>
    <p>Este es el componente de los estudiantes</p>
    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2">
        <button class="button is-success" @click="nuevoEstudiante">Agregar Estudiante</button>
      </div>
    </div>
    <div v-if="verFormulario">
      <form class="form" method="post">
        <div class="columns has-text-left">
          <div class="column is-3">
            <div class="field">
              <label class="label">R.U.N.:</label>
              <div class="control">
                <input v-model="estudiante.usuario.run" class="input" type="text" placeholder="ej.: 12345678-9">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Nombre:</label>
              <div class="control">
                <input v-model="estudiante.usuario.nombre" class="input" type="text" placeholder="ej.: Pablo">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Apellido paterno:</label>
              <div class="control">
                <input v-model="estudiante.usuario.apellido_paterno" class="input" type="text" placeholder="ej.: Contreras">
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="field">
              <label class="label">Apellido materno:</label>
              <div class="control">
                <input v-model="estudiante.usuario.apellido_materno" class="input" type="text" placeholder="ej.: Soto">
              </div>
            </div>
          </div>
        </div>
        <div class="columns has-text-left">
          <div class="column is-3">
            <div class="field">
              <label class="label">Correo electrónico:</label>
              <div class="control">
                <input v-model="estudiante.usuario.correo_elec" class="input" type="text" placeholder="ej.: pablo.contreras@usach.cl">
              </div>
            </div>
          </div>
          <div class="column is-9">
            <div class="field">
              <label class="label">Sección - Curso:</label>
              <div class="control is-expanded">
                <div class="select is-fullwith">
                  <select v-model="estudiante.seccion.codigo">
                    <option value="V5">V5 - Curso</option>
                    <option value="V6">V6 - Otro curso</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <a class="button is-link">Agregar</a>
              </div>
              <div class="control">
                <a class="button is-light">Cancelar</a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Estudiantes',
  data () {
    return {
      verFormulario: false,
      secciones: {},
      estudiante: {
        usuario: {
          nombre: null,
          apellido_paterno: null,
          apellido_materno: null,
          run: null,
          correo_elec: null
        },
        seccion: {
          codigo: null
        }
      }
    }
  },
  methods: {
    nuevoEstudiante: function () {
      this.verFormulario = true
    }
  }
}
</script>
