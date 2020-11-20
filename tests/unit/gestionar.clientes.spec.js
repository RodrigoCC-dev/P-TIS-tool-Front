import { shallowMount } from '@vue/test-utils'
import GestionClientes from '@/components/GestionClientes.vue'

describe('GestionClientes.vue', () => {
  it('variable verFormulario se inicializa en false', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable jornadaActual se inicializa correctamente', () => {
    const wrapper = shallowMount(GestionClientes)
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
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

  it('propiedad computada stakeholdersPorJornada funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          listaStakeholders: [
            {
              id: 6354,
              jornada: 'Diurna',
              grupo: {
                nombre: 'G01'
              },
              nombre: 'Juan',
              apellido_paterno: 'Garmendia',
              apellido_materno: 'Solis'
            },
            {
              id: 6435343,
              jornada: 'Vespertina',
              grupo: {
                nombre: 'G02'
              },
              nombre: 'Mercedes',
              apellido_paterno: 'Hernandez',
              apellido_materno: 'Fuenzalida'
            }
          ],
          jornadaActual: 'Diurna'
        }
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

  it('método cambiarJornada funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes)
    wrapper.vm.cambiarJornada('Diurna')
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
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

  it('método existeStakeholder funciona correctamente con true', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          listaStakeholders: [
            {
              id: 62345,
              email: 'jose.venegas@algo.com'
            },
            {
              id: 6234534,
              email: 'daniel.castro@algo.com'
            }
          ],
          stakeholder: {
            usuario: {
              email: 'jose.venegas@algo.com'
            }
          },
          mensajes: {
            correo_repetido: 'El correo está repetido'
          }
        }
      }
    })
    expect(wrapper.vm.existeStakeholder()).toBeTruthy()
  })

  it('método existeStakeholder funciona correctamente con false', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          listaStakeholders: [
            {
              id: 62345,
              email: 'jose.venegas@algo.com'
            },
            {
              id: 6234534,
              email: 'daniel.castro@algo.com'
            }
          ],
          stakeholder: {
            usuario: {
              email: 'maria.maldonado@algo.com'
            }
          }
        }
      }
    })
    expect(wrapper.vm.existeStakeholder()).toBeFalsy()
  })

})
