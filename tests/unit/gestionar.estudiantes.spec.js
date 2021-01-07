import { shallowMount } from '@vue/test-utils'
import GestionEstudiantes from '@/components/GestionEstudiantes.vue'

describe('GestionEstudiantes.vue', () => {
  const entrada = {
    error: false,
    mensaje: ''
  }

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
    expect(wrapper.vm.runEntrada).toEqual(entrada)
  })

  it('variable nombreEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.nombreEntrada).toEqual(entrada)
  })

  it('variable apellidoPaternoEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.apellidoPaternoEntrada).toEqual(entrada)
  })

  it('variable apellidoMaternoEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.apellidoMaternoEntrada).toEqual(entrada)
  })

  it('variable emailEntrada se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.emailEntrada).toEqual(entrada)
  })

  it('variable seccionEntrada se inicializa en false', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.seccionEntrada).toBeFalsy()
  })

  it('variable "mensajes" se inicializa correctamente', () => {
    const esperado = {
      sin_nombre: 'Debe ingresar el nombre del estudiante',
      sin_apellido: 'Debe ingresar el apellido del estudiante',
      sin_correo: 'Debe ingresar el correo electrónico del estudiante',
      sin_especiales: 'Sólo letras. Verificar que no tenga caracteres especiales.',
      correo_mal: 'El correo ingresado no es válido',
      sin_usach: 'El correo ingresado no es corporativo (@usach.cl)',
      sin_run: 'No se ha ingresado R.U.N. del estudiante',
      run_error: 'No es un R.U.N. válido',
      run_repetido: 'Usuario ya se encuentra en el sistema'
    }
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.mensajes).toEqual(esperado)
  })

  it('propiedad computada "mostrarEliminar" funciona correctamente con true', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.eliminados = [2453, 938534]
    expect(wrapper.vm.mostrarEliminar).toBeTruthy()
  })

  it('propiedad computada "mostrarEliminar" funciona correctamente con false', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.mostrarEliminar).toBeFalsy()
  })

  it('propiedad computada "numeroEst" funciona correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.eliminados = [2453, 938534]
    expect(wrapper.vm.numeroEst).toEqual(2)
  })

  it('método "nombreCompleto" funciona correctamente', () => {
    const estudiante = {
      nombre_est: 'Mauricio',
      apellido1: 'Cobarrubias',
      apellido2: 'Celedón'
    }
    const wrapper = shallowMount(GestionEstudiantes)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Mauricio Cobarrubias Celedón')
  })

  it('método "nuevoEstudiante" funciona correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '1345633-9',
              email: 'mauricio.cobarrubias@gmail.com'
            },
            seccion_id: 62345234
          }
        }
      }
    })
    wrapper.vm.nuevoEstudiante()
    expect(wrapper.vm.estudiante.usuario.nombre).toEqual('')
    expect(wrapper.vm.estudiante.usuario.apellido_paterno).toEqual('')
    expect(wrapper.vm.estudiante.usuario.apellido_materno).toEqual('')
    expect(wrapper.vm.estudiante.usuario.run).toEqual('')
    expect(wrapper.vm.estudiante.usuario.email).toEqual('')
    expect(wrapper.vm.estudiante.seccion_id).toEqual(null)
  })

  it('método "agregarEstudiante" funciona correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '1345633-9',
              email: 'mauricio.cobarrubias@gmail.com'
            },
            seccion_id: 62345234
          }
        }
      }
    })
    wrapper.vm.agregarEstudiante()
    expect(wrapper.vm.verFormulario).toBeTruthy()
    expect(wrapper.vm.estudiante.usuario.nombre).toEqual('')
    expect(wrapper.vm.estudiante.usuario.apellido_paterno).toEqual('')
    expect(wrapper.vm.estudiante.usuario.apellido_materno).toEqual('')
    expect(wrapper.vm.estudiante.usuario.run).toEqual('')
    expect(wrapper.vm.estudiante.usuario.email).toEqual('')
    expect(wrapper.vm.estudiante.seccion_id).toEqual(null)
  })

  it('método "existeEstudiante" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '1345633-9',
              email: 'mauricio.cobarrubias@gmail.com'
            },
            seccion_id: 62345234
          },
          listaEstudiantes: [
            {run_est: '62345345-k'},
            {run_est: '62456624-2'},
            {run_est: '1345633-9'}
          ]
        }
      }
    })
    expect(wrapper.vm.existeEstudiante()).toBeTruthy()
    expect(wrapper.vm.runEntrada.error).toBeTruthy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual(wrapper.vm.mensajes.run_repetido)
  })

  it('método "existeEstudiante" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '1345633-9',
              email: 'mauricio.cobarrubias@gmail.com'
            },
            seccion_id: 62345234
          },
          listaEstudiantes: [
            {run_est: '62345345-k'},
            {run_est: '62456624-2'}
          ]
        }
      }
    })
    expect(wrapper.vm.existeEstudiante()).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeFalsy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual('')
  })

