import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
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

// Variables globales
const jornadas = [
  {
    id: 91453,
    nombre: 'Diurna',
    identificador: 1
  },
  {
    id: 94353,
    nombre: 'Vespertina',
    identificador: 2
  }
]

// Mock axios
jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case '127.0.0.1:3000/jornadas':
      return Promise.resolve({data: jornadas})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('SelectorJornada.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SelectorJornada, {
      global: {
        plugins: [store]
      }
    })
  })

  it('variable mostrarJornadas se inicializa correctamente con "false"', async () => {
    const wrapper = shallowMount(SelectorJornada)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })

  it('variable jornadaActual se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable jornadasProfesor se inicializa correctamente', async () => {
    const wrapper = shallowMount(SelectorJornada)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.jornadasProfesor).toEqual([])
  })

  it('variable nombreTabs se inicializa correctamente', async () => {
    const esperado = {
      diurna: 'Diurna',
      vespertina: 'Vespertina'
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('método "obtenerJornadas" funciona correctamente', async () => {
    const esperado = ['Diurna', 'Vespertina']
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.jornadasProfesor.length).toEqual(2)
    expect(wrapper.vm.jornadasProfesor).toEqual(esperado)
    expect(wrapper.vm.mostrarJornadas).toBeTruthy()
  })

  it('método elegirTab funciona correctamente', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.elegirTab('Vespertina')
    expect(wrapper.vm.jornadaActual).toEqual('Vespertina')
    expect(wrapper.vm.$store.state.jornadaActual).toEqual('Vespertina')
  })

})
