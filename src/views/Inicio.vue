<template lang="html">
  <div>
    <Header/>
    <div class="container">
      <div id="init-container" class="columns is-vcentered is-fullheight">
        <img src="@/assets/images/eao-usach.png" class="is-tablet" style="z-index: 1"/>
        <div class="column is-3" style="z-index: 999"></div>
        <div class="column is-6 bg-semitransparent px-5 py-5" style="z-index: 999">
          <div class="title is-2">Módulo de minutas de reunión</div>
          <div class="subtitle is-5 my-3">
            <p>Herramienta de apoyo a las actividades de desarrollo de proyecto de software de los cursos P/TIS</p>
          </div>

          <div class="is-vcentered">

            <div class="field">
              <label class="label has-text-left">Correo electrónico</label>
              <div class="control">
                <input v-model="correo" class="input" type="text" placeholder="nombre.apellido@usach.cl">
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label has-text-left">Clave de acceso</label>
              <div class="control">
                <input v-model="password" class="input" type="password">
              </div>
            </div>
            <br>
          </div>

          <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-6">
              <div class="field">
                <div class="control">
                  <button class="button is-link is-fullwidth" v-on:click="disteClick">Acceder</button>
                </div>
              </div>
            </div>
            <div class="column is-3"></div>
          </div>

        </div>
        <div class="column is-3" style="z-index: 999"></div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Inicio',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      correo: '',
      password: ''
    }
  },
  computed: {
    print: function () {
      console.log(this.correo)
      return console.log(this.password)
    }
  },
  methods: {
    disteClick: function () {
      console.log(this.correo)
      console.log(this.password)
      if (this.correo === 'estudiante@usach.cl') {
        if (this.password === 'estudiante') {
          this.$router.push('About')
        }
      }
      return true
    }
  }
}
</script>

<style lang="css" scoped>
#init-container {
  height: 650px;
  width: 100%;
  margin: 0;
  padding: 0;
}

.bg-semitransparent {
  background-color: rgba(255, 255, 255, .8);
}

.has-textline-through {
  text-decoration: line-through;
}

#init-container img {
  position: absolute;
  height: 650px;
  object-fit: cover;
}
</style>
