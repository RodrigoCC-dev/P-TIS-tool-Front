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
})
