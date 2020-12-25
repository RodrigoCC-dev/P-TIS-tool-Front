import { shallowMount } from '@vue/test-utils'
import Responder from '@/components/comentarios/ResponderMinuta.vue'

describe('ResponderMinuta.vue', () => {
  it('se asigna prop "idBitacora" correctamente', () => {
    const wrapper = shallowMount(Responder, {
      propsData: {
        idBitacora: 43535
      }
    })
    expect(wrapper.props().idBitacora).toEqual(43535)
  })

  it('variable "bitacora" se inicializa correctamente', () => {
    const wrapper = shallowMount(Responder, {
      propsData: {
        idBitacora: 43535
      }
    })
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('variable "comentarios" se inicializa correctamente', () => {
    const wrapper = shallowMount(Responder, {
      propsData: {
        idBitacora: 43535
      }
    })
    expect(wrapper.vm.comentarios).toEqual([])
  })

  it('propiedad computada "mostrarMinuta" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Responder, {
      propsData: {
        idBitacora: 43535
      }
    })
    expect(wrapper.vm.mostrarMinuta).toBeFalsy()
  })
})
