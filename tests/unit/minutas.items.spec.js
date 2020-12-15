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

  it('se asigna prop lista correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
      }
    })
    expect(wrapper.props().lista).toEqual(lista)
  })

  it('se asigna prop asistencia correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
      }
    })
    expect(wrapper.props().asistentes).toEqual(presentes)
  })

  it('variable listaItems se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
      }
    })
    expect(wrapper.vm.listaItems).toEqual(lista)
  })

  it('variable asistencia se inicializa correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
      }
    })
    expect(wrapper.vm.asistencia).toEqual(presentes)
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
        asistentes: presentes
      }
    })
    expect(wrapper.vm.listaOrdenada).toEqual(esperado)
  })

  it('método fechaItem funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
      }
    })
    expect(wrapper.vm.fechaItem('2020-06-15T00:00:00.000Z')).toEqual('15-06-2020')
  })

  it('método fechaItem con entrada null funciona correctamente', () => {
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
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
        asistentes: presentes
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
        asistentes: presentes
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
        asistentes: presentes
      }
    })
    wrapper.vm.crearListas()
    wrapper.vm.abrirComentario(1, 36345)
    expect(wrapper.vm.mostrarComentar[1]).toBeTruthy()
    expect(wrapper.vm.listaComentarios[1].id_item).toEqual(36345)
  })

  it('método cerrarComentario funciona correctamente', () => {
    const mostrar = [true, true]
    const comentarios = [
      {comentario: 'abc', es_item: true, id_item: 0},
      {comentario: 'abc', es_item: true, id_item: 0}
    ]
    const entradas = [
      {error: true, mensaje: ''},
      {error: true, mensaje: ''}
    ]
    const wrapper = shallowMount(Items, {
      propsData: {
        lista: lista,
        asistentes: presentes
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
})
