import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import SelectorJornada from '@/components/SelectorJornada.vue'

const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
      jornadaActual: 'Diurna'
    }
  },
  mutations: {
    setJornadaActual(state, valor) {
      state.jornadaActual = valor
    }
  }
})

describe('SelectorJornada.vue', () => {
  it('variable mostrarJornadas se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })

  it('variable jornadaActual se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable jornadasProfesor se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.jornadasProfesor).toEqual([])
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      diurna: 'Diurna',
      vespertina: 'Vespertina'
    }
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('método elegirTab funciona correctamente', () => {
    const wrapper = shallowMount(SelectorJornada, {
      global: {
        plugins: [store]
      }
    })
    wrapper.vm.elegirTab('Vespertina')
    expect(wrapper.vm.jornadaActual).toEqual('Vespertina')
    expect(wrapper.vm.$store.state.jornadaActual).toEqual('Vespertina')
  })

})
