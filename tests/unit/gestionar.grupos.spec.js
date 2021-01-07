import { shallowMount } from '@vue/test-utils'
import GestionGrupos from '@/components/GestionGrupos.vue'

describe('GestionGrupos.vue', () => {
  const listaEstudiantes = [
    {id: 29353, jornada: 'Diurna'},
    {id: 9534, jornada: 'Diurna'},
    {id: 926364, jornada: 'Vespertina'}
  ]

  it('variable verFormulario se inicializa en false', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable mostrarLista se inicializa en false', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.mostrarLista).toBeFalsy()
  })

  it('variable jornadasProfesor se inicializa vacía', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.jornadasProfesor).toEqual([])
  })

  it('variable mostrarJornadas se inicializa en false', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })

  it('variable jornadaActual se inicializa en Diurna', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable grupo se inicializa correctamente', () => {
    const nuevo = {
      nombre: '',
      proyecto: '',
      correlativo: 0
    }
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.grupo).toEqual(nuevo)
  })

  it('variable estudiantes se inicializa vacía', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.estudiantes).toEqual([])
  })

  it('variable entradas se inicializa correctamente', () => {
    const entradas = {
      proyecto: {
        error: false,
        mensaje: ''
      },
      estudiantes: {
        error: false,
        mensaje: ''
      }
    }
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.entradas).toEqual(entradas)
  })

  it('variable listaEstudiantes se inicializa vacía', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.listaEstudiantes).toEqual([])
  })

  it('variable listaGrupos se inicializa vacía', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.listaGrupos).toEqual([])
  })

  it('propiedad computada "sinAsignar" funciona correctamente', () => {
    const esperado = [
      {id: 29353, jornada: 'Diurna'},
      {id: 9534, jornada: 'Diurna'}
    ]
    const wrapper = shallowMount(GestionGrupos)
    wrapper.vm.listaEstudiantes = listaEstudiantes
    wrapper.vm.jornadaActual = 'Diurna'
    expect(wrapper.vm.sinAsignar).toEqual(esperado)
  })

  it('propiedad computada "mostrarLista" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(GestionGrupos)
    wrapper.vm.listaEstudiantes = listaEstudiantes
    wrapper.vm.jornadaActual = 'Diurna'
    expect(wrapper.vm.mostrarLista).toBeTruthy()
  })

  it('propiedad computada "mostrarLista" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.mostrarLista).toBeFalsy()
  })
})
