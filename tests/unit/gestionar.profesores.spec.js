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

  it('propiedad computada mostrarProfesores funciona correctamente con false', () => {
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

  it('método "noAgregar" funciona correctamente', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.verFormulario = true
    wrapper.vm.entradas.nombre.error = true
    wrapper.vm.entradas.apellidoPaterno.error = true
    wrapper.vm.entradas.apellidoMaterno.error = true
    wrapper.vm.entradas.correo_elec.error = true
    wrapper.vm.entradas.secciones = true
    wrapper.vm.noAgregar()
    expect(wrapper.vm.verFormulario).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoPaterno.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoMaterno.error).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeFalsy()
    expect(wrapper.vm.entradas.secciones).toBeFalsy()
  })

  it('método "validarNombre" funciona correctamente con nombre igual a "null"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.nombre = null
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre ""', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.nombre = ''
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre "undefined"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.nombre = undefined
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.nombre = 'Carolina14963##&$'
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarNombre" funciona correctamente con nombre con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.nombre = 'Fernanda'
    expect(wrapper.vm.validarNombre()).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.error).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual('')
  })

  it('método "validarApellido" funciona correctamente con apellido "null"', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.validarApellido(null, entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellido" funciona correctamente con apellido "undefined"', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.validarApellido(undefined, entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellido" funciona correctamente con apellido igual a ""', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.validarApellido('', entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellido" funciona correctamente con apellido distinto de "regExp"', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.validarApellido('#b@r$Tolomeo', entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellido" funciona correctamente con apellido con "regExp" correcto', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionProfesores)
    expect(wrapper.vm.validarApellido('Faundez', entradas)).toBeTruthy()
    expect(entradas.error).toBeFalsy()
    expect(entradas.mensaje).toEqual('')
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a "null"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_paterno = null
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoPaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoPaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a "undefined"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_paterno = undefined
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoPaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoPaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a ""', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_paterno = ''
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoPaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoPaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_paterno = 'C@stro#45'
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoPaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoPaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_paterno = 'Castro'
    expect(wrapper.vm.validarApellidoP()).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoPaterno.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoPaterno.mensaje).toEqual('')
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a "null"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_materno = null
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoMaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoMaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a "undefined"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_materno = undefined
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoMaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoMaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a ""', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_materno = ''
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoMaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoMaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_materno = 'Gaeg"&3kasisr'
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoMaterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoMaterno.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.apellido_materno = 'Mendez'
    expect(wrapper.vm.validarApellidoM()).toBeTruthy()
    expect(wrapper.vm.entradas.apellidoMaterno.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellidoMaterno.mensaje).toEqual('')
  })

  it('método "validarEmail" funciona correctamente con email igual a "null"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.email = null
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email igual a "undefined"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.email = undefined
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email igual a ""', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.email = ''
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email distinto a "regExp"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.email = '&3kasti,6ka0ds9gaib9asr.b9as025'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.correo_mal)
  })

  it('método "validarEmail" funciona correctamente con email con dos "@"', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.email = 'sebastian@ingenieria.cl@usach.com'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.correo_mal)
  })

  it('método "validarEmail" funciona correctamente con email con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionProfesores)
    wrapper.vm.usuario.email = 'gonzalo.dominguez@gmail.com'
    expect(wrapper.vm.validarEmail()).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual('')
  })
})
