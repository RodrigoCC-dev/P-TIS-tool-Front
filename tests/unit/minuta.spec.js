import { shallowMount, mount } from '@vue/test-utils'
import Minuta from '@/components/Minuta.vue'
import { nextTick } from 'vue'

describe('Minuta.vue', () => {
  it('se asigna prop adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        tipoMinuta: 2
      }
    })
    expect(wrapper.props().tipoMinuta).toBe(2)
  })

  it('se asigna prop idBitacora adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        idBitacora: 3
      }
    })
    expect(wrapper.props().idBitacora).toBe(3)
  })

  it('variable minuta se inicializa correctamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        tipoMinuta: 2
      }
    })
    const minuta = {
      estudiante_id: 0,
      codigo: '',
      correlativo: 0,
      fecha_reunion: '',
      h_inicio: '',
      h_termino: '',
      tipo_minuta_id: 2,
      tipo: ''
    }
    expect(wrapper.vm.minuta).toEqual(minuta)
  })

  it('variable clasificacion se inicializa correctamente', () => {
    const clasificacion = {
      informativa: false,
      avance: false,
      coordinacion: false,
      decision: false,
      otro: false
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.clasificacion).toEqual(clasificacion)
  })

  it('variable tema se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tema).toEqual('')
  })

  it('variable revision se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.revision).toEqual('')
  })

  it('variable asistenciaEst se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.asistenciaEst).toEqual([])
  })

  it('variable asistenciaStk se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.asistenciaStk).toEqual([])
  })

  it('variable objetivos se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.objetivos).toEqual([{id: 0, descripcion: ''}])
  })

  it('variable conclusiones se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.conclusiones).toEqual([{id: 0, descripcion: ''}])
  })

  it('variable item se inicializa correctamente', () => {
    const item = {
      correlativo: 0,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: {tipo: '', id: 0},
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.item).toEqual(item)
  })

  it('variable motivo_id se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.motivo_id).toEqual(1)
  })

  it('variable listaItems se inicializa correctamente', () => {
    const lista = [{
      correlativo: 1,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: {tipo: '', id: 0},
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }]
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.listaItems).toEqual(lista)
  })

  it('variable tipo_items se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tipo_items).toEqual([])
  })

  it('variable tipo_asistencias se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tipo_asistencias).toEqual([])
  })

  it('variable tipo_estados se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tipo_estados).toEqual([])
  })

  it('variable motivos se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.motivos).toEqual([])
  })

  it('variable listaClasificacion se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.listaClasificacion).toEqual([])
  })

  it('variable estudiante se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.estudiante).toEqual({})
  })

  it('variable grupo se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.grupo).toEqual({})
  })

  it('variable semestre se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.semestre).toEqual({})
  })

  it('variable entradas se inicializa correctamente', () => {
    const entrada = {
      revision: {
        error: false,
        mensaje: ''
      },
      fecha_reunion: false,
      tema: false,
      h_inicio: false,
      h_termino: false,
      asistencias: false,
      clasificacion: false,
      objetivos: false,
      conclusiones: false
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.entradas).toEqual(entrada)
  })

  it('propiedad computada esBorrador funciona correctamente con true', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        idBitacora: 3
      }
    })
    expect(wrapper.vm.esBorrador).toBeTruthy()
  })

  it('propiedad computada esBorrador funciona correctamente con false', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        idBitacora: 0
      }
    })
    expect(wrapper.vm.esBorrador).toBeFalsy()
  })

  it('método removeFromArray funciona correctamente', () => {
    const array = ['Papa', 'Manzana', 'Naranja']
    const resultado = ['Manzana', 'Naranja']
    const wrapper = shallowMount(Minuta)
    wrapper.vm.removeFromArray(array, 'Papa')
    expect(array).toEqual(resultado)
  })

  it('método nombreCompleto funciona correctamente', () => {
    const estudiante = {
      nombre: 'Pablo',
      apellido_paterno: 'Mackena',
      apellido_materno: 'Saldias'
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Pablo Mackena Saldias')
  })

  it('método convertirFecha funciona correctamente', () => {
    const fecha = '2020-12-04T13:03:50.000Z'
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.convertirFecha(fecha)).toEqual('2020-12-04')
  })

  it('método buscarIdEnLista funciona correctamente', () => {
    const array = [{
      id: 1,
      abreviacion: 'BO'
    },
    {
      id: 2,
      abreviacion: 'QU'
    }]
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.buscarIdEnLista(array, 'abreviacion', 'QU')).toEqual(2)
  })

  it('método obtenerTipoMinuta funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta:{
            tipo_minuta_id: 1,
            tipo: ''
          },
          tipoMinutas: [
          {
            id: 1,
            tipo: 'Coordinacion'
          },
          {
            id: 2,
            tipo: 'Cliente'
          }
          ]
        }
      }
    })
    wrapper.vm.obtenerTipoMinuta()
    expect(wrapper.vm.minuta.tipo).toEqual('Coordinacion')
  })

  it('método obtenerTipoMinuta funciona correctamente con tipo_minuta_id null', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta:{
            tipo_minuta_id: null,
            tipo: ''
          },
          tipoMinutas: [
          {
            id: 1,
            tipo: 'Coordinacion'
          },
          {
            id: 2,
            tipo: 'Cliente'
          }
          ]
        }
      }
    })
    wrapper.vm.obtenerTipoMinuta()
    expect(wrapper.vm.minuta.tipo).toEqual('')
  })

  it('método convertirClasificacion funciona correctamente', () => {
    const clasificacion = {
      informativa: false,
      avance: true,
      coordinacion: false,
      decision: true,
      otro: false
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.convertirClasificacion(clasificacion)).toEqual(['avance', 'decision'])
  })

  it('método convertirResponsable funciona correctamente para estudiantes', () => {
    const lista = [
      {
        id: 8,
        iniciales: 'FDT',
        id_estudiante: 6,
        id_stakeholder: null,
        tipo: 'PRE',
        descripcion: 'Presente'
      },
      {
        id: 7,
        iniciales: 'CGL',
        id_estudiante: 5,
        id_stakeholder: null,
        tipo: 'ACA',
        descripcion: 'Ausente con aviso'
      }
    ]
    const responsable = {
      id: 7,
      asistencia_id: 8
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.convertirResponsable(lista, responsable)).toEqual({tipo: 'est', id: 6})
  })

  it('método convertirResponsable funciona correctamente para stakeholders', () => {
    const lista = [
      {
        id: 8,
        iniciales: 'FDT',
        id_estudiante: null,
        id_stakeholder: 6,
        tipo: 'PRE',
        descripcion: 'Presente'
      },
      {
        id: 7,
        iniciales: 'CGL',
        id_estudiante: null,
        id_stakeholder: 5,
        tipo: 'ACA',
        descripcion: 'Ausente con aviso'
      }
    ]
    const responsable = {
      id: 7,
      asistencia_id: 8
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.convertirResponsable(lista, responsable)).toEqual({tipo: 'stk', id: 6})
  })

  it('método convertirResponsable funciona correctamente para estudiantes y stakeholders null', () => {
    const lista = [
      {
        id: 8,
        iniciales: 'FDT',
        id_estudiante: null,
        id_stakeholder: null,
        tipo: 'PRE',
        descripcion: 'Presente'
      },
      {
        id: 7,
        iniciales: 'CGL',
        id_estudiante: 5,
        id_stakeholder: null,
        tipo: 'ACA',
        descripcion: 'Ausente con aviso'
      }
    ]
    const responsable = {
      id: 7,
      asistencia_id: 8
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.convertirResponsable(lista, responsable)).toEqual({tipo: '', id: 0})
  })

  it('método convertirItems funciona correctamente', () => {
    const lista = [
      {
        id: 5,
        tipo: 'Info',
        correlativo: 2,
        descripcion: 'Item de prueba 1',
        fecha: null,
        responsables: [
          {
            id: 3,
            asistencia_id: 8
          }
        ]
      },
      {
        id: 6,
        tipo: 'Info',
        correlativo: 1,
        descripcion: 'Item de prueba 2',
        fecha: '2020-11-18T00:00:00.000Z',
        responsables: []
      }
    ]
    const asistencia = [
      {
        id: 8,
        iniciales: 'FDT',
        id_estudiante: 6,
        id_stakeholder: null,
        tipo: 'PRE',
        descripcion: 'Presente'
      },
      {
        id: 7,
        iniciales: 'CGL',
        id_estudiante: 5,
        id_stakeholder: null,
        tipo: 'ACA',
        descripcion: 'Ausente con aviso'
      }
    ]
    const esperado = [
      {
        correlativo: 1,
        descripcion: 'Item de prueba 2',
        fecha: '2020-11-18',
        tipo_item_id: 2,
        responsables: 0,
        entradas: {
          descripcion: false,
          fecha: false,
          tipo_item: false,
          responsables: false
        }
      },
      {
        correlativo: 2,
        descripcion: 'Item de prueba 1',
        fecha: '',
        tipo_item_id: 2,
        responsables: {tipo: 'est', id: 6},
        entradas: {
          descripcion: false,
          fecha: false,
          tipo_item: false,
          responsables: false
        }
      }
    ]
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          tipo_items: [
            {
              id: 2,
              tipo: 'Info'
            }
          ]
        }
      }
    })
    expect(wrapper.vm.convertirItems(lista, asistencia)).toEqual(esperado)
  })

  it('método convertirAsistenciaEst funciona correctamente', () => {
    const array = [
      {
        id: 8,
        iniciales: 'FDT',
        id_estudiante: 6,
        id_stakeholder: null,
        tipo: 'PRE',
      },
      {
        id: 7,
        iniciales: 'CGL',
        id_estudiante: 5,
        id_stakeholder: null,
        tipo: 'ACA'
      }
    ]
    const esperado = [
      {estudiante: 5, asistencia: 3},
      {estudiante: 6, asistencia: 1}
    ]
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          tipo_asistencias: [
            { id: 1, tipo: 'PRE'},
            { id: 2, tipo: 'AUS'},
            { id: 3, tipo: 'ACA'}
          ],
          grupo: {
            estudiantes: [
              { id: 5, iniciales: 'CGL'},
              { id: 6, iniciales: 'FDT'}
            ]
          }
        }
      }
    })
    expect(wrapper.vm.convertirAsistenciaEst(array)).toEqual(esperado)
  })

  it('método convertirAsistenciaStk funciona correctamente', () => {
    const array = [
      {
        id: 8,
        iniciales: 'FDT',
        id_estudiante: null,
        id_stakeholder: 6,
        tipo: 'PRE',
      },
      {
        id: 7,
        iniciales: 'CGL',
        id_estudiante: null,
        id_stakeholder: 5,
        tipo: 'ACA'
      }
    ]
    const esperado = [
      {stakeholder: 5, asistencia: 3},
      {stakeholder: 6, asistencia: 1}
    ]
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          tipo_asistencias: [
            { id: 1, tipo: 'PRE'},
            { id: 2, tipo: 'AUS'},
            { id: 3, tipo: 'ACA'}
          ],
          grupo: {
            stakeholders: [
              { id: 5, iniciales: 'CGL'},
              { id: 6, iniciales: 'FDT'}
            ]
          }
        }
      }
    })
    expect(wrapper.vm.convertirAsistenciaStk(array)).toEqual(esperado)
  })

  it('método agregarItem funciona correctamente', () => {
    const nuevo = {
      correlativo: 2,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: {tipo: '', id: 0},
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }
    const wrapper = shallowMount(Minuta)
    wrapper.vm.agregarItem()
    expect(wrapper.vm.listaItems[1]).toEqual(nuevo)
  })

  it('método removerItem funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          listaItems: [
            {
              correlativo: 1,
              descripcion: '',
              fecha: '',
              tipo_item_id: 0,
              responsables: 0,
              entradas: {
                descripcion: false,
                fecha: false,
                tipo_item: false,
                responsables: false
              }
            },
            {
              correlativo: 2,
              descripcion: '',
              fecha: '',
              tipo_item_id: 0,
              responsables: 0,
              entradas: {
                descripcion: false,
                fecha: false,
                tipo_item: false,
                responsables: false
              }
            }
          ]
        }
      }
    })
    wrapper.vm.removerItem(wrapper.vm.listaItems[0])
    expect(wrapper.vm.listaItems.length).toEqual(1)
  })

  it('método agregarObjetivo funciona correctamente', () => {
    const wrapper = shallowMount(Minuta)
    wrapper.vm.agregarObjetivo()
    expect(wrapper.vm.objetivos.length).toEqual(2)
  })

  it('método removerObjetivo funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          objetivos: ['Obj1', 'Obj2']
        }
      }
    })
    wrapper.vm.removerObjetivo(wrapper.vm.objetivos[0])
    expect(wrapper.vm.objetivos.length).toEqual(1)
  })

  it('método agregarConclusion funciona correctamente', () => {
    const wrapper = shallowMount(Minuta)
    wrapper.vm.agregarConclusion()
    expect(wrapper.vm.conclusiones.length).toEqual(2)
  })

  it('método removerConclusion funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          conclusiones: ['Con1', 'Con2']
        }
      }
    })
    wrapper.vm.removerConclusion(wrapper.vm.conclusiones[0])
    expect(wrapper.vm.conclusiones.length).toEqual(1)
  })

  it('método limpiarCampos funciona correctamente', () => {
    const minuta = {
      estudiante_id: 0,
      codigo: '',
      correlativo: 0,
      fecha_reunion: '',
      h_inicio: '',
      h_termino: '',
      tipo_minuta_id: 2
    }
    const clasificacion = {
      informativa: false,
      avance: false,
      coordinacion: false,
      decision: false,
      otro: false
    }
    const listaItems = [
      {
        correlativo: 1,
        descripcion: '',
        fecha: '',
        tipo_item_id: 0,
        responsables: 0,
        entradas: {
          descripcion: false,
          fecha: false,
          tipo_item: false,
          responsables: false
        }
      }
    ]
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            estudiante_id: 5,
            codigo: 'Cualquiercosa',
            correlativo: 20,
            fecha_reunion: '2020-11-12',
            h_inicio: '10:30',
            h_termino: '11:30',
            tipo_minuta_id: 1
          },
          clasificacion: {
            informativa: false,
            avance: true,
            coordinacion: false,
            decision: true,
            otro: false
          },
          tema: 'Esto es una prueba',
          revision: 'T',
          asistenciaEst: [
            {estudiante: 5, asistencia: 3}
          ],
          asistenciaStk: [
            {stakeholder: 3, asistencia: 2}
          ],
          objetivos: ['Obj1', 'Obj2'],
          conclusiones: ['Con1', 'Con2'],
          motivo_id: 5,
          listaItems: [
            {
              correlativo: 1,
              descripcion: '',
              fecha: '',
              tipo_item_id: 0,
              responsables: 0,
              entradas: {
                descripcion: false,
                fecha: false,
                tipo_item: false,
                responsables: false
              }
            },
            {
              correlativo: 2,
              descripcion: '',
              fecha: '',
              tipo_item_id: 0,
              responsables: 0,
              entradas: {
                descripcion: false,
                fecha: false,
                tipo_item: false,
                responsables: false
              }
            }
          ]
        }
      },
      propsData: {
        tipoMinuta: 2
      }
    })
    wrapper.vm.limpiarCampos()
    expect(wrapper.vm.minuta).toEqual(minuta)
    expect(wrapper.vm.clasificacion).toEqual(clasificacion)
    expect(wrapper.vm.tema).toEqual('')
    expect(wrapper.vm.revision).toEqual('')
    expect(wrapper.vm.asistenciaEst).toEqual([])
    expect(wrapper.vm.asistenciaStk).toEqual([])
    expect(wrapper.vm.objetivos).toEqual([''])
    expect(wrapper.vm.conclusiones).toEqual([''])
    expect(wrapper.vm.motivo_id).toEqual(1)
    expect(wrapper.vm.listaItems).toEqual(listaItems)
  })

  // Faltan métodos que incluyen 'axios'

  it('método establecerId funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          estudiante: {
            id: 5
          }
        }
      }
    })
    wrapper.vm.establecerId()
    expect(wrapper.vm.minuta.estudiante_id).toEqual(5)
  })

  it('método establecerClasificacion funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          listaClasificacion: ['informativa', 'otro']
        }
      }
    })
    wrapper.vm.establecerClasificacion()
    expect(wrapper.vm.clasificacion.informativa).toBeTruthy()
    expect(wrapper.vm.clasificacion.avance).toBeFalsy()
    expect(wrapper.vm.clasificacion.decision).toBeFalsy()
    expect(wrapper.vm.clasificacion.coordinacion).toBeFalsy()
    expect(wrapper.vm.clasificacion.otro).toBeTruthy()
  })

  it('método establecerCodigo funciona correctamente', () => {
    const codigo = 'MINUTA_G02_04_2020-2_1112'
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            correlativo: 4,
            fecha_reunion: '2020-11-12'
          },
          semestre: {
            agno: 2020,
            numero: 2
          },
          grupo: {
            nombre: 'G02'
          }
        }
      }
    })
    expect(wrapper.vm.establecerCodigo()).toEqual(codigo)
  })
})
