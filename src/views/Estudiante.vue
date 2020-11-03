<template lang="html">
  <div class="has-text-left">
    <Header/>

    <div class="container">

      <div class="columns">
        <div class="column is-10"></div>
        <div class="column is-2">
          <button class="button is-success" @click="nuevaMinuta">Nueva Minuta</button>
        </div>
      </div>

      <section class="new-section">
        <div class="container">
          <p class="title is-5">Borradores</p>
          <table class="table is-fullwidth is-bordered is-narrow">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Realizado por</th>
                <th>Iniciada el</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <a href="">MINUTA_G02_06_2020-2_1006</a>
                </td>
                <td>RCC</td>
                <td>12-10-2020</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <a href="">MINUTA_G02_07_2020-2_1008</a>
                </td>
                <td>RCC</td>
                <td>13-10-2020</td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <hr>
      <section class="new-section is-small">
        <div class="container">
          <p class="title is-5">Revisadas por el grupo</p>
          <table class="table is-fullwidth is-bordered is-narrow">
            <thead>
              <tr class="has-text-centered has-background-light">
                <th>N°</th>
                <th>Código</th>
                <th>Realizada por</th>
                <th>Emitida el</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <a href="">MINUTA_G02_04_2020-2_0923</a>
                </td>
                <td>RCC</td>
                <td>23-09-2020</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <a href="">MINUTA_G02_05_2020-2_0930</a>
                </td>
                <td>RCC</td>
                <td>30-09-2020</td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>

    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Estudiante',
  components: {
    Header,
    Footer
  },
  methods: {
    nuevaMinuta: function () {
      this.$router.push({ name: 'Minuta' })
    }
  }
}
</script>

<style lang="css" scoped>
.new-section {
  padding: 1rem 1.5rem;
}
</style>
