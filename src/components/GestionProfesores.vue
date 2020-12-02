<template>
  <div>

    <div class="columns">
      <div class="column is-10"></div>
      <div class="column is-2" v-if="verFormulario"></div>
      <div class="column is-2" v-else>
        <button class="button is-success" @click="agregarProfesor">Agregar Profesor</button>
      </div>
    </div>

    <div v-if="verFormulario">
      <div class="columns">

        <div class="column is-5">
          <form class="form">
            <div class="columns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Nombre:</label>
                  <div class="control">
                    <input v-model="usuario.nombre" class="input" type="text" @input="validarNombre" placeholder="ej.: Ana">
                  </div>
                  <p class="is-danger help" v-if="entradas.nombre.error">{{ entradas.nombre.mensaje }}</p>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Apellido Paterno:</label>
                  <div class="control">
                    <input v-model="usuario.apellido_paterno" type="text" @input="validarApellidoP" placeholder="ej.: Rosas">
                  </div>
                  <p class="is-danger help" v-if="entradas.apellidoPaterno.error">{{ entradas.apellidoPaterno.mensaje }}</p>
                </div>
              </div>
            </div>
            <div class="conlumns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Apellido Materno</label>
                  <div class="control">
                    <input v-model="usuario.apellido_materno" type="text" @input="validarApellidoM" placehodler="ej.: Molina">
                  </div>
                  <p class="is-danger help" v-if="entradas.apellidoMaterno.error">{{ entradas.apellidoMaterno.mensaje }}</p>
                </div>
              </div>
            </div>
            <div class="columns has-text-left">
              <div class="column is-full">
                <div class="field">
                  <label class="label">Correo electrónico:</label>
                  <div class="control">
                    <input v-model="usuario.email" type="text" @input="validarEmail" placeholder="ej.: ana.rosas@gmail.com">
                  </div>
                  <p class="is-danger help" v-if="entradas.email.error">{{ entradas.email.mensaje }}</p>
                </div>
              </div>
            </div>
            <br>
            <div class="columns">
              <div class="column is-full">
                <div class="field is-grouped is-grouped-centered">
                  <div class="control">
                    <a class="button is-link" @click="agregar">Agregar Profesor</a>
                  </div>
                  <div class="control">
                    <a class="button is-light" @click="noAgregar"><strong>Cancelar</strong></a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="column is-7 has-text-centered">
          <div class="field">
            <label class="label">Secciones a asignar:</label>
          </div>
          <p class="is-danger help" v-if="entradas.secciones.error">{{ entradas.secciones.mensaje }}</p>
          <br>
          <div v-if="mostrarLista">
            <table class="table is-bordered is-narrow is-fullwidth">
              <thead>
                <tr class="has-text-centered has-background-light">
                  <th>N°</th>
                  <th>Código</th>
                  <th>Curso</th>
                  <th>Sección</th>
                  <th>Jornada</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(seccion, index) in secciones" :key="seccion.id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ seccion.curso.codigo }}</td>
                  <td>{{ seccion.curso.nombre }}</td>
                  <td>{{ seccion.codigo }}</td>
                  <td>{{ seccion.jornada.nombre }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'GestionProfesores',
  data () {
    return {

    }
  }
}
</script>
