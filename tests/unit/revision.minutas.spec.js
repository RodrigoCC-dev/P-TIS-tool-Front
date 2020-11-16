import { shallowMount } from '@vue/test-utils'
import RevisionMinutas from '@/components/RevisionMinutas.vue'

describe('RevisionMinutas.vue', () => {
  it('variable jornadaActual se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable jornadasProfesor se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.jornadasProfesor).toEqual([])
  })

  it('vairable listaGrupos se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.listaGrupos).toEqual([])
  })

  it('variable mostrarFormulario se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.mostrarFormulario).toBeFalsy()
  })

  it('variable mostrarJornadas se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })

  it('variable mostrarMinutas se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.mostrarMinutas).toBeFalsy()
  })

  it('variable grupoActual se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.grupoActual).toEqual(0)
  })

  it('variable grupoSeleccionado se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.grupoSeleccionado).toEqual({})
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable bitacora se inicializa correctamente', () => {
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const tabs = {
      diurna: 'Diurna',
      vespertina: 'Vespertina'
    }
    const wrapper = shallowMount(RevisionMinutas)
    expect(wrapper.vm.nombreTabs).toEqual(tabs)
  })
})
