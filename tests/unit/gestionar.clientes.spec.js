import { shallowMount } from '@vue/test-utils'
import GestionClientes from '@/components/GestionClientes.vue'

describe('GestionClientes.vue', () => {
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


  it('variable verFormulario se inicializa en false', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable verAsignaciones se inicializa en false', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.verAsignaciones).toBeFalsy()
  })

  it('variable stakeholder se inicializa correctamente', () => {
    const esperado = {
      usuario: {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: ''
      },
      grupo_id: null
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.stakeholder).toEqual(esperado)
  })

  it('variable listaStakeholders se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.listaStakeholders).toEqual([])
  })

  it('variable listaGrupos se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.listaGrupos).toEqual([])
  })

  it('variable entradas se inicializa correctamente', () => {
    const esperado = {
      nombre: {
        error: false,
        mensaje: ''
      },
      apellido_paterno: {
        error: false,
        mensaje: ''
      },
      apellido_materno: {
        error: false,
        mensaje: ''
      },
      correo_elec: {
        error: false,
        mensaje: ''
      },
      grupo: false
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.entradas).toEqual(esperado)
  })

  it('variable mensajes se inicializa correctamente', () => {
    const esperado = {
      sin_nombre: 'Debe ingresar el nombre del cliente',
      sin_apellido: 'Debe ingresar el apellido del cliente',
      sin_correo: 'Debe ingresar el correo electrónico del cliente',
      sin_especiales: 'Sólo letras. Verificar que no tenga caracteres especiales',
      correo_mal: 'El correo ingresado no es válido',
      correo_repetido: 'El correo ingresado ya se encuentra en el sistema'
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.mensajes).toEqual(esperado)
  })

  it('propiedad computada listaFiltrada funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          listaGrupos: [
            {
              id: 4653,
              jornada: 'Diurna'
            },
            {
              id: 24534,
              jornada: 'Vespertina'
            }
          ],
          jornadaActual: 'Diurna'
        }
      }
    })
    const esperado = [{
        id: 4653,
        jornada: 'Diurna'
      }]
    expect(wrapper.vm.listaFiltrada).toEqual(esperado)
  })

