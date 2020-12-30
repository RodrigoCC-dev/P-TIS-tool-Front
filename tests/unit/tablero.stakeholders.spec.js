import { shallowMount } from '@vue/test-utils'
import TableroStk from '@/components/TableroStk.vue'

describe('TableroStk.vue', () => {
  it('se asigna props "contador" adecuadamente', () => {
    const wrapper = shallowMount(TableroStk, {
      propsData: {
        contador: 63453
      }
    })
    expect(wrapper.props().contador).toEqual(63453)
  })

  it('variable nombreTab se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable listaRevision se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaRevision).toEqual([])
  })

  it('variable listaComentadas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaComentadas).toEqual([])
  })

  it('variable listaRespondidasGrupo se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaRespondidasGrupo).toEqual([])
  })

  it('variable listaRespondidasCliente se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaRespondidasCliente).toEqual([])
  })

  it('variable listaCerradas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaCerradas).toEqual([])
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      revision: 'Revision',
      comentadas: 'Comentadas',
      respondidas: 'Respondidas',
      cerradas: 'Cerradas'
    }
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('variable "contar" se asigna con props correctamente', () => {
    const wrapper = shallowMount(TableroStk, {
      propsData: {
        contador: 692345
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
      }
    })
    expect(wrapper.vm.mostrarRevision).toBeTruthy()
  })

  it('propiedad computada mostrarRevision funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroStk)
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
      }
    })
    expect(wrapper.vm.mostrarComentadas).toBeTruthy()
  })

  it('propiedad computada mostrarComentadas funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroStk)
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
      }
    })
    expect(wrapper.vm.mostrarRespondidasGrupo).toBeTruthy()
  })

  it('propiedad computada mostrarRespondidasGrupo funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroStk)
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
      }
    })
    expect(wrapper.vm.mostrarRespondidasCliente).toBeTruthy()
  })

  it('propiedad computada mostrarRespondidasCliente funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroStk)
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
      }
    })
    expect(wrapper.vm.mostrarCerradas).toBeTruthy()
  })

  it('propiedad computada mostrarCerradas funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.mostrarCerradas).toBeFalsy()
  })

  it('método elegirTab funciona correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    wrapper.vm.elegirTab('Revision')
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('método convertirFecha funciona correctamente para valores null', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.convertirFecha(null)).toEqual('')
  })

  it('método convertirFecha funciona correctamente para valores undefined', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.convertirFecha(undefined)).toEqual('')
  })

  it('método convertirFecha funciona correctamente para valores fecha', () => {
    const wrapper = shallowMount(TableroStk)
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
