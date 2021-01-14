import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import flushPromises from 'flush-promises'
import axios from 'axios'
import TableroEst from '@/components/TableroEst.vue'

const store = createStore({
  state() {
    return {
      grupo: {
        id: 93453,
        nombre: 'G01',
        proyecto: 'Proyecto de prueba unitario',
        correlativo: 34,
        jornada: 'Diurna',
        estudiantes: [{
          id: 92345,
          iniciales: 'ABC',
          usuario: {
            nombre: 'Alberto',
            apellido_paterno: 'Becerra',
            apellido_materno: 'Castro',
            run: '11111111-1',
            email: 'alberto.becerra@algo.com'
          }
        }],
        stakeholders: []
      }
    }
  }
})

jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case '/minutas/revision/estados':
      return Promise.resolve({ data: [
        {
          id: 96345,
          motivo: 'Emitida para pruebas',
          revision: '0',
          fecha_emision: '2020-01-18T03:53:34.394Z',
          minuta: {
            id: 913453,
            codigo: 'MINUTA_G02_04_2020',
            correlativo: 9,
            fecha_reunion: '2021-01-12T00:00:00.000Z',
            tipo_minuta: 'Cliente',
            creada_por: 'ABC',
            creada_el: '2021-01-22T04:23:53.945Z'
          },
          estado: {
            id: 194534,
            abreviacion: 'CER',
            descripcion: 'Cerrada'
          }
        },
        {
          id: 13534,
          motivo: 'Emitida para pruebas',
          revision: 'A',
          fecha_emision: '2020-01-18T03:53:34.394Z',
          minuta: {
            id: 34593,
            codigo: 'MINUTA_G02_05_2020',
            correlativo: 10,
            fecha_reunion: '2021-01-12T00:00:00.000Z',
            tipo_minuta: 'Coordinacion',
            creada_por: 'ABC',
            creada_el: '2021-01-22T04:23:53.945Z'
          },
          estado: {
            id: 23543,
            abreviacion: 'BOR',
            descripcion: 'Borrador'
          }
        }
      ]})
    case '/minutas/revision/grupo':
      return Promise.resolve({ data: []})
    case '/minutas/revision/respondidas':
      return Promise.resolve({ data: []})
    case '/minutas/avances/semanales/grupo/93453':
      return Promise.resolve({ data: [
        {
          id: 72534,
          emitida: true,
          activa: true,
          fecha_emision: '2020-01-18T03:53:34.394Z',
          minuta: {
            id: 13459343,
            estudiante_id: 9435,
            codigo: 'MINUTA_G02_04_2020',
            correlativo: 13,
            fecha_reunion: '2021-01-12T00:00:00.000Z',
            numero_sprint: 3,
            creada_el: '2021-01-22T04:23:53.945Z',
            asistencia: [
              {
                id: 9453,
                id_estudiante: 643
              },
              {
                id: 2345,
                id_estudiante: 345
              }
            ],
            items: []
          },
          estado: {
            id: 194534,
            abreviacion: 'CER',
            descripcion: 'Cerrada'
          }
        }
      ]})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('TableroEst.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TableroEst, {
      global: {
        plugins: [store]
      }
    })
  })

  it('se asigna prop "seleccionado" correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        seleccionado: 4534515
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.props().seleccionado).toEqual(4534515)
  })

  it('se asigna prop "contador" correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        contador: 94045923
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.props().contador).toEqual(94045923)
  })

  it('variable nombreTab de inicializa correctamente', () => {
    expect(wrapper.vm.nombreTab).toEqual('Borradores')
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      borradores: 'Borradores',
      emitidas: 'Emitidas',
      revision: 'Revision',
      comentadas: 'Comentadas',
      respondidas: 'Respondidas',
      cerradas: 'Cerradas'
    }
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable listaBorradores se inicializa correctamente', () => {
    expect(wrapper.vm.listaBorradores).toEqual([])
  })

  it('variable listaComentadasGrupo se inicializa correctamente', () => {
    expect(wrapper.vm.listaComentadasGrupo).toEqual([])
  })

  it('variable listaComentadasCliente se inicializa correctamente', () => {
    expect(wrapper.vm.listaComentadasCliente).toEqual([])
  })

  it('variable listaRespondidasGrupo se inicializa correctamente', () => {
    expect(wrapper.vm.listaRespondidasGrupo).toEqual([])
  })

  it('variable listaCerradas se inicializa correctamente', () => {
    expect(wrapper.vm.listaCerradas).toEqual([])
  })

  it('variable listaEmitidas se inicializa correctamente', () => {
    expect(wrapper.vm.listaEmitidas).toEqual([])
  })

  it('variable listaRevision se inicializa correctamente', () => {
    expect(wrapper.vm.listaRevision).toEqual([])
  })

  it('variable "contar" se asigna con props correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        contador: 0
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.contar).toEqual(0)
  })

  it('variable "minutaActual" se inicializa con props correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        seleccionado: 462345
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.minutaActual).toEqual(462345)
  })

  it('propiedad computada mostrarBorradores funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaBorradores: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'BOR',
                descripcion: 'Borrador'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarBorradores).toBeTruthy()
  })

  it('propiedad computada mostrarBorradores funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarBorradores).toBeFalsy()
  })

  it('propiedad computada mostrarEmitidas funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaEmitidas: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'EMI',
                descripcion: 'Emitida'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarEmitidas).toBeTruthy()
  })

  it('propiedad computada mostrarEmitidas funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarEmitidas).toBeFalsy()
  })

  it('propiedad computada mostrarCerradas funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaCerradas: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'CER',
                descripcion: 'Cerrada'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarCerradas).toBeTruthy()
  })

  it('propiedad computada mostrarCerradas funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarCerradas).toBeFalsy()
  })

  it('propiedad computada mostrarComentadasGrupo funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaComentadasGrupo: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'CIG',
                descripcion: 'Comentada por integrante del grupo'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarComentadasGrupo).toBeTruthy()
  })

  it('propiedad computada mostrarComentadasGrupo funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarComentadasGrupo).toBeFalsy()
  })

  it('propiedad computada mostrarComentadasCliente funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaComentadasCliente: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'CSK',
                descripcion: 'Comentadas por el cliente'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarComentadasCliente).toBeTruthy()
  })

  it('propiedad computada mostrarComentadasCliente funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarComentadasCliente).toBeFalsy()
  })

  it('propiedad computada mostrarRespondidasGrupo funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaRespondidasGrupo: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'RIG',
                descripcion: 'Respondida por un integrante del grupo'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarRespondidasGrupo).toBeTruthy()
  })

  it('propiedad computada mostrarRespondidasGrupo funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarRespondidasGrupo).toBeFalsy()
  })

  it('propiedad computada mostrarRevision funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaRevision: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'EMI',
                descripcion: 'Emitida'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarRevision).toBeTruthy()
  })

  it('propiedad computada mostrarRevision funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarRevision).toBeFalsy()
  })

  it('método elegirTab funciona correctamente', () => {
    wrapper.vm.elegirTab('Revision')
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('método convertirFecha funciona correctamente', () => {
    expect(wrapper.vm.convertirFecha('2020-11-19T17:45:00.000Z')).toEqual('19-11-2020')
  })

  it('método convertirFecha funciona correctamente con entrada null', () => {
    expect(wrapper.vm.convertirFecha(null)).toEqual('')
  })

  it('método convertirFecha funciona correctamente con entrada undefined', () => {
    expect(wrapper.vm.convertirFecha(undefined)).toEqual('')
  })

  it('método categorizarMinutas funciona correctamente' , () => {
    const wrapper = shallowMount(TableroEst, {
      data() {
        return {
          listaMinutas: [
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_04_2020-2_1207',
                creada_por: 'ABC',
                creada_el: '2020-11-16T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'BOR',
                descripcion: 'Borrador'
              }
            },
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_05_2020-2_1107',
                creada_por: 'ABC',
                creada_el: '2020-10-07T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'EMI',
                descripcion: 'Emitida'
              }
            },
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_05_2020-2_1107',
                creada_por: 'ABC',
                creada_el: '2020-10-07T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'CIG',
                descripcion: 'Comentada integrante del grupo'
              }
            },
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_05_2020-2_1107',
                creada_por: 'ABC',
                creada_el: '2020-10-07T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'CSK',
                descripcion: 'Comentada por el cliente'
              }
            },
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_05_2020-2_1107',
                creada_por: 'ABC',
                creada_el: '2020-10-07T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'RIG',
                descripcion: 'Respondida por integrante del grupo'
              }
            },
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_05_2020-2_1107',
                creada_por: 'ABC',
                creada_el: '2020-10-07T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'RSK',
                descripcion: 'Respondida por el cliente'
              }
            },
            {
              id: 46234,
              revision: 'A',
              minuta: {
                id: 42345,
                codigo: 'MINUTA_G02_05_2020-2_1107',
                creada_por: 'ABC',
                creada_el: '2020-10-07T17:29:00.000Z'
              },
              estado: {
                id: 46345,
                abreviacion: 'CER',
                descripcion: 'Cerrada'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    wrapper.vm.categorizarMinutas()
    expect(wrapper.vm.listaBorradores.length).toEqual(1)
    expect(wrapper.vm.listaEmitidas.length).toEqual(1)
    expect(wrapper.vm.listaCerradas.length).toEqual(1)
    expect(wrapper.vm.listaComentadasGrupo.length).toEqual(1)
    expect(wrapper.vm.listaComentadasCliente.length).toEqual(1)
    expect(wrapper.vm.listaRespondidasGrupo.length).toEqual(0)
  })
})