/* método depende del 'state'

  it('método "noAgregar" funciona correctamente', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '1345633-9',
              email: 'mauricio.cobarrubias@gmail.com'
            },
            seccion_id: 62345234
          },
          verFormulario: true,
          nombreEntrada: {error: true},
          apellidoMaternoEntrada: {error: true},
          apellidoMaternoEntrada: {error: true},
          runEntrada: {error: true},
          emailEntrada: {error: true},
          seccionEntrada: true
        }
      }
    })
    wrapper.vm.noAgregar()
    expect(wrapper.vm.estudiante.usuario.nombre).toEqual('')
    expect(wrapper.vm.estudiante.usuario.apellido_paterno).toEqual('')
    expect(wrapper.vm.estudiante.usuario.apellido_materno).toEqual('')
    expect(wrapper.vm.estudiante.usuario.run).toEqual('')
    expect(wrapper.vm.estudiante.usuario.email).toEqual('')
    expect(wrapper.vm.estudiante.seccion_id).toEqual(null)
    expect(wrapper.vm.verFormulario).toBeFalsy()
    expect(wrapper.vm.nombreEntrada.error).toBeFalsy()
    expect(wrapper.vm.apellidoPaternoEntrada.error).toBeFalsy()
    expect(wrapper.vm.apellidoMaternoEntrada.error).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeFalsy()
    expect(wrapper.vm.seccionEntrada).toBeFalsy()
  })

*/

  it('método "validarNombre" funciona correctamente con nombre igual a "null"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.nombre = null
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.nombreEntrada.error).toBeTruthy()
    expect(wrapper.vm.nombreEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre ""', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.nombre = ''
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.nombreEntrada.error).toBeTruthy()
    expect(wrapper.vm.nombreEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre "undefined"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.nombre = undefined
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.nombreEntrada.error).toBeTruthy()
    expect(wrapper.vm.nombreEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.nombre = 'Carolina14963##&$'
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.nombreEntrada.error).toBeTruthy()
    expect(wrapper.vm.nombreEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarNombre" funciona correctamente con nombre con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.nombre = 'Fernanda'
    expect(wrapper.vm.validarNombre()).toBeTruthy()
    expect(wrapper.vm.nombreEntrada.error).toBeFalsy()
    expect(wrapper.vm.nombreEntrada.mensaje).toEqual('')
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a "null"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_paterno = null
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.apellidoPaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoPaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a "undefined"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_paterno = undefined
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.apellidoPaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoPaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a ""', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_paterno = ''
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.apellidoPaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoPaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_paterno = 'C@stro#45'
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.apellidoPaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoPaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_paterno = 'Castro'
    expect(wrapper.vm.validarApellidoP()).toBeTruthy()
    expect(wrapper.vm.apellidoPaternoEntrada.error).toBeFalsy()
    expect(wrapper.vm.apellidoPaternoEntrada.mensaje).toEqual('')
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a "null"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_materno = null
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.apellidoMaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoMaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a "undefined"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_materno = undefined
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.apellidoMaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoMaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a ""', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_materno = ''
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.apellidoMaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoMaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_materno = 'Gaeg"&3kasisr'
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.apellidoMaternoEntrada.error).toBeTruthy()
    expect(wrapper.vm.apellidoMaternoEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.apellido_materno = 'Mendez'
    expect(wrapper.vm.validarApellidoM()).toBeTruthy()
    expect(wrapper.vm.apellidoMaternoEntrada.error).toBeFalsy()
    expect(wrapper.vm.apellidoMaternoEntrada.mensaje).toEqual('')
  })

  it('método "validarEmail" funciona correctamente con email igual a "null"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = null
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeTruthy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email igual a "undefined"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = undefined
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeTruthy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email igual a ""', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = ''
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeTruthy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email distinto a "regExp"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = '&3kasti,6ka0ds9gaib9asr.b9as025'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeTruthy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual(wrapper.vm.mensajes.correo_mal)
  })

  it('método "validarEmail" funciona correctamente con email con dos "@"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = 'sebastian@ingenieria.cl@usach.com'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeTruthy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual(wrapper.vm.mensajes.correo_mal)
  })

  it('método "validarEmail" funciona correctamente con email sin "@usach.cl"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = 'gonzalo.dominguez@gmail.com'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.emailEntrada.error).toBeTruthy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_usach)
  })

  it('método "validarEmail" funciona correctamente con email con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.email = 'gonzalo.dominguez@usach.cl'
    expect(wrapper.vm.validarEmail()).toBeTruthy()
    expect(wrapper.vm.emailEntrada.error).toBeFalsy()
    expect(wrapper.vm.emailEntrada.mensaje).toEqual('')
  })

  it('método "validarRun" funciona correctamente con run igual a "null"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.run = null
    expect(wrapper.vm.validarRun()).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeTruthy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_run)
  })

  it('método "validarRun" funciona correctamente con run igual a "undefined"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.run = undefined
    expect(wrapper.vm.validarRun()).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeTruthy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_run)
  })

  it('método "validarRun" funciona correctamente con run igual a ""', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.run = ''
    expect(wrapper.vm.validarRun()).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeTruthy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual(wrapper.vm.mensajes.sin_run)
  })

  it('método "validarRun" funciona correctamente con run distinto a "regExp"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.run = '19sler0-9345'
    expect(wrapper.vm.validarRun()).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeTruthy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual(wrapper.vm.mensajes.run_error)
  })

  it('método "validarRun" funciona correctamente con run con dígito verificador erróneo', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.run = '11223344-8'
    expect(wrapper.vm.validarRun()).toBeFalsy()
    expect(wrapper.vm.runEntrada.error).toBeTruthy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual(wrapper.vm.mensajes.run_error)
  })

  it('método "validarRun" funciona correctamente con run con dígito verificador correcto', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.usuario.run = '11223344-K'
    expect(wrapper.vm.validarRun()).toBeTruthy()
    expect(wrapper.vm.runEntrada.error).toBeFalsy()
    expect(wrapper.vm.runEntrada.mensaje).toEqual('')
  })

  it('método "validarSeccion" funciona correctamente con seccion igual a "null"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.seccion_id = null
    expect(wrapper.vm.validarSeccion()).toBeFalsy()
    expect(wrapper.vm.seccionEntrada).toBeTruthy()
  })

  it('método "validarSeccion" funciona correctamente con seccion igual a "undefined"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.seccion_id = undefined
    expect(wrapper.vm.validarSeccion()).toBeFalsy()
    expect(wrapper.vm.seccionEntrada).toBeTruthy()
  })

  it('método "validarSeccion" funciona correctamente con seccion igual a ""', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.seccion_id = ''
    expect(wrapper.vm.validarSeccion()).toBeFalsy()
    expect(wrapper.vm.seccionEntrada).toBeTruthy()
  })

  it('método "validarSeccion" funciona correctamente con seccion igual a cero', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.seccion_id = 0
    expect(wrapper.vm.validarSeccion()).toBeFalsy()
    expect(wrapper.vm.seccionEntrada).toBeTruthy()
  })

  it('método "validarSeccion" funciona correctamente con seccion mayor a cero', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.estudiante.seccion_id = 92453
    expect(wrapper.vm.validarSeccion()).toBeTruthy()
    expect(wrapper.vm.seccionEntrada).toBeFalsy()
  })

  it('método "validarFormulario" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '1345633-9',
              email: 'mauricio.cobarrubias@gmail.com'
            },
            seccion_id: 62345234
          },
          listaEstudiantes: [
            {run_est: '62345345-k'},
            {run_est: '62456624-2'}
          ]
        }
      }
    })
    expect(wrapper.vm.validarFormulario()).toBeFalsy()
  })

  it('método "validarFormulario" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(GestionEstudiantes, {
      data() {
        return {
          estudiante: {
            usuario: {
              nombre: 'Mauricio',
              apellido_paterno: 'Cobarrubias',
              apellido_materno: 'Celedón',
              run: '13456334-6',
              email: 'mauricio.cobarrubias@usach.cl'
            },
            seccion_id: 62345234
          },
          listaEstudiantes: [
            {run_est: '62345345-k'},
            {run_est: '62456624-2'}
          ]
        }
      }
    })
    expect(wrapper.vm.validarFormulario()).toBeTruthy()
  })

  const listaEstudiantes = [
    {id: 29353}, {id: 9534}, {id: 926364}
  ]

  it('método "seleccionarTodos" funciona correctamente con "selección de todos"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.listaEstudiantes = listaEstudiantes
    wrapper.vm.eliminados = [9534]
    wrapper.vm.seleccionarTodos()
    expect(wrapper.vm.eliminados).toEqual([29353, 9534, 926364])
  })

  it('método "seleccionarTodos" funciona correctamente con "deselección"', () => {
    const wrapper = shallowMount(GestionEstudiantes)
    wrapper.vm.listaEstudiantes = listaEstudiantes
    wrapper.vm.eliminados = [29353, 9534, 926364]
    wrapper.vm.seleccionarTodos()
    expect(wrapper.vm.eliminados).toEqual([])
  })
})
