import { shallowMount } from '@vue/test-utils'
import Comentarios from '@/components/comentarios/ComentarMinuta.vue'

describe('ComentarMinuta.vue', () => {
  const bitacora = {
    id: 663462,
    revision: 'Z',
    minuta: {
      id: 242345345,
      correlativo: 6345,
      tema: 'Esto es una prueba',
      fecha_reunion: '2020-12-14T00:00:00.000Z',
      h_inicio: '2020-12-14T23:00:00.000Z',
      h_termino: '2020-12-14T23:59:00.000Z',
      clasificacion: {
        informativa: false,
        avance: false,
        decision: true,
        coordinacion: false,
        otro: false
      },
      asistencia: [
        {
          iniciales: 'GER',
          descripcion: 'Presente'
        }
      ]
    }
  }

  it('se asigna props idBitacora adecuadamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.props().idBitacora).toEqual(1353)
  })

  it('variable id se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.id).toEqual(1353)
  })

  it('variable bitacora se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('variable comentarios se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.comentarios).toEqual([])
  })

  it('variable mostrarAprobacion se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.mostrarAprobacion).toBeFalsy()
  })

  it('variable tipoAprobaciones se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.tipoAprobaciones).toEqual([])
  })

  it('variable aprobacion se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.aprobacion).toEqual(0)
  })

  it('método recibirComentarios funciona correctamente', () => {
    const comentarios = [
      {comentario: 'comentario de item', es_item: true, id_item: 6345},
      {comentario: 'comentario general', es_item: false, id_item: 0}
    ]
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    wrapper.vm.recibirComentarios(comentarios)
    expect(wrapper.vm.comentarios).toEqual(comentarios)
    expect(wrapper.vm.mostrarAprobacion).toBeTruthy()
  })
})
