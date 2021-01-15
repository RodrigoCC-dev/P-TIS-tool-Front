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
  const grupo = {
    id:2, nombre: 'G02',
    stakeholders: [{id: 962345}, {id: 7463945}, {id: 62345}]
  }

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

  it('método "seleccionarGrupo" funciona correctamente', () => {
    const wrapper = shallowMount(AsignarStk)
    wrapper.vm.seleccionarGrupo(grupo)
    expect(wrapper.vm.grupoSeleccionado).toEqual(grupo)
    expect(wrapper.vm.mostrarStakeholders).toBeTruthy()
  })

  it('método "nombreCompleto" funciona correctamente', () => {
    const cliente = {
      nombre: 'Mateo',
      apellido_paterno: 'Iglesias',
      apellido_materno: 'Del Campo'
    }
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.nombreCompleto(cliente)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método "buscarIndex" funciona correctamente', () => {
    const lista = [
      {id: 29353}, {id: 9534}, {id: 926364}
    ]
    const wrapper = shallowMount(AsignarStk)
    expect(wrapper.vm.buscarIndex(lista, 9534)).toEqual(1)
  })

  it('método "stakeholdersAsignados" funciona correctamente', () => {
    const wrapper = shallowMount(AsignarStk)
    wrapper.vm.grupoSeleccionado = grupo
    wrapper.vm.listaStakeholders = listaStakeholders
    wrapper.vm.stakeholdersAsignados()
    expect(wrapper.vm.asignados[0]).toEqual(62345)
  })

  it('método "cerrar" funciona correctamente', async () => {
    const wrapper = shallowMount(AsignarStk)
    wrapper.vm.cerrar()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().cerrar).toBeTruthy()
    expect(wrapper.emitted().cerrar.length).toEqual(1)
    expect(wrapper.emitted().cerrar[0]).toEqual([])
  }) 
})
