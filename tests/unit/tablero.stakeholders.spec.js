import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import TableroStk from '@/components/TableroStk.vue'

const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
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

jest.mock('axios', () => {
  get: () => new Promise(resolve => {
    resolve({ data: []})
  })
})

describe('TableroStk.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TableroStk, {
      global: {
        plugins: [store]
      }
    })
  })

  it('se asigna props "contador" adecuadamente', () => {
    const wrapper = shallowMount(TableroStk, {
      propsData: {
        contador: 63453
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.props().contador).toEqual(63453)
  })

  it('variable nombreTab se inicializa correctamente', () => {
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable listaRevision se inicializa correctamente', () => {
    expect(wrapper.vm.listaRevision).toEqual([])
  })

  it('variable listaComentadas se inicializa correctamente', () => {
    expect(wrapper.vm.listaComentadas).toEqual([])
  })

  it('variable listaRespondidasGrupo se inicializa correctamente', () => {
    expect(wrapper.vm.listaRespondidasGrupo).toEqual([])
  })

  it('variable listaRespondidasCliente se inicializa correctamente', () => {
    expect(wrapper.vm.listaRespondidasCliente).toEqual([])
  })

  it('variable listaCerradas se inicializa correctamente', () => {
    expect(wrapper.vm.listaCerradas).toEqual([])
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      revision: 'Revision',
      comentadas: 'Comentadas',
      respondidas: 'Respondidas',
      cerradas: 'Cerradas'
    }
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('variable "contar" se asigna con props correctamente', () => {
    const wrapper = shallowMount(TableroStk, {
      propsData: {
        contador: 692345
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.contar).toEqual(692345)
  })

  it('propiedad computada mostrarRevision funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroStk, {
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

  it('propiedad computada mostrarComentadas funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroStk, {
      data() {
        return {
          listaComentadas: [
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
    expect(wrapper.vm.mostrarComentadas).toBeTruthy()
  })

  it('propiedad computada mostrarComentadas funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarComentadas).toBeFalsy()
  })

  it('propiedad computada mostrarRespondidasGrupo funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroStk, {
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

  it('propiedad computada mostrarRespondidasCliente funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroStk, {
      data() {
        return {
          listaRespondidasCliente: [
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
                abreviacion: 'RSK',
                descripcion: 'Respondida por el cliente'
              }
            }
          ]
        }
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.mostrarRespondidasCliente).toBeTruthy()
  })

  it('propiedad computada mostrarRespondidasCliente funciona correctamente con false', () => {
    expect(wrapper.vm.mostrarRespondidasCliente).toBeFalsy()
  })

  it('propiedad computada mostrarCerradas funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroStk, {
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

  it('método elegirTab funciona correctamente', () => {
    wrapper.vm.elegirTab('Revision')
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('método convertirFecha funciona correctamente para valores null', () => {
    expect(wrapper.vm.convertirFecha(null)).toEqual('')
  })

  it('método convertirFecha funciona correctamente para valores undefined', () => {
    expect(wrapper.vm.convertirFecha(undefined)).toEqual('')
  })

  it('método convertirFecha funciona correctamente para valores fecha', () => {
    expect(wrapper.vm.convertirFecha('2020-11-19T17:45:00.000Z')).toEqual('19-11-2020')
  })

  it('método categorizarMinutas funciona correctamente' , () => {
    const wrapper = shallowMount(TableroStk, {
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
    expect(wrapper.vm.listaRevision.length).toEqual(1)
    expect(wrapper.vm.listaCerradas.length).toEqual(1)
    expect(wrapper.vm.listaComentadas.length).toEqual(1)
    expect(wrapper.vm.listaRespondidasGrupo.length).toEqual(1)
    expect(wrapper.vm.listaRespondidasCliente.length).toEqual(1)
  })
})
