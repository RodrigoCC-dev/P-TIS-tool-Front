import { shallowMount, mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import RevisionMinutas from '@/components/RevisionMinutas.vue'

const store = createStore({
  state() {
    return {
      jornadaActual: 'Diurna'
    }
  }
})

describe('RevisionMinutas.vue', () => {
  const listaGrupos = [
    {
      id: 1, jornada: 'Diurna'
    },
    {
      id: 2, jornada: 'Vespertina'
    },
    {
      id: 3, jornada: 'Vespertina'
    },
    {
      id: 4, jornada: 'Diurna'
    }
  ]

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(RevisionMinutas, {
      global: {
        plugins: [store]
      }
    })
  })

/*
  it('variable jornadaActual se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable jornadasProfesor se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.jornadasProfesor).toEqual([])
  })

  it('vairable listaGrupos se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.listaGrupos).toEqual([])
  })
*/

  it('variable mostrarFormulario se inicializa correctamente', () => {
    expect(wrapper.vm.mostrarFormulario).toBeFalsy()
  })

/*
  it('variable mostrarJornadas se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })
*/

  it('variable mostrarMinutas se inicializa correctamente', () => {
    expect(wrapper.vm.mostrarMinutas).toBeFalsy()
  })

  it('variable "mostrarRegistros" se inicializa correctamente', () => {
    expect(wrapper.vm.mostrarRegistros).toBeFalsy()
  })

/*
  it('variable grupoActual se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.grupoActual).toEqual(0)
  })
*/

  it('variable grupoSeleccionado se inicializa correctamente', () => {
    expect(wrapper.vm.grupoSeleccionado).toEqual({})
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable bitacora se inicializa correctamente', () => {
    expect(wrapper.vm.bitacora).toEqual({})
  })

/*
  it('variable nombreTabs se inicializa correctamente', () => {
    const tabs = {
      diurna: 'Diurna',
      vespertina: 'Vespertina'
    }
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.nombreTabs).toEqual(tabs)
  })

  it('propiedad computada gruposJornada funciona correctamente', () => {
    const esperado = [
      {
        id: 1, jornada: 'Diurna'
      },
      {
        id: 4, jornada: 'Diurna'
      }
    ]
    const wrapper = shallowMount(RevisionMinutas, {
      data() {
        return {
          listaGrupos: listaGrupos
        }
      }
    })
    expect(wrapper.vm.gruposJornada).toEqual(esperado)
  })

  it('propiedad computada "mostrarGrupos" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.mostrarGrupos).toBeFalsy()
  })

  it('propiedad computada "mostrarGrupos" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(RevisionMinutas, {
      data() {
        return {
          listaGrupos: listaGrupos
        }
      }
    })
    expect(wrapper.vm.mostrarGrupos).toBeTruthy()
  })

  it('método elegirTab funciona correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas, {
      data() {
        return {
          grupoActual: 5,
          mostrarMinutas: true
        }
      }
    })
    wrapper.vm.elegirTab('Vespertina')
    expect(wrapper.vm.jornadaActual).toEqual('Vespertina')
    expect(wrapper.vm.grupoActual).toEqual(0)
    expect(wrapper.vm.mostrarMinutas).toBeFalsy()
  })

  it('método buscarPorId funciona correctamente', () => {
    const lista = [
      {
        id: 5,
        nombre: 'Juan'
      },
      {
        id: 6,
        nombre: 'Teresa'
      }
    ]
    const esperado = {
      id: 6,
      nombre: 'Teresa'
    }
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.buscarPorId(lista, 6)).toEqual(esperado)
  })

  it('método nombreCompleto funciona correctamente', () => {
    const estudiante = {
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Muñoz'
    }
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Juan Perez Muñoz')
  })
*/

  it('método "seleccionarGrupo" funciona correctamente', () => {
    const grupo = {id: 93453, nombre: 'G01'}
    wrapper.vm.seleccionarGrupo(grupo)
    expect(wrapper.vm.grupoSeleccionado).toEqual(grupo)
    expect(wrapper.vm.mostrarMinutas).toBeTruthy()
  })

  it('método cerrarFormulario funciona correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas, {
      data() {
        return {
          mostrarFormulario: true,
          bitacora: {
            minuta: {
              objetivos: [],
              conclusiones: [],
              items: []
            }
          }
        }
      },
      global: {
        plugins: [store]
      }
    })
    wrapper.vm.cerrarFormulario()
    expect(wrapper.vm.mostrarFormulario).toBeFalsy()
  })

  it('método "verRegistros" funciona correctamente', () => {
    wrapper.vm.verRegistros()
    expect(wrapper.vm.mostrarRegistros).toBeTruthy()
  })

  it('método "cerrarRegistros" funciona correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas, {
      data() {
        return {
          mostrarRegistros: true
        }
      },
      global: {
        plugins: [store]
      }
    })
    wrapper.vm.cerrarRegistros()
    expect(wrapper.vm.mostrarRegistros).toBeFalsy()
  })
})
