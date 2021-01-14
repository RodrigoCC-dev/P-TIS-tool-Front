import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import Semanal from '@/components/semanal/Semanal.vue'

const estudiante = {
  id: 94534,
  iniciales: 'ABC',
  usuario_id: 9543,
  seccion_id: 93453,
  grupo_id: 925353,
  usuario: {
    id: 13452,
    nombre: 'Alberto',
    apellido_paterno: 'Becerra',
    apellido_materno: 'Cabrera',
    run: '12345678-9',
    email: 'alberto.becerra@algo.com',
    rol_id: 25925
  }
}

const grupo = {
  id: 94534,
  nombre: 'G08',
  proyecto: 'Proyecto para pruebas',
  correlativo: 8,
  estudiantes: [
    {
      id: 45334,
      iniciales: 'LMN',
      usuario: {
        id: 79435,
        nombre: 'Luisa',
        apellido_paterno: 'Martinez',
        apellido_materno: 'Norambuena',
        run: '11111111-1',
        email: 'luisa.martinez@algo.com'
      }
    },
    {
      id: 94534,
      iniciales: 'ABC',
      usuario: {
        id: 9543,
        nombre: 'Alberto',
        apellido_paterno: 'Becerra',
        apellido_materno: 'Cabrera',
        run: '12345678-9',
        email: 'alberto.becerra@algo.com',
      }
    }
  ],
  stakeholders: []
}

const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
      estudiante: estudiante,
      grupo: grupo
    }
  }
})

const semestre = {
  id: 24538,
  numero: 1,
  agno: 2021,
  activo: true,
  inicio: '2021-03-05T00:00:00.000Z',
  fin: '2021-07-15T00:00:00.000Z'
}

jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case '127.0.0.1:3000/minutas/correlativo/semanal/94534':
      return Promise.resolve({data: 2945})
    case '127.0.0.1:3000/semestres':
      return Promise.resolve({data: semestre})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('Semanal.vue', () => {
  const avance = {
    id: 8539453,
    emitida: false,
    activa: true,
    fecha_emision: '2020-12-28T20:34:45.945Z',
    minuta: {
      id: 2453,
      estudiante_id: 94534,
      correlativo: 1845,
      codigo: 'MINUTA_G04_03_2020',
      fecha_reunion: '2020-12-27T20:34:45.945Z',
      numero_sprint: 34,
      creada_el: '2020-12-27T20:34:45.945Z',
      asistencia: [
        {
          id: 4953,
          id_estudiante: 94534
        },
        {
          id: 9453,
          id_estudiante: 45334
        }
      ],
      items: [
        {
          id: 94534,
          descripcion: 'Item para la prueba',
          correlativo: 9453,
          tipo_item: {
            id: 9534,
            tipo: 'Logro'
          },
          responsables: {
            id: 945,
            asistencia_id: 4953
          }
        },
        {
          id: 2345345,
          descripcion: 'Otro item para la prueba',
          correlativo: 23534,
          tipo_item: {
            id: 54343,
            tipo: 'Meta'
          },
          responsables: {
            id: 13453,
            asistencia_id: 4953
          }
        }
      ],
      bitacora_estado: {
        id: 324534,
        tipo_estado: {
          id:4534,
          abreviacion: 'BOR'
        }
      }
    }
  }

  const item = [{id: 0, descripcion: '', correlativo: 1}]

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Semanal, {
      propsData: {
        avance: avance,
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
  })


  it('se asigna prop "avance" correctamente', () => {
    expect(wrapper.props().avance).toEqual(avance)
  })

  it('se asigna prop "tipoMinuta" correctamente', () => {
    expect(wrapper.props().tipoMinuta).toEqual(3)
  })

  it('variable "id" se inicializa correctamente', () => {
    expect(wrapper.vm.id).toEqual(0)
  })

  it('variable "bitacora" se inicializa correctamente con prop', () => {
    expect(wrapper.vm.bitacora).toEqual(avance)
  })

  it('variable "minuta" se inicializa correctamente sin props', () => {
    const esperado = {
      estudiante_id: 0,
      codigo: '',
      correlativo: '',
      fecha_avance: '',
      tipo_minuta_id: 3
    }
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.minuta).toEqual(esperado)
  })

  it('variable "minuta" se inicializa correctamente con props', () => {
    const esperado = {
      estudiante_id: 94534,
      codigo: 'MINUTA_G04_03_2020',
      correlativo: 1845,
      fecha_avance: '2020-12-27',
      tipo_minuta_id: 3
    }
    expect(wrapper.vm.minuta).toEqual(esperado)
  })

  it('variable "numeroSprint" se inicializa correctamente sin props', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.numeroSprint).toEqual('')
  })

  it('variable "numeroSprint" se inicializa correctamente con props', () => {
    expect(wrapper.vm.numeroSprint).toEqual(34)
  })

  it('variable "logros" se inicializa correctamente sin props', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.logros).toEqual(item)
  })

  it('variable "logros" se inicializa correctamente con props', () => {
    const esperado = [{
      id: 94534,
      descripcion: 'Item para la prueba',
      correlativo: 9453
    }]
    expect(wrapper.vm.logros).toEqual(esperado)
  })

  it('variable "metas" se inicializa correctamente sin props', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.metas).toEqual(item)
  })

  it('variable "metas" se inicializa correctamente con props', () => {
    const esperado = [{
      id: 2345345,
      descripcion: 'Otro item para la prueba',
      correlativo: 23534
    }]
    debugger
    expect(wrapper.vm.metas).toEqual(esperado)
  })

  it('variable "semestre" se inicializa correctamente', () => {
    expect(wrapper.vm.semestre).toEqual({})
  })

  it('variable "entradas" se inicializa correctamente', () => {
    const esperado = {
      numeroSprint: {error: false, mensaje: ''},
      fechaAvance: false,
      logros: false,
      metas: false
    }
    expect(wrapper.vm.entradas).toEqual(esperado)
  })

  it('variable "itemsLogros" se inicializa correctamente sin props', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.itemsLogros).toEqual([])
  })

  it('variable "itemsLogros" se inicializa correctamente con props', () => {
    const esperado = [
      {
        id: 94534,
        descripcion: 'Item para la prueba',
        correlativo: 9453,
        tipo_item: {
          id: 9534,
          tipo: 'Logro'
        },
        responsables: {
          id: 945,
          asistencia_id: 4953
        }
      }
    ]
    expect(wrapper.vm.itemsLogros).toEqual(esperado)
  })

  it('variable "itemsMetas" se inicializa correctamente sin props', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipo_minuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.itemsMetas).toEqual([])
  })

  it('variable "itemsMetas" se inicializa correctamente con props', () => {
    const esperado = [
      {
        id: 2345345,
        descripcion: 'Otro item para la prueba',
        correlativo: 23534,
        tipo_item: {
          id: 54343,
          tipo: 'Meta'
        },
        responsables: {
          id: 13453,
          asistencia_id: 4953
        }
      }
    ]
    expect(wrapper.vm.itemsMetas).toEqual(esperado)
  })

  it('variable "emitir" se inicializa correctamente', () => {
    expect(wrapper.vm.emitir).toBeFalsy()
  })

  it('propiedad computada "actualizarAvance" funciona correctamente con "true"', () => {
    expect(wrapper.vm.actualizarAvance).toBeTruthy()
  })

  it('propiedad computada "actualizarAvance" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.actualizarAvance).toBeFalsy()
  })

  it('propiedad computada "compagnerosGrupo" funciona correctamente', () => {
    const esperado = [
      {
        id: 45334,
        iniciales: 'LMN',
        usuario: {
          id: 79435,
          nombre: 'Luisa',
          apellido_paterno: 'Martinez',
          apellido_materno: 'Norambuena',
          run: '11111111-1',
          email: 'luisa.martinez@algo.com'
        }
      }
    ]
    expect(wrapper.vm.compagnerosGrupo).toEqual(esperado)
  })

  it('propiedad computada "mostrarEmitir" funciona correctamente con "true"', () => {
    expect(wrapper.vm.mostrarEmitir).toBeTruthy()
  })

  it('propiedad computada "mostrarEmitir" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Semanal, {
      propsData: {
        avance: {},
        tipoMinuta: 3
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarEmitir).toBeFalsy()
  })
})
