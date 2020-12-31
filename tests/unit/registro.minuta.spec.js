import { shallowMount } from '@vue/test-utils'
import Registro from '@/components/RegistroMinuta.vue'

describe('RegistroMinuta.vue', () => {
  const registros = [
    {
      id: 623453,
      realizada_por: 4345,
      minuta_id: 62353,
      created_at: '2020-12-13T21:56:48.14TZ',
      tipo_actividad: {
        id: 62345,
        actividad: 'Alguna actividad',
        descripcion: 'Alguna descripcion',
        identificador: 'A1'
      },
      usuario: {
        id: 692345,
        nombre: 'Federico',
        apellido_paterno: 'Costa',
        apellido_materno: 'Undurraga',
        iniciales: 'FCU'
      }
    },
    {
      id: 96235,
      realizada_por: 9245,
      minuta_id: 96245,
      created_at: '2020-12-14T16:40:36.14TZ',
      tipo_actividad: {
        id: 952345,
        actividad: 'Otra actividad',
        descripcion: 'Otra descripcion',
        identificador: 'A2'
      },
      usuario: {
        id: 95245,
        nombre: 'Marcela',
        apellido_paterno: 'Negrete',
        apellido_materno: 'Jorquera',
        iniciales: 'MNJ'
      }
    }
  ]

  it('se asigna prop "idBitacora" adecuadamente', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.props().idBitacora).toEqual(6)
  })

  it('variable "id" se inicializa correctamente con prop', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.id).toEqual(6)
  })

  it('variable "registros" se inicializa correctamente', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.registros).toEqual([])
  })

  it('propiedad computada "mostrarRegistros" funciona correctamente con "false"', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.mostrarRegistros).toBeFalsy()
  })

  it('propiedad computada "mostrarRegistros" funciona correctamente con "true"', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      },
      data() {
        return {
          registros: registros
        }
      }
    })
    expect(wrapper.vm.mostrarRegistros).toBeTruthy()
  })

  it('método "obtenerFecha" funciona correctamente', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.obtenerFecha(registros[0].created_at)).toEqual('13-12-2020')
  })

  it('método "obtenerHora" funciona correctamente', () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    expect(wrapper.vm.obtenerHora(registros[0].created_at)).toEqual('21:56')
  })

  it('método "cerrar" funciona correctamente', async () => {
    const wrapper = shallowMount(Registro, {
      propsData: {
        idBitacora: 6
      }
    })
    wrapper.vm.cerrar()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().cerrar).toBeTruthy()
    expect(wrapper.emitted().cerrar.length).toEqual(1)
    expect(wrapper.emitted().cerrar[0]).toEqual([])
  })
})
