import { shallowMount } from '@vue/test-utils'
import SelectorJornada from '@/components/SelectorJornada.vue'

describe('SelectorJornada.vue', () => {
  it('variable mostrarJornadas se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })

  it('variable jornadaActual se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable jornadasProfesor se inicializa correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.jornadasProfesor).toEqual([])
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      diurna: 'Diurna',
      vespertina: 'Vespertina'
    }
    const wrapper = shallowMount(SelectorJornada)
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

/*  Depende del 'store'

  it('método elegirTab funciona correctamente', () => {
    const wrapper = shallowMount(SelectorJornada)
    wrapper.vm.elegirTab('Vespertina')
    expect(wrapper.vm.jornadaActual).toEqual('Vespertina')
  })
*/

})
