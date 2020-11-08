import { shallowMount } from '@vue/test-utils'
import GestionGrupos from '@/components/GestionGrupos.vue'

describe('GestionGrupos.vue', () => {
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
    expect(wrapper.vm.listaEstudiantes).toEqual({})
  })

  it('variable listaGrupos se inicializa vacía', () => {
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.listaGrupos).toEqual([])
  })
})
