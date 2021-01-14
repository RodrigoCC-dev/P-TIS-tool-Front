import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RevisionAvances from '@/components/RevisionAvances.vue'

const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
      jornadaActual: 'Diurna'
    }
  }
})

describe('RevisionAvances.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(RevisionAvances, {
      global: {
        plugins: [store]
      }
    })
  })

  it('variable "grupoSeleccionado" se inicializa correctamente', () => {
    expect(wrapper.vm.grupoSeleccionado).toEqual({})
  })

  it('variable "listaAvances" se inicializa correctamente', () => {
    expect(wrapper.vm.listaAvances).toEqual([])
  })

  it('variable "revisarMinuta" se inicializa correctamente en "false"', () => {
    expect(wrapper.vm.revisarMinuta).toBeFalsy()
  })

  it('variable "bitacora" se inicializa correctamente', () => {
    expect(wrapper.vm.bitacora).toEqual({})
  })
})
