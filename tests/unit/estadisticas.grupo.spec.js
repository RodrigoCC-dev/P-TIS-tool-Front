import { shallowMount } from '@vue/test-utils'
import EstadisticasGrupo from '@/components/EstadisticasGrupo.vue'

describe('EstadisticasGrupo.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(EstadisticasGrupo)
  })

  // Variables
  const grupo = {
    id: 945,
    nombre: 'G01',
    proyecto: 'Pruebas unitarias',
    correlativo: 1,
    jornada: 'Diurna',
    estudiantes: [
      {
        id: 4634,
        iniciales: 'ABC',
        usuario: {
          nombre: 'Juan',
          apellido_paterno: 'Castro',
          apellido_materno: 'Gonzalez',
          run: '12345678-9',
          email: 'juan.gonzales@algo.com'
        }
      }
    ]
  }

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

  it('método "nombreCompleto" funciona correctamente', () => {
    expect(wrapper.vm.nombreCompleto(registros[0].usuario)).toEqual('Juan Castro Gonzalez')
  })

  it('método "subTotalRegistros" funciona correctamente', () => {
    expect(wrapper.vm.subTotalRegistros(registros[0])).toEqual(279)
  })

  it('método "porcentajeParcial" funciona correctamente con valores mayores a cero', () => {
    wrapper.vm.registros = registros
    expect(wrapper.vm.porcentajeParcial(registros[0])).toEqual('100.0')
  })

  it('método "porcentajeParcial" funciona correctamente con "registros" vacío', () => {
    expect(wrapper.vm.porcentajeParcial(registros[0])).toEqual(0)
  })

  it('método "porcentajeParcial" funciona correctamente con "registros" igual a cero', () => {
    const estudiante = [{
      id: 4634,
      iniciales: 'ABC',
      usuario: {
        id: 9433,
        nombre: 'Juan',
        apellido_paterno: 'Castro',
        apellido_materno: 'Gonzalez',
        run: '12345678-9',
        registros: {
          minutas: 0,
          tema: 0,
          objetivos: 0,
          conclusiones: 0,
          items: 0,
          comentarios: 0,
          respuestas: 0
        }
      }
    }]
    wrapper.vm.registros = estudiante
    expect(wrapper.vm.porcentajeParcial(estudiante[0])).toEqual('0.0')
  })
})
