import { shallowMount } from '@vue/test-utils'
import GestionProfesores from '@/components/GestionProfesores.vue'

describe('GestionProfesores.vue', () => {
  it('variable verFormulario se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable usuario se inicializa correctamente', () => {
    const esperado = {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      email: ''
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.usuario).toEqual(esperado)
  })

  it('variable seccionesAsignadas se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.seccionesAsignadas).toEqual([])
  })

  it('variable listaProfesores se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.listaProfesores).toEqual([])
  })

  it('variable entradas se inicializa correctamente', () => {
    const esperado = {
      nombre: {error: false, mensaje: ''},
      apellidoPaterno: {error: false, mensaje: ''},
      apellidoMaterno: {error: false, mensaje: ''},
      correo_elec: {error: false, mensaje: ''},
      secciones: false
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.entradas).toEqual(esperado)
  })

  it('variable mensajes se inicializa correctamente', () => {
    const esperado = {
      sin_nombre: 'Debe ingresar el nombre del/la profesor/a',
      sin_apellido: 'Debe ingresar el apellido del/la profesor/a',
      sin_correo: 'Debe ingresar el correo electrónico del/la profesor/a',
      sin_especiales: 'Sólo letras. Verificar que no tenga caracteres especiales',
      correo_mal: 'El correo ingresado no es válido',
      correo_repetido: 'El correo ingresado ya se encuentra en el sistema'
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.mensajes).toEqual(esperado)
  })

  it('propiedad computada mostrarProfesores funciona correctamente con true', () => {
    const wrapper = shallowMount(GestionProfesores, {
      data() {
        return {
          listaProfesores: [
            {id: 1, secciones: [{
              id: 2,
              codigo: 'V21',
              jornada: { id: 2, nombre: 'Vespertina'}
            }],
            usuario: {
              id: 2,
              nombre: 'Elizabeth',
              apellido_paterno: 'Inostroza',
              apellido_materno: 'Del Solar',
              email: 'elizabeth.inostroza@gmail.com'
            }
          },
            {id: 2, secciones: [{
              id: 1,
              codigo: 'V35',
              jornada: { id: 1, nombre: 'Diurna'}
            }],
            usuario: {
              id: 3,
              nombre: 'Pedro',
              apellido_paterno: 'Garmendia',
              apellido_materno: 'Soto',
              email: 'pedro.garmendia@gmail.com'
            }
          }
          ]
        }
      }
    })
    expect(wrapper.vm.mostrarProfesores).toBeTruthy()
  })

  it('propiedad computada mostrarProfesores funciona correctamente con true', () => {
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.mostrarProfesores).toBeFalsy()
  })

  it('método nombreCompleto funciona correctamente', () => {
    const profesor = {
      nombre: 'Mateo',
      apellido_paterno: 'Iglesias',
      apellido_materno: 'Del Campo'
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.nombreCompleto(profesor)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método agregarProfesor funciona correctamente', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.agregarProfesor()
    expect(wrapper.vm.verFormulario).toBeTruthy()
  })

  it('método nuevoProfesor funciona correctamente', () => {
    const wrapper = shallowMount(GestionProfesores, {
      data() {
        return {
          usuario: {
            nombre: 'Mateo',
            apellido_paterno: 'Iglesias',
            apellido_paterno: 'Del Campo',
            email: 'mateo.iglesias@gmail.com'
          },
          seccionesAsignadas: [1, 2]
        }
      }
    })
    wrapper.vm.nuevoProfesor()
    expect(wrapper.vm.usuario.nombre).toEqual('')
    expect(wrapper.vm.usuario.apellido_paterno).toEqual('')
    expect(wrapper.vm.usuario.apellido_materno).toEqual('')
    expect(wrapper.vm.usuario.email).toEqual('')
    expect(wrapper.vm.seccionesAsignadas).toEqual([])
  })
})