import { shallowMount } from '@vue/test-utils'
import TableroEst from '@/components/TableroEst.vue'

describe('TableroEst.vue', () => {
  it('se asigna prop "seleccionado" correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        seleccionado: 4534515
      }
    })
    expect(wrapper.props().seleccionado).toEqual(4534515)
  })

  it('se asigna prop "contador" correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        contador: 94045923
      }
    })
    expect(wrapper.props().contador).toEqual(94045923)
  })

  it('variable nombreTab de inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
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
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable listaBorradores se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaBorradores).toEqual([])
  })

  it('variable listaComentadasGrupo se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaComentadasGrupo).toEqual([])
  })

  it('variable listaComentadasCliente se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaComentadasCliente).toEqual([])
  })

  it('variable listaRespondidasGrupo se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaRespondidasGrupo).toEqual([])
  })

  it('variable listaRespondidasCliente se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaRespondidasCliente).toEqual([])
  })

  it('variable listaCerradas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaCerradas).toEqual([])
  })

  it('variable listaEmitidas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaEmitidas).toEqual([])
  })

  it('variable listaRevision se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaRevision).toEqual([])
  })

  it('variable "contar" se asigna con props correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        contador: 0
      }
    })
    expect(wrapper.vm.contar).toEqual(0)
  })

  it('variable "minutaActual" se inicializa con props correctamente', () => {
    const wrapper = shallowMount(TableroEst, {
      propsData: {
        seleccionado: 462345
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
      }
    })
    expect(wrapper.vm.mostrarBorradores).toBeTruthy()
  })

  it('propiedad computada mostrarBorradores funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
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
      }
    })
    expect(wrapper.vm.mostrarEmitidas).toBeTruthy()
  })

  it('propiedad computada mostrarEmitidas funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
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
      }
    })
    expect(wrapper.vm.mostrarCerradas).toBeTruthy()
  })

  it('propiedad computada mostrarCerradas funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
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
      }
    })
    expect(wrapper.vm.mostrarComentadasGrupo).toBeTruthy()
  })

  it('propiedad computada mostrarComentadasGrupo funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
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
      }
    })
    expect(wrapper.vm.mostrarComentadasCliente).toBeTruthy()
  })

  it('propiedad computada mostrarComentadasCliente funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
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
      }
    })
    expect(wrapper.vm.mostrarRespondidasGrupo).toBeTruthy()
  })

  it('propiedad computada mostrarRespondidasGrupo funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.mostrarRespondidasGrupo).toBeFalsy()
  })

  it('propiedad computada mostrarRespondidasCliente funciona correctamente con true', () => {
    const wrapper = shallowMount(TableroEst, {
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
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.mostrarRespondidasCliente).toBeFalsy()
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
      }
    })
    expect(wrapper.vm.mostrarRevision).toBeTruthy()
  })

  it('propiedad computada mostrarRevision funciona correctamente con false', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.mostrarRevision).toBeFalsy()
  })

  it('método elegirTab funciona correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    wrapper.vm.elegirTab('Revision')
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('método convertirFecha funciona correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.convertirFecha('2020-11-19T17:45:00.000Z')).toEqual('19-11-2020')
  })

  it('método convertirFecha funciona correctamente con entrada null', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.convertirFecha(null)).toEqual('')
  })

  it('método convertirFecha funciona correctamente con entrada undefined', () => {
    const wrapper = shallowMount(TableroEst)
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
      }
    })
    wrapper.vm.categorizarMinutas()
    expect(wrapper.vm.listaBorradores.length).toEqual(1)
    expect(wrapper.vm.listaEmitidas.length).toEqual(1)
    expect(wrapper.vm.listaCerradas.length).toEqual(1)
    expect(wrapper.vm.listaComentadasGrupo.length).toEqual(1)
    expect(wrapper.vm.listaComentadasCliente.length).toEqual(1)
    expect(wrapper.vm.listaRespondidasCliente.length).toEqual(1)
  })
})
