import { shallowMount } from '@vue/test-utils'
import EstadisticasGrupo from '@/components/EstadisticasGrupo.vue'

describe('EstadisticasGrupo.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(EstadisticasGrupo)
  })

  // Variables
  const registros = [
    {
      id: 4634,
      iniciales: 'ABC',
      usuario: {
        id: 9433,
        nombre: 'Juan',
        apellido_paterno: 'Castro',
        apellido_materno: 'Gonzalez',
        run: '12345678-9',
        registros: {
          minutas: 43,
          tema: 2,
          objetivos: 13,
          conclusiones: 7,
          items: 131,
          comentarios: 0,
          respuestas: 83
        }
      }
    }
  ]

  // Comienzo de test unitarios
  it('variable "grupoSeleccionado" se inicializa correctamente', () => {
    expect(wrapper.vm.grupoSeleccionado).toEqual({})
  })

  it('variable "registros" se inicializa correctamente', () => {
    expect(wrapper.vm.registros).toEqual([])
  })

  it('propiedad computada "mostrarRegistros" funciona correctamente con "false"', () => {
    expect(wrapper.vm.mostrarRegistros).toBeFalsy()
  })

  it('propiedad computada "mostrarRegistros" funciona correctamente con "true"', () => {
    wrapper.vm.registros = registros
    expect(wrapper.vm.mostrarRegistros).toBeTruthy()
  })

  it('propiedad computada "totalRegistros" funciona correctamente con "registros" inicial', () => {
    expect(wrapper.vm.totalRegistros).toEqual(0)
  })

  it('propiedad computada "totalRegistros" funciona correctamente con "registros" distinto a inicial', () => {
    wrapper.vm.registros = registros
    expect(wrapper.vm.totalRegistros).toEqual(279)
  })
})
