import { shallowMount } from '@vue/test-utils'
import AsignarStk from '@/components/AsignarStk.vue'

describe('AsignarStk.vue', () => {
  const listaStakeholders = [
    {
      id: 62345,
      email: 'jose.venegas@algo.com'
    },
    {
      id: 6234534,
      email: 'daniel.castro@algo.com'
    }
  ]

  it('variable "grupoSeleccionado" se inicializa correctamente', () => {
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.grupoSeleccionado).toEqual({})
  })

  it('variable "mostrarStakeholders" se inicializa correctamente', () => {
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.mostrarStakeholders).toBeFalsy()
  })

  it('variable "asignados" se inicializa correctamente', () => {
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.asignados).toEqual([])
  })

  it('variable "listaStakeholders" se inicializa correctamente', () => {
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.listaStakeholders).toEqual([])
  })

  it('propiedad computada "mostrarTabla" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(AsignarStk)
    wrapper.vm.listaStakeholders = listaStakeholders
    expect(wrapper.vm.mostrarTabla).toBeTruthy()
  })

  it('propiedad computada "mostrarTabla" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.mostrarTabla).toBeFalsy()
  })

  it('propiedad computada "mostrarAsignar" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(AsignarStk)
    wrapper.vm.asignados = [1, 2, 3, 4, 5]
    expect(wrapper.vm.mostrarAsignar).toBeTruthy()
  })

  it('propiedad computada "mostrarAsignar" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.mostrarAsignar).toBeFalsy()
  })
})
