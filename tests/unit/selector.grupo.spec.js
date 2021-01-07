import { shallowMount } from '@vue/test-utils'
import SelectorGrupo from '@/components/SelectorGrupo.vue'

describe('SelectorGrupo.vue', () => {
  it('variable "grupoActual" se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorGrupo)
    expect(wrapper.vm.grupoActual).toEqual(0)
  })

  it('variable "grupoSeleccionado" se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorGrupo)
    expect(wrapper.vm.grupoSeleccionado).toEqual({})
  })

  it('variable "listaGrupos" se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorGrupo)
    expect(wrapper.vm.listaGrupos).toEqual([])
  })

  
})
