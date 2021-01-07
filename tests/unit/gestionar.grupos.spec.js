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

  it('método "nombreCompleto" funciona correctamente', () => {
    const estudiante = {
      nombre: 'Mateo',
      apellido_paterno: 'Iglesias',
      apellido_materno: 'Del Campo'
    }
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método "mostrarClientes" funciona correctamente con "true"', () => {
    const grupo = {
      stakeholders: [{id: 962354}, {id: 6235345}, {id: 63453}]
    }
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.mostrarClientes(grupo)).toBeTruthy()
  })

  it('método "mostrarClientes" funciona correctamente con "true"', () => {
    const grupo = {
      stakeholders: []
    }
    const wrapper = shallowMount(GestionGrupos)
    expect(wrapper.vm.mostrarClientes(grupo)).toBeFalsy()
  })

  it('método "elegirTab" funciona correctamente', () => {
    const wrapper = shallowMount(GestionGrupos)
    wrapper.vm.elegirTab('Vespertina')
    expect(wrapper.vm.jornadaActual).toEqual('Vespertina')
  })

  it('método "agregarGrupo" funciona correctamente', () => {
    const wrapper = shallowMount(GestionGrupos)
    wrapper.vm.verFormulario = false
    wrapper.vm.agregarGrupo()
    expect(wrapper.vm.verFormulario).toBeTruthy()
  })

  it('método "noAgregar" funciona correctamente', () => {
    const wrapper = shallowMount(GestionGrupos)
    wrapper.vm.verFormulario = true
    wrapper.vm.entradas.proyecto.error = true
    wrapper.vm.entradas.estudiantes.error = true
    wrapper.vm.noAgregar()
    expect(wrapper.vm.verFormulario).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeFalsy()
    expect(wrapper.vm.entradas.estudiantes.error).toBeFalsy()
  })
})
