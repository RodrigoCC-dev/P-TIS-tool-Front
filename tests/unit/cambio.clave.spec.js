import { shallowMount } from '@vue/test-utils'
import CambioClave from '@/components/CambioClave.vue'

describe('CambioClave.vue', () => {
  it('variable "actual" se inicializa correctamente', () => {
    const wrapper = shallowMount(CambioClave)
    expect(wrapper.vm.actual).toEqual('')
  })

  it('variable "nueva" se inicializa correctamente', () => {
    const wrapper = shallowMount(CambioClave)
    expect(wrapper.vm.nueva).toEqual('')
  })

  it('variable "repetirNueva" se inicializa correctamente', () => {
    const wrapper = shallowMount(CambioClave)
    expect(wrapper.vm.repetirNueva).toEqual('')
  })

  it('variable "entradas" se inicializa correctamente', () => {
    const esperado = {
      actual: {error: false, mensaje: ''},
      nueva: {error: false, mensaje: ''},
      repetir: {error: false, mensaje: ''}
    }
    const wrapper = shallowMount(CambioClave)
    expect(wrapper.vm.entradas).toEqual(esperado)
  })
})
