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

  it('variable aprobacion se inicializa correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.aprobacion).toEqual(0)
  })

  it('propiedad computada "mostrarMinuta" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    expect(wrapper.vm.mostrarMinuta).toBeFalsy()
  })

/*  "mostrarMinuta" con "true" depende del "state"

  it('propiedad computada "mostrarMinuta" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      },
      data() {
        return {
          bitacora: bitacora
        }
      }
    })
    expect(wrapper.vm.mostrarMinuta).toBeTruthy()
  })
*/

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

/*   método "limpiarCampos" depende del "state"

  it('método "limpiarCampos" funciona correctamente', () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      },
      data() {
        return {
          bitacora: bitacora,
          comentarios: [
            {comentario: 'comentario de item', es_item: true, id_item: 6345},
            {comentario: 'comentario general', es_item: false, id_item: 0}
          ],
          aprobacion: 62345
        }
      }
    })
    wrapper.vm.limpiarCampos()
    expect(wrapper.vm.bitacora).toEqual({})
    expect(wrapper.vm.comentarios).toEqual([])
    expect(wrapper.vm.aprobacion).toEqual(0)
  })
*/

  it('método "cerrarRevision" funciona correctamente', async () => {
    const wrapper = shallowMount(Comentarios, {
      propsData: {
        idBitacora: 1353
      }
    })
    wrapper.vm.cerrarRevision()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().cerrar).toBeTruthy()
    expect(wrapper.emitted().cerrar.length).toBe(1)
    expect(wrapper.emitted().cerrar[0]).toEqual([])
  })
})
