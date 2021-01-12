<template>
  <div>

    <br>
    <SelectorJornada/>

    <SelectorGrupo @eleccion="seleccionarGrupo"/>

  </div>
</template>

<script>
import SelectorJornada from '@/components/SelectorJornada.vue'
import SelectorGrupo from '@/components/SelectorGrupo.vue'

export default {
  name: 'RevisionAvances',
  components: {
    SelectorJornada,
    SelectorGrupo
  },
  data () {
    return {

    }
  }
}
</script>
