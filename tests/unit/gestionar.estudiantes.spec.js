import { shallowMount } from '@vue/test-utils'
import GestionEstudiantes from '@/components/GestionEstudiantes.vue'

const entrada = () => {
  return {
    error: false,
    mensaje: ''
  }
}


describe('GestionEstudiantes.vue', () => {
  it('variable verFormulario se inicializa en false', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable estudiante se inicializa correctamente', () => {
    const estudiante = {
      usuario: {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        run: '',
        email: ''
      },
      seccion_id: null
    }
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.estudiante).toEqual(estudiante)
  })

  it('variable listaEstudiantes se inicializa vacía', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.listaEstudiantes).toEqual({})
  })

  it('variable mostrarLista se inicializa con false', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.mostrarLista).toBeFalsy()
  })

  it('variable runEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.runEntrada).toEqual(entrada())
  })

  it('variable nombreEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.nombreEntrada).toEqual(entrada())
  })

  it('variable apellidoPaternoEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.apellidoPaternoEntrada).toEqual(entrada())
  })

  it('variable apellidoMaternoEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.apellidoMaternoEntrada).toEqual(entrada())
  })

  it('variable emailEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.emailEntrada).toEqual(entrada())
  })

  it('variable seccionEntrada se inicializa en false', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.seccionEntrada).toBeFalsy()
  })
})
