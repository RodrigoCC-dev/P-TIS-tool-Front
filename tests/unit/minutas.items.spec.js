import { shallowMount } from '@vue/test-utils'
import Items from '@/components/minutas/Items.vue'

describe('Items.vue', () => {
  const lista = [
    {
      id: 14635,
      tipo: 'Info',
      correlativo: 2453,
      descripcion: 'Este es un item de prueba',
      fecha: null,
      responsables: []
    },
    {
      id: 46245,
      tipo: 'Compromiso',
      correlativo: 2445,
      descripcion: 'Este es otro item de prueba',
      fecha: '2020-06-15T00:00:00.000Z',
      responsables: [
        {
          id: 454,
          asistencia_id: 43
        }
      ]
    }
  ]
  const presentes = [
    {
      id: 43,
      iniciales: 'BRG',
      tipo: 'PRE',
      descripcion: 'Presente'
    }
  ]
  const mostrar = [true, true]
  const comentarios = [
    {comentario: 'abc', es_item: true, id_item: 0},
    {comentario: 'abc', es_item: true, id_item: 0}
  ]
  const entradas = [
    {error: true, mensaje: ''},
    {error: true, mensaje: ''}
  ]
  const listaComentarios = [
    {id: 236345, comentario: 'Este es un comentario de prueba', es_item: true, id_item: 46245, asistencia: {
      id: 2463453, estudiante: {id: 462462345, iniciales: 'ABC'}
    }},
    {id: 6923495, comentario: 'Otro comentario de prueba', es_item: false, id_item: null, asistencia: {
      id: 2463453, estudiante: {id: 462462345, iniciales: 'ABC'}
    }}
  ]

  it('se asigna prop lista correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.props().lista).toEqual(lista)
  })

  it('se asigna prop asistencia correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.props().asistentes).toEqual(presentes)
  })

  it('se asigna prop "comentar" correctamente con "false"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.props().comentar).toBeFalsy()
  })

  it('se asigna prop "comentar" correctamente con "true"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.props().comentar).toBeTruthy()
  })

  it('se asigna prop "responder" correctamente con "false"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.props().responder).toBeFalsy()
  })

  it('se asigna prop "responder" correctamente con "true"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: []
      }
    })
    expect(wrapper.props().responder).toBeTruthy()
  })

  it('se asigna prop "listaCom" correctamente con arreglo vacío', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.props().listaCom).toEqual([])
  })

  it('se asigna prop "listaCom" correctamente con arreglo no vacío', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.props().listaCom).toEqual(listaComentarios)
  })

  it('variable listaItems se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.listaItems).toEqual(lista)
  })

  it('variable asistencia se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.asistencia).toEqual(presentes)
  })

  it('variable "comentarios" se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.comentarios).toBeFalsy()
  })

  it('variable "respuestas" se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.respuestas).toBeFalsy()
  })

  it('variable "mostrarComentar" se inicializa correctamente', () => {
    const esperado = [false, false]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.mostrarComentar).toEqual(esperado)
  })

  it('variable "listaComentarios" se inicializa correctamente', () => {
    const esperado = [
      {comentario: '', es_item: true, id_item: 0},
      {comentario: '', es_item: true, id_item: 0}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.listaComentarios).toEqual(esperado)
  })

  it('variable "listaGenerales" se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.listaGenerales).toEqual([])
  })

  it('variable "comentario" se inicializa correctamente', () => {
    const esperado = {comentario: '', es_item: true, id_item: 0}
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.comentario).toEqual(esperado)
  })

  it('variable "entrada" se inicializa correctamente', () => {
    const esperado = {error: false, mensaje: ''}
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.entrada).toEqual(esperado)
  })

  it('variable "listaEntradas" se inicializa correctamente', () => {
    const esperado = [
      {error: false, mensaje: ''}, {error: false, mensaje: ''}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.listaEntradas).toEqual(esperado)
  })

  it('variable "entradas" se inicializa correctamente', () => {
    const esperado = {comentarios: false}
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.entradas).toEqual(esperado)
  })

  it('variable "comentariosMinuta" se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.comentariosMinuta).toEqual(listaComentarios)
  })

  it('variable "comentariosItems" se inicializa correctamente sin "comentarios"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.comentariosItems).toEqual([])
  })

  it('variable "comentariosItems" se inicializa correctamente con "comentarios"', () => {
    const esperado = [
      {id: 236345, comentario: 'Este es un comentario de prueba', es_item: true, id_item: 46245, asistencia: {
        id: 2463453, estudiante: {id: 462462345, iniciales: 'ABC'}
      }}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.comentariosItems).toEqual(esperado)
  })

  it('variable "comentariosGenerales" se inicializa correctamente sin "comentarios"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.comentariosGenerales).toEqual([])
  })

  it('variable "comentariosGenerales" se inicializa correctamente con "comentarios"', () => {
    const esperado = [
      {id: 6923495, comentario: 'Otro comentario de prueba', es_item: false, id_item: null, asistencia: {
        id: 2463453, estudiante: {id: 462462345, iniciales: 'ABC'}
      }}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.comentariosGenerales).toEqual(esperado)
  })

  it('variable "respuestasItems" se inicializa correctamente', () => {
    const esperado = [
      [{comentario_id: 236345, respuesta: ''}],
      []
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.respuestasItems).toEqual(esperado)
  })

  it('variable "respuestasGenerales" se inicializa correctamente sin "comentarios"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.respuestasGenerales).toEqual([])
  })

  it('variable "respuestasGenerales" se inicializa correctamente con "comentarios"', () => {
    const esperado = [
      {comentario_id: 6923495, respuesta: ''}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.respuestasGenerales).toEqual(esperado)
  })

  it('variable "verRespuestasItems" se inicializa correctamente sin "comentarios"', () => {
    const esperado = [[], []]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.verRespuestasItems).toEqual(esperado)
  })

  it('variable "verRespuestasItems" se inicializa correctamente con "comentarios"', () => {
    const esperado = [[false], []]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.verRespuestasItems).toEqual(esperado)
  })

  it('variable "verRespuestasGenerales" se inicializa correctamente sin "comentarios"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.verRespuestasGenerales).toEqual([])
  })

  it('variable "verRespuestasGenerales" se inicializa correctamente con "comentarios"', () => {
    const esperado = [false]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.verRespuestasGenerales).toEqual(esperado)
  })

  it('variable "responderEntradasItems" se inicializa correctamente sin "comentarios"', () => {
    const esperado = [[], []]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.responderEntradasItems).toEqual(esperado)
  })

  it('variable "responderEntradasItems" se inicializa correctamente con "comentarios"', () => {
    const esperado = [
      [{error: false, mensaje: ''}],
      []
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.responderEntradasItems).toEqual(esperado)
  })

  it('variable "responderEntradasGenerales" se inicializa correctamente sin "comentarios"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.responderEntradasGenerales).toEqual([])
  })

  it('variable "responderEntradasGenerales" se inicializa correctamente con "comentarios"', () => {
    const esperado = [{error: false, mensaje: ''}]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.responderEntradasGenerales).toEqual(esperado)
  })

  it('propiedad computada listaOrdenada funciona correctamente', () => {
    const esperado = [
      {
        id: 46245,
        tipo: 'Compromiso',
        correlativo: 2445,
        descripcion: 'Este es otro item de prueba',
        fecha: '2020-06-15T00:00:00.000Z',
        responsables: [
          {
            id: 454,
            asistencia_id: 43
          }
        ]
      },
      {
        id: 14635,
        tipo: 'Info',
        correlativo: 2453,
        descripcion: 'Este es un item de prueba',
        fecha: null,
        responsables: []
      }
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.listaOrdenada).toEqual(esperado)
  })

  it('propiedad computada "comentariosPorItem" funciona correctamente sin "comentarios"', () => {
    const esperado = [[], []]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.comentariosPorItem).toEqual(esperado)
  })

  it('propiedad computada "comentariosPorItem" funciona correctamente con "comentarios"', () => {
    const esperado = [
      [{id: 236345, comentario: 'Este es un comentario de prueba', es_item: true, id_item: 46245, asistencia: {
        id: 2463453, estudiante: {id: 462462345, iniciales: 'ABC'}
      }}],
      []
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: true,
        listaCom: listaComentarios
      }
    })
    expect(wrapper.vm.comentariosPorItem).toEqual(esperado)
  })

  it('método fechaItem funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.fechaItem('2020-06-15T00:00:00.000Z')).toEqual('15-06-2020')
  })

  it('método fechaItem con entrada null funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.fechaItem(null)).toEqual('')
  })

  it('método obtenerIniciales funciona correctamente', () => {
    const resp = [
      {
        id: 454,
        asistencia_id: 43
      }
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.obtenerIniciales(resp)).toEqual('BRG')
  })

  it('método crearListas funciona correctamente', () => {
    const esperadoMostrar = [false, false]
    const esperadoComentarios = [
      {comentario: '', es_item: true, id_item: 0},
      {comentario: '', es_item: true, id_item: 0}
    ]
    const esperadoEntradas = [
      {error: false, mensaje: ''},
      {error: false, mensaje: ''}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.mostrarComentar).toEqual(esperadoMostrar)
    expect(wrapper.vm.listaComentarios).toEqual(esperadoComentarios)
    expect(wrapper.vm.listaEntradas).toEqual(esperadoEntradas)
  })

  it('método abrirComentario funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    wrapper.vm.crearListas()
    wrapper.vm.abrirComentario(1, 36345)
    expect(wrapper.vm.mostrarComentar[1]).toBeTruthy()
    expect(wrapper.vm.listaComentarios[1].id_item).toEqual(36345)
  })

  it('método cerrarComentario funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      },
      data () {
        return {
          mostrarComentar: mostrar,
          listaComentarios: comentarios,
          listaEntradas: entradas
        }
      }
    })
    wrapper.vm.cerrarComentario(1)
    expect(wrapper.vm.mostrarComentar[1]).toBeFalsy()
    expect(wrapper.vm.listaComentarios[1].comentario).toEqual('')
    expect(wrapper.vm.listaEntradas[1].error).toBeFalsy()
  })

  it('método agregaComentario funciona correctamente', () => {
    const esperado = [{
      comentario: '',
      es_item: false,
      id_item: 0
    }]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      }
    })
    wrapper.vm.agregaComentario()
    expect(wrapper.vm.listaGenerales).toEqual(esperado)
  })

  it('método removerComentario funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      },
      data () {
        return {
          listaGenerales: [{
            comentario: '',
            es_item: false,
            id_item: 0
          }]
        }
      }
    })
    wrapper.vm.removerComentario()
    expect(wrapper.vm.listaGenerales).toEqual([])
  })

  it('método limpiarCampos funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      },
      data () {
        return {
          mostrarComentar: mostrar,
          listaComentarios: comentarios,
          listaGenerales: [{
            comentario: '',
            es_item: false,
            id_item: 0
          }]
        }
      }
    })
    wrapper.vm.limpiarCampos()
    expect(wrapper.vm.mostrarComentar).toEqual([])
    expect(wrapper.vm.listaComentarios).toEqual([])
    expect(wrapper.vm.listaGenerales).toEqual([])
    expect(wrapper.vm.comentariosItems).toEqual([])
    expect(wrapper.vm.comentariosGenerales).toEqual([])
    expect(wrapper.vm.respuestasItems).toEqual([])
    expect(wrapper.vm.respuestasGenerales).toEqual([])
    expect(wrapper.vm.verRespuestasItems).toEqual([])
    expect(wrapper.vm.verRespuestasGenerales).toEqual([])
    expect(wrapper.vm.responderEntradasItems).toEqual([])
    expect(wrapper.vm.responderEntradasGenerales).toEqual([])
  })

  it('método "validarComentarioItem" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      }
    })
    expect(wrapper.vm.validarComentarioItem(0)).toBeTruthy()
    expect(wrapper.vm.listaEntradas[0].error).toBeFalsy()
    expect(wrapper.vm.listaEntradas[0].mensaje).toEqual('')
  })

  it('método "validarComentarioItem" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      },
      data () {
        return {
          listaComentarios: [
            {comentario: '', es_item: true, id_item: 0},
            {comentario: '', es_item: true, id_item: 0}
          ],
          listaEntradas: [
            {error: false, mensaje: ''},
            {error: false, mensaje: ''}
          ]
        }
      }
    })
    wrapper.vm.abrirComentario(0, 3453)
    expect(wrapper.vm.validarComentarioItem(0)).toBeFalsy()
    expect(wrapper.vm.listaEntradas[0].error).toBeTruthy()
    expect(wrapper.vm.listaEntradas[0].mensaje).toEqual('Falta ingresar el comentario')
  })

  it('método "validarComentarioItem" funciona correctamente con "true" y comentario', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: true,
        responder: false,
        listaCom: []
      }
    })
    wrapper.vm.abrirComentario(0, 3453)
    wrapper.vm.listaComentarios[0].comentario = 'Comentario de prueba'
    expect(wrapper.vm.validarComentarioItem(0)).toBeTruthy()
    expect(wrapper.vm.listaEntradas[0].error).toBeFalsy()
    expect(wrapper.vm.listaEntradas[0].mensaje).toEqual('')
  })

  it('método limpiarErrorItem funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      },
      data () {
        return {
          listaEntradas: [{
            error: true,
            mensaje: 'Es un error de la prueba'
          }]
        }
      }
    })
    wrapper.vm.limpiarErrorItem(0)
    expect(wrapper.vm.listaEntradas[0].error).toBeFalsy()
    expect(wrapper.vm.listaEntradas[0].mensaje).toEqual('')
  })

  it('método limpiarErrorGeneral funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes,
        comentar: false,
        responder: false,
        listaCom: []
      },
      data () {
        return {
          entradas: {
            comentarios: true
          }
        }
      }
    })
    wrapper.vm.limpiarErrorGeneral()
    expect(wrapper.vm.entradas.comentarios).toBeFalsy()
  })
})