/*    Depende del 'state'
  it('propiedad computada stakeholdersPorJornada funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          listaStakeholders: [
            {
              id: 6354,
              grupos: [{
                nombre: 'G01',
                jornada: 'Diurna'
              }],
              nombre: 'Juan',
              apellido_paterno: 'Garmendia',
              apellido_materno: 'Solis'
            },
            {
              id: 6435343,
              grupos: [{
                nombre: 'G02',
                jornada: 'Vespertina'
              }],
              nombre: 'Mercedes',
              apellido_paterno: 'Hernandez',
              apellido_materno: 'Fuenzalida'
            }
          ]
        }
      },
      mock: {
        jornadaActual: 'Diurna'
      }
    })
    const esperado = [{
      id: 6354,
      jornada: 'Diurna',
      grupo: {
        nombre: 'G01'
      },
      nombre: 'Juan',
      apellido_paterno: 'Garmendia',
      apellido_materno: 'Solis'
    }]
    expect(wrapper.vm.stakeholdersPorJornada).toEqual(esperado)
  })
*/

  it('propiedad computada mostrarLista funciona correctamente con true', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          stakeholdersPorJornada: [
            {
              id: 6354,
              jornada: 'Diurna',
              grupo: {
                nombre: 'G01'
              },
              nombre: 'Juan',
              apellido_paterno: 'Garmendia',
              apellido_materno: 'Solis'
            }
          ]
        }
      }
    })
    expect(wrapper.vm.stakeholdersPorJornada).toBeTruthy()
  })

  it('propiedad computada mostrarLista funciona correctamente con false', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.mostrarLista).toBeFalsy()
  })

  it('método nombreCompleto funciona correctamente', () => {
    const estudiante = {
      nombre: 'Juan',
      apellido_paterno: 'Gonzalez',
      apellido_materno: 'Soto'
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Juan Gonzalez Soto')
  })

  it('método agregarCliente funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.agregarCliente()
    expect(wrapper.vm.verFormulario).toBeTruthy()
  })

  it('método nuevoStakeholder funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes, {
      data () {
        return {
          stakeholder: {
            usuario: {
              nombre: 'Pablo',
              apellido_paterno: 'Mestre',
              apellido_materno: 'Feliú',
              email: 'pablo.mestre@algo.com'
            },
            grupo_id: 543623
          }
        }
      }
    })
    wrapper.vm.nuevoStakeholder()
    expect(wrapper.vm.stakeholder.usuario.nombre).toEqual('')
    expect(wrapper.vm.stakeholder.usuario.apellido_paterno).toEqual('')
    expect(wrapper.vm.stakeholder.usuario.apellido_materno).toEqual('')
    expect(wrapper.vm.stakeholder.usuario.email).toEqual('')
    expect(wrapper.vm.stakeholder.grupo_id).toEqual(null)
  })

  it('método noAgregar funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          verFormulario: true,
          entradas: {
            nombre: {
              error: true
            },
            apellido_paterno: {
              error: true
            },
            apellido_materno: {
              error: true
            },
            correo_elec: {
              error: true
            },
            grupo: true
          }
        }
      }
    })
    wrapper.vm.noAgregar()
    expect(wrapper.vm.verFormulario).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_paterno.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_materno.error).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeFalsy()
    expect(wrapper.vm.entradas.grupo).toBeFalsy()
  })

  it('método "validarNombre" funciona correctamente con nombre "null"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.nombre = null
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre ""', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.nombre = ''
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre "undefined"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.nombre = undefined
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_nombre)
  })

  it('método "validarNombre" funciona correctamente con nombre distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.nombre = 'Carolina14963##&$'
    expect(wrapper.vm.validarNombre()).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.error).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarNombre" funciona correctamente con nombre con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.nombre = 'Fernanda'
    expect(wrapper.vm.validarNombre()).toBeTruthy()
    expect(wrapper.vm.entradas.nombre.error).toBeFalsy()
    expect(wrapper.vm.entradas.nombre.mensaje).toEqual('')
  })

  it('método "validarApellido" funciona correctamente con apellido "null"', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.validarApellido(null, entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellido" funciona correctamente con apellido "undefined"', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.validarApellido(undefined, entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellido" funciona correctamente con apellido igual a ""', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.validarApellido('', entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellido" funciona correctamente con apellido distinto de "regExp"', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.validarApellido('#b@r$Tolomeo', entradas)).toBeFalsy()
    expect(entradas.error).toBeTruthy()
    expect(entradas.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellido" funciona correctamente con apellido con "regExp" correcto', () => {
    var entradas = {
      error: null,
      mensaje: null
    }
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.validarApellido('Faundez', entradas)).toBeTruthy()
    expect(entradas.error).toBeFalsy()
    expect(entradas.mensaje).toEqual('')
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a "null"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_paterno = null
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_paterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_paterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a "undefined"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_paterno = undefined
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_paterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_paterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno igual a ""', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_paterno = ''
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_paterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_paterno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_paterno = 'C@stro#45'
    expect(wrapper.vm.validarApellidoP()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_paterno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_paterno.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellidoP" funciona correctamente con apellido_paterno con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_paterno = 'Castro'
    expect(wrapper.vm.validarApellidoP()).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_paterno.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_paterno.mensaje).toEqual('')
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a "null"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_materno = null
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_materno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_materno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a "undefined"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_materno = undefined
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_materno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_materno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno igual a ""', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_materno = ''
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_materno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_materno.mensaje).toEqual(wrapper.vm.mensajes.sin_apellido)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno distinto de "regExp"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_materno = 'Gaeg"&3kasisr'
    expect(wrapper.vm.validarApellidoM()).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_materno.error).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_materno.mensaje).toEqual(wrapper.vm.mensajes.sin_especiales)
  })

  it('método "validarApellidoM" funciona correctamente con apellido_materno con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.apellido_materno = 'Mendez'
    expect(wrapper.vm.validarApellidoM()).toBeTruthy()
    expect(wrapper.vm.entradas.apellido_materno.error).toBeFalsy()
    expect(wrapper.vm.entradas.apellido_materno.mensaje).toEqual('')
  })

  it('método "validarEmail" funciona correctamente con email igual a "null"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.email = null
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email igual a "undefined"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.email = undefined
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email igual a ""', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.email = ''
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.sin_correo)
  })

  it('método "validarEmail" funciona correctamente con email distinto a "regExp"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.email = '&3kasti,6ka0ds9gaib9asr.b9as025'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.correo_mal)
  })

  it('método "validarEmail" funciona correctamente con email con dos "@"', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.email = 'sebastian@ingenieria.cl@usach.com'
    expect(wrapper.vm.validarEmail()).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual(wrapper.vm.mensajes.correo_mal)
  })

  it('método "validarEmail" funciona correctamente con email con "regExp" correcto', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.stakeholder.usuario.email = 'gonzalo.dominguez@gmail.com'
    expect(wrapper.vm.validarEmail()).toBeTruthy()
    expect(wrapper.vm.entradas.correo_elec.error).toBeFalsy()
    expect(wrapper.vm.entradas.correo_elec.mensaje).toEqual('')
  })

  it('método existeStakeholder funciona correctamente con true', () => {
    const cliente = {
      usuario: {
        email: 'jose.venegas@algo.com'
      }
    }
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.listaStakeholders = listaStakeholders
    wrapper.vm.stakeholder = cliente
    expect(wrapper.vm.existeStakeholder()).toBeTruthy()
  })

  it('método existeStakeholder funciona correctamente con false', () => {
    const cliente = {
      usuario: {
        email: 'maria.maldonado@algo.com'
      }
    }
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.listaStakeholders = listaStakeholders
    wrapper.vm.stakeholder = cliente
    expect(wrapper.vm.existeStakeholder()).toBeFalsy()
  })

})
