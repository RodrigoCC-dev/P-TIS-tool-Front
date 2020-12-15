import { shallowMount } from '@vue/test-utils'
import Comentarios from '@/components/comentarios/ComentarMinuta.vue'

describe('ComentarMinuta.vue', () => {
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
})
