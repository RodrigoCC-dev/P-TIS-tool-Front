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

/* Depende del 'state'

  it('propiedad computada "gruposJornada" funciona correctamente', () => {
    const grupos = [
      {id: 962353, jornada: 'Diurna'},
      {id: 345309, jornada: 'Diurna'},
      {id: 23453, jornada: 'Vespertina'}
    ]
    const esperado = [
      {id: 962353, jornada: 'Diurna'},
      {id: 345309, jornada: 'Diurna'}
    ]
    const wrapper = shallowMount(SelectorGrupo)
    wrapper.vm.jornadaActual = 'Diurna'
    expect(wrapper.vm.gruposJornada).toEqual(esperado)
  })
*/

  it('método "nombreCompleto" funciona correctamente', () => {
    const estudiante = {
      nombre: 'Mateo',
      apellido_paterno: 'Iglesias',
      apellido_materno: 'Del Campo'
    }
    const wrapper = shallowMount(SelectorGrupo)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método "buscarPorId" funciona correctamente', () => {
    const lista = [{id: 1, campo: 'manzana'}, {id: 2, campo: 'naranja'}]
    const esperado = {id: 2, campo: 'naranja'}
    const wrapper = shallowMount(SelectorGrupo)
    expect(wrapper.vm.buscarPorId(lista, 2)).toEqual(esperado)
  })

/* Depende del 'state'

  it('método "seleccionarGrupo" funciona correctamente', async () => {
    const listaGrupos = [
      {id: 1, nombre: 'G01'}, {id: 2, nombre: 'G02'}, {id: 3, nombre: 'G03'}
    ]
    const esperado = {id:2, nombre: 'G02'}
    const wrapper = shallowMount(SelectorGrupo)
    wrapper.vm.listaGrupos = listaGrupos
    wrapper.vm.seleccionarGrupo(2)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.grupoActual).toEqual(2)
    expect(wrapper.vm.grupoSeleccionado).toEqual(esperado)
    expect(wrapper.emitted().eleccion).toBeTruthy()
    expect(wrapper.emitted().eleccion.length).toEqual(1)
    expect(wrapper.emitted().eleccion[0]).toEqual([esperado])
  })
*/

})
