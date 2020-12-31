import { shallowMount } from '@vue/test-utils'
import Registro from '@/components/RegistroMinuta.vue'

describe('RegistroMinuta.vue', () => {
  it('se asigna prop "idBitacora" adecuadamente', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.props().idBitacora).toEqual(6)
  })

  it('variable "id" se inicializa correctamente con prop', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.id).toEqual(6)
  })

  it('variable "registros" se inicializa correctamente', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.registros).toEqual([])
  })
})
