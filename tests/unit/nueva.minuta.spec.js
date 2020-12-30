import { shallowMount } from '@vue/test-utils'
import Nueva from '@/components/comentarios/NuevaMinuta.vue'

describe('NuevaMinuta.vue', () => {
  it('se asigna props "idBitacora" adecuadamente', () => {
    const wrapper = shallowMount(Nueva, {
      propsData: {
        idBitacora: 523
      }
    })
    expect(wrapper.props().idBitacora).toEqual(523)
  })

  it('variable "id" se asigna con props correctamente', () => {
    const wrapper = shallowMount(Nueva, {
      propsData: {
        idBitacora: 523
      }
    })
    expect(wrapper.vm.id).toEqual(523)
  })

  it('variable "bitacora" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('variable "comentarios" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.comentarios).toEqual([])
  })

  it('variable "aprobaciones" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.aprobaciones).toEqual([])
  })

  it('variable "verAprobacion" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.verAprobacion).toBeFalsy()
  })

  it('variable "nuevoMotivo" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.nuevoMotivo).toEqual('')
  })

  it('variable "nuevaRevision" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.nuevaRevision).toEqual('')
  })
})
