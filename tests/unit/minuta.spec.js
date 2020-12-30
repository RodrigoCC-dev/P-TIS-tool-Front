import { shallowMount, mount } from '@vue/test-utils'
import Minuta from '@/components/Minuta.vue'
import { nextTick } from 'vue'

describe('Minuta.vue', () => {
  it('se asigna prop "tipoMinuta" adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        tipoMinuta: 2
      }
    })
    expect(wrapper.props().tipoMinuta).toBe(2)
  })

  it('se asigna prop "idBitacora" adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        idBitacora: 3
      }
    })
    expect(wrapper.props().idBitacora).toBe(3)
  })

  it('se asigna prop "idMotivo" adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        idMotivo: 5
      }
    })
    expect(wrapper.props().idMotivo).toBe(5)
  })

  it('se asigna prop "letraRevision" adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        letraRevision: 'Q'
      }
    })
    expect(wrapper.props().letraRevision).toBe('Q')
  })

  it('se asigna prop "reEmitir" adecuadamente como "true"', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        reEmitir: true
      }
    })
    expect(wrapper.props().reEmitir).toBeTruthy()
  })

  it('se asigna prop "reEmitir" adecuadamente como "false"', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        reEmitir: false
      }
    })
    expect(wrapper.props().reEmitir).toBeFalsy()
  })

  it('variable "bitacora" se inicializa correctamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        idBitacora: 345
      }
    })
    expect(wrapper.vm.bitacora).toEqual(345)
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
    const wrapper = shallowMount(Minuta, {
      propsData: {
        tipoMinuta: 1,
        idBitacora: 0,
        idMotivo: 1,
        letraRevision: 'A',
        reEmitir: false
      }
    })
    expect(wrapper.vm.revision).toEqual('A')
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
    const wrapper = shallowMount(Minuta, {
      propsData: {
        tipoMinuta: 1,
        idBitacora: 0,
        idMotivo: 6,
        letraRevision: 'A',
        reEmitir: false
      }
    })
    expect(wrapper.vm.motivo_id).toEqual(6)
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

  it('variable "nuevaEmision" se inicializa correctamente con "true"', () => {
    const wrapper = shallowMount(Minuta, {
      propsData: {
        tipoMinuta: 1,
        idBitacora: 0,
        idMotivo: 6,
        letraRevision: 'A',
        reEmitir: true
      }
    })
    expect(wrapper.vm.nuevaEmision).toBeTruthy()
  })

  it('variable "nuevaEmision" se inicializa correctamente con "false"', () => {
    const wrapper = shallowMount(Minuta, {
      propsData: {
        tipoMinuta: 1,
        idBitacora: 0,
        idMotivo: 6,
        letraRevision: 'A',
        reEmitir: false
      }
    })
    expect(wrapper.vm.nuevaEmision).toBeFalsy()
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
      {estudiante: 5, stakeholder: '', asistencia: 3},
      {estudiante: 6, stakeholder: '', asistencia: 1}
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
            id: 462353,
            nombre: 'Proyecto de prueba',
            proyecto: 'Pagina web de prueba',
            correlativo: 46234543,
            estudiantes: [
              { id: 5, iniciales: 'CGL', usuario: {
                nombre: 'Carlos',
                apellido_paterno: 'Gonzalez',
                apellido_materno: 'Lopez'
              }
            },
              { id: 6, iniciales: 'FDT', usuario: {
                nombre: 'Fernanda',
                apellido_paterno: 'Díaz',
                apellido_materno: 'Torres'
              }
            }
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
      {estudiante: '', stakeholder: 5, asistencia: 3},
      {estudiante: '', stakeholder: 6, asistencia: 1}
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
            id: 462353,
            nombre: 'Proyecto de prueba',
            proyecto: 'Pagina web de prueba',
            correlativo: 46234543,
            stakeholders: [
              { id: 5, iniciales: 'CGL', usuario: {
                nombre: 'Carlos',
                apellido_paterno: 'Gonzalez',
                apellido_materno: 'Lopez'
              }
            },
              { id: 6, iniciales: 'FDT', usuario: {
                nombre: 'Fernanda',
                apellido_paterno: 'Díaz',
                apellido_materno: 'Torres'
              }
            }
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

  it('método "validarRevision" funciona correctamente para "revision" igual a ""', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          revision: ''
        }
      }
    })
    expect(wrapper.vm.validarRevision()).toBeFalsy()
    expect(wrapper.vm.entradas.revision.error).toBeTruthy()
    expect(wrapper.vm.entradas.revision.mensaje).toEqual('No se ha ingresado la revisión de la minuta')
  })

  it('método "validarRevision" funciona correctamente para "revision" igual a "undefined"', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          revision: undefined
        }
      }
    })
    expect(wrapper.vm.validarRevision()).toBeFalsy()
    expect(wrapper.vm.entradas.revision.error).toBeTruthy()
    expect(wrapper.vm.entradas.revision.mensaje).toEqual('No se ha ingresado la revisión de la minuta')
  })

  it('método "validarRevision" funciona correctamente para "revision" distinto a regExp', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          revision: 'Abc'
        }
      }
    })
    expect(wrapper.vm.validarRevision()).toBeFalsy()
    expect(wrapper.vm.entradas.revision.error).toBeTruthy()
    expect(wrapper.vm.entradas.revision.mensaje).toEqual('Sólo letras mayúsculas o números')
  })

  it('método "validarRevision" funciona correctamente para "revision" con letra mayúscula', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          revision: 'Z'
        }
      }
    })
    expect(wrapper.vm.validarRevision()).toBeTruthy()
    expect(wrapper.vm.entradas.revision.error).toBeFalsy()
    expect(wrapper.vm.entradas.revision.mensaje).toEqual('')
  })

  it('método "validarRevision" funciona correctamente para "revision" con número', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          revision: 5
        }
      }
    })
    expect(wrapper.vm.validarRevision()).toBeTruthy()
    expect(wrapper.vm.entradas.revision.error).toBeFalsy()
    expect(wrapper.vm.entradas.revision.mensaje).toEqual('')
  })

  it('método "validarFecha" funciona correctamente para "fecha_reunion" igual a ""', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            fecha_reunion: ''
          }
        }
      }
    })
    expect(wrapper.vm.validarFecha()).toBeFalsy()
    expect(wrapper.vm.entradas.fecha_reunion).toBeTruthy()
  })

  it('método "validarFecha" funciona correctamente para "fecha_reunion" igual a undefined', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            fecha_reunion: undefined
          }
        }
      }
    })
    expect(wrapper.vm.validarFecha()).toBeFalsy()
    expect(wrapper.vm.entradas.fecha_reunion).toBeTruthy()
  })

  it('método "validarFecha" funciona correctamente para "fecha_reunion" distinto a regExp', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            fecha_reunion: '642345-6345-1346'
          }
        }
      }
    })
    expect(wrapper.vm.validarFecha()).toBeFalsy()
    expect(wrapper.vm.entradas.fecha_reunion).toBeTruthy()
  })

  it('método "validarFecha" funciona correctamente para "fecha_reunion" con regExp correcto', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            fecha_reunion: '2020-03-13'
          }
        }
      }
    })
    expect(wrapper.vm.validarFecha()).toBeTruthy()
    expect(wrapper.vm.entradas.fecha_reunion).toBeFalsy()
  })

  it('método "validarHora" funciona correctamente para "hora" distinta a regExp', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.validarHora('46345:622523')).toBeFalsy()
  })

  it('método "validarHora" funciona correctamente para "hora" con regExp correcto', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.validarHora('12:23')).toBeTruthy()
  })

  it('método "validarHinicio" funciona correctamente para "h_inicio" distinta a regExp', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            h_inicio: '46345:622523'
          }
        }
      }
    })
    expect(wrapper.vm.validarHinicio()).toBeFalsy()
    expect(wrapper.vm.entradas.h_inicio).toBeTruthy()
  })

  it('método "validarHinicio" funciona correctamente para "h_inicio" con regExp correcto', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            h_inicio: '13:23'
          }
        }
      }
    })
    expect(wrapper.vm.validarHinicio()).toBeTruthy()
    expect(wrapper.vm.entradas.h_inicio).toBeFalsy()
  })

  it('método "validarHtermino" funciona correctamente para "h_termino" distinta a regExp', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            h_termino: '46345:622523'
          }
        }
      }
    })
    expect(wrapper.vm.validarHtermino()).toBeFalsy()
    expect(wrapper.vm.entradas.h_termino).toBeTruthy()
  })

  it('método "validarHtermino" funciona correctamente para "h_termino" con regExp correcto', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          minuta: {
            h_termino: '13:23'
          }
        }
      }
    })
    expect(wrapper.vm.validarHtermino()).toBeTruthy()
    expect(wrapper.vm.entradas.h_termino).toBeFalsy()
  })

  it('método "validarTema" funciona correctamente para "tema" igual a ""', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          tema: ''
        }
      }
    })
    expect(wrapper.vm.validarTema()).toBeFalsy()
    expect(wrapper.vm.entradas.tema).toBeTruthy()
  })

  it('método "validarTema" funciona correctamente para "tema" distinto a ""', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          tema: 'Es un tema de prueba'
        }
      }
    })
    expect(wrapper.vm.validarTema()).toBeTruthy()
    expect(wrapper.vm.entradas.tema).toBeFalsy()
  })

  it('método "limpiarAsistencias" funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          entradas: {
            revision: {
              error: false,
              mensaje: ''
            },
            fecha_reunion: false,
            tema: false,
            h_inicio: false,
            h_termino: false,
            asistencias: true,
            clasificacion: false,
            objetivos: false,
            conclusiones: false
          }
        }
      }
    })
    wrapper.vm.limpiarAsistencias()
    expect(wrapper.vm.entradas.asistencias).toBeFalsy()
  })

  it('método "validarAsistencia" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          grupo: {
            id: 462353,
            nombre: 'Proyecto de prueba',
            proyecto: 'Pagina web de prueba',
            correlativo: 46234543,
            estudiantes: [
              { id: 5, iniciales: 'CGL', usuario: {
                nombre: 'Carlos',
                apellido_paterno: 'Gonzalez',
                apellido_materno: 'Lopez'
              }
            },
              { id: 6, iniciales: 'FDT', usuario: {
                nombre: 'Fernanda',
                apellido_paterno: 'Díaz',
                apellido_materno: 'Torres'
              }
            }
            ]
          }
        }
      }
    })
    expect(wrapper.vm.validarAsistencia()).toBeFalsy()
    expect(wrapper.vm.entradas.asistencias).toBeTruthy()
  })

  it('método "validarAsistencia" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          grupo: {
            id: 462353,
            nombre: 'Proyecto de prueba',
            proyecto: 'Pagina web de prueba',
            correlativo: 46234543,
            estudiantes: [
              { id: 5, iniciales: 'CGL', usuario: {
                nombre: 'Carlos',
                apellido_paterno: 'Gonzalez',
                apellido_materno: 'Lopez'
              }
            },
              { id: 6, iniciales: 'FDT', usuario: {
                nombre: 'Fernanda',
                apellido_paterno: 'Díaz',
                apellido_materno: 'Torres'
              }
            }
            ]
          },
          asistenciaEst: [
            {estudiante: 46345, stakeholder: '', asistencia: 46345},
            {estudiante: 668694, stakeholder: '', asistencia: 161434}
          ]
        }
      }
    })
    expect(wrapper.vm.validarAsistencia()).toBeTruthy()
    expect(wrapper.vm.entradas.asistencias).toBeFalsy()
  })

  it('método "limpiarClasificacion" funciona correctamente', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          entradas: {
            revision: {
              error: false,
              mensaje: ''
            },
            fecha_reunion: false,
            tema: false,
            h_inicio: false,
            h_termino: false,
            asistencias: false,
            clasificacion: true,
            objetivos: false,
            conclusiones: false
          }
        }
      }
    })
    wrapper.vm.limpiarClasificacion()
    expect(wrapper.vm.entradas.clasificacion).toBeFalsy()
  })

  it('método "validarClasificacion" funciona correctamente para false', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.validarClasificacion()).toBeFalsy()
    expect(wrapper.vm.entradas.clasificacion).toBeTruthy()
  })

  it('método "validarClasificacion" funciona correctamente para false', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          listaClasificacion: ['informativa', 'decisión'],
          entradas: {
            revision: {
              error: false,
              mensaje: ''
            },
            fecha_reunion: false,
            tema: false,
            h_inicio: false,
            h_termino: false,
            asistencias: false,
            clasificacion: true,
            objetivos: false,
            conclusiones: false
          }
        }
      }
    })
    expect(wrapper.vm.validarClasificacion()).toBeTruthy()
    expect(wrapper.vm.entradas.clasificacion).toBeFalsy()
  })

  it('método "validarObjetivos" funciona correctamente para largo igual a 1 y valor "false"', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.validarObjetivos()).toBeFalsy()
    expect(wrapper.vm.entradas.objetivos).toBeTruthy()
  })

  it('método "validarObjetivos" funciona correctamente para largo igual a 1 y valor "true"', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          objetivos: [{id: 0, descripcion: 'Objetivo de prueba'}],
          entradas: {
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
            objetivos: true,
            conclusiones: false
          }
        }
      }
    })
    expect(wrapper.vm.validarObjetivos()).toBeTruthy()
    expect(wrapper.vm.entradas.objetivos).toBeFalsy()
  })

  it('método "validarObjetivos" funciona correctamente para largo mayor a 1 y valor "false"', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          objetivos: [{id: 0, descripcion: 'Objetivo de prueba'},
        {id:0, descripcion: ''}],
          entradas: {
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
        }
      }
    })
    expect(wrapper.vm.validarObjetivos()).toBeFalsy()
    expect(wrapper.vm.entradas.objetivos).toBeTruthy()
  })

  it('método "validarObjetivos" funciona correctamente para largo mayor a 1 y valor "true"', () => {
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          objetivos: [{id: 0, descripcion: 'Objetivo de prueba'},
        {id: 0, descripcion: 'Otro objetivo de prueba'}],
          entradas: {
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
        }
      }
    })
    expect(wrapper.vm.validarObjetivos()).toBeTruthy()
    expect(wrapper.vm.entradas.objetivos).toBeFalsy()
  })
})
