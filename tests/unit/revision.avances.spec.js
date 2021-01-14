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

  const avances = [
    {
      id: 5345,
      minuta: {
        id: 63453,
        bitacora_estado: {
          id: 9643,
          tipo_estado: {
            id: 6435,
            abreviacion: 'CER'
          }
        }
      }
    }
  ]

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

  it('propiedad computada "grupoElegido" funciona correctamente con "true"', () => {
    wrapper.vm.grupoSeleccionado = {id: 96345, nombre: 'Grupo de prueba'}
    expect(wrapper.vm.grupoElegido).toBeTruthy()
  })

  it('propiedad computada "grupoElegido" funciona correctamente con "false"', () => {
    expect(wrapper.vm.grupoElegido).toBeFalsy()
  })

  it('propiedad computada "mostrarMinutas" funciona correctamente con "true"', () => {
    wrapper.vm.listaAvances = avances
    expect(wrapper.vm.mostrarMinutas).toBeTruthy()
  })

  it('propiedad computada "mostrarMinutas" funciona correctamente con "false"', () => {
    expect(wrapper.vm.mostrarMinutas).toBeFalsy()
  })

  it('propiedad computada "listaFiltrada" funciona correctamente', () => {
    wrapper.vm.listaAvances = avances
    expect(wrapper.vm.listaFiltrada).toEqual(avances)
    expect(wrapper.vm.listaFiltrada.length).toEqual(1)
  })
})
