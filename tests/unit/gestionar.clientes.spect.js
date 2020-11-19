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
    const esperado = {
      {
        id: 4653,
        jornada: 'Diurna'
      }
    }
    expect(wrapper.vm.listaFiltrada).toEqual(esperado)
  })

  it('propiedad computada stakeholdersPorJornada funciona correctamente', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          listaStakeholders: [
            {
              id: 6354,
              jornada: 'Diurna'
            },
            {
              id: 6435343,
              jornada: 'Vespertina'
            }
          ],
          jornadaActual: 'Diurna'
        }
      }
    })
    const esperado = {
      id: 6354,
      jornada: 'Diurna'
    }
    expect(wrapper.vm.stakeholdersPorJornada).toEqual(esperado)
  })

  it('propiedad computada mostrarLista funciona correctamente con true', () => {
    const wrapper = shallowMount(GestionClientes, {
      data() {
        return {
          stakeholdersPorJornada: [
            {
              id: 63453,
              jornada: 'Diurna'
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
})
