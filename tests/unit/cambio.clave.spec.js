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

  it('método "validarActual" funciona correctamente para "actual" igual a "undefined"', () => {
    const wrapper = shallowMount(CambioClave, {
      data() {
        return {
          actual: undefined
        }
      }
    })
    expect(wrapper.vm.validarActual()).toBeFalsy()
    expect(wrapper.vm.entradas.actual.error).toBeTruthy()
    expect(wrapper.vm.entradas.actual.mensaje).toEqual('Este campo no puede estar vacío')
  })

  it('método "validarActual" funciona correctamente para "actual" igual a ""', () => {
    const wrapper = shallowMount(CambioClave)
    expect(wrapper.vm.validarActual()).toBeFalsy()
    expect(wrapper.vm.entradas.actual.error).toBeTruthy()
    expect(wrapper.vm.entradas.actual.mensaje).toEqual('No se ha ingresado la clave actual')
  })

  it('método "validarActual" funciona correctamente para "actual" igual a "abc"', () => {
    const wrapper = shallowMount(CambioClave, {
      data() {
        return {
          actual: 'abc'
        }
      }
    })
    expect(wrapper.vm.validarActual()).toBeTruthy()
    expect(wrapper.vm.entradas.actual.error).toBeFalsy()
    expect(wrapper.vm.entradas.actual.mensaje).toEqual('')
  })

  it('método "validarNueva" funciona correctamente para "nueva" igual a "undefined"', () => {
    const wrapper = shallowMount(CambioClave, {
      data() {
        return {
          nueva: undefined
        }
      }
    })
    expect(wrapper.vm.validarNueva()).toBeFalsy()
    expect(wrapper.vm.entradas.nueva.error).toBeTruthy()
    expect(wrapper.vm.entradas.nueva.mensaje).toEqual('Este campo no puede estar vacío')
  })

  it('método "validarNueva" funciona correctamente para "nueva" igual a ""', () => {
    const wrapper = shallowMount(CambioClave)
    expect(wrapper.vm.validarNueva()).toBeFalsy()
    expect(wrapper.vm.entradas.nueva.error).toBeTruthy()
    expect(wrapper.vm.entradas.nueva.mensaje).toEqual('No se ha ingresado la nueva clave')
  })

  it('método "validarNueva" funciona correctamente para "nueva" igual a "abc"', () => {
    const wrapper = shallowMount(CambioClave, {
      data() {
        return {
          nueva: 'abc'
        }
      }
    })
    expect(wrapper.vm.validarNueva()).toBeTruthy()
    expect(wrapper.vm.entradas.nueva.error).toBeFalsy()
    expect(wrapper.vm.entradas.nueva.mensaje).toEqual('')
  })
})
