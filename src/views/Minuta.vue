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
            <input class="input" type="text">
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
              <input class="input is-normal" type="text">
            </p>
          </div>
        </div>
        <div class="field-label-2c">
          <label class="label">Hora de termino:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-normal" type="text">
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
              <input class="input" type="text">
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-three-quarters is-offset-1 has-text-left">
          <div class="field">
            <label class="label">Participantes:</label>
          </div>
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
          <input type="checkbox" value="">
        </div>
        <div class="column">
          <p>Control de Avance</p>
          <input type="checkbox" value="">
        </div>
        <div class="column">
          <p>Coordinador</p>
          <input type="checkbox" value="">
        </div>
        <div class="column">
          <p>Decisión</p>
          <input type="checkbox" value="">
        </div>
        <div class="column">
          <p>Otros</p>
          <input type="checkbox" name="" value="">
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
  }
}
</script>
