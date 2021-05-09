import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import GestionGrupos from '@/components/GestionGrupos.vue'

// Mock store
const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
      jornadaActual: 'Diurna'
    }
  },
  mutations: {
    setJornadaActual (state, valor) {
      state.jornadaActual = valor
    }
  }
})

// Variables globales
const grupos = [
  {
    id: 93453,
    nombre: 'G01',
    proyecto: 'Proyecto de prueba unitario',
    correlativo: 34,
    jornada: 'Diurna',
    estudiantes: [{
      id: 92345,
      iniciales: 'ABC',
      usuario: {
        nombre: 'Alberto',
        apellido_paterno: 'Becerra',
        apellido_materno: 'Castro',
        run: '11111111-1',
        email: 'alberto.becerra@algo.com'
      }
    }],
    stakeholders: []
  }
]

const listaEstudiantes = [
  {id: 29353, jornada: 'Diurna'},
  {id: 9534, jornada: 'Diurna'},
  {id: 926364, jornada: 'Vespertina'}
]

// Mock axios
jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case '127.0.0.1:3000/grupos':
      return Promise.resolve({data: grupos})
    case '127.0.0.1:3000/estudiantes/asignacion/sin_grupo':
      return Promise.resolve({data: []})
    default:
      return Promise.reject(new Error('not found'))
  }
})

axios.delete.mockImplementation((url) => {
  switch (url) {
    case '127.0.0.1:3000/grupos/10':
      return Promise.resolve(201)
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('GestionGrupos.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GestionGrupos, {
      global: {
        plugins: [store]
      }
    })
  })

  it('variable verFormulario se inicializa en false', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable estudiantes se inicializa vacía', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.estudiantes).toEqual([])
  })

  it('variable entradas se inicializa correctamente', async () => {
    const entradas = {
      proyecto: {
        error: false,
        mensaje: ''
      },
      estudiantes: {
        error: false,
        mensaje: ''
      }
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.entradas).toEqual(entradas)
  })

  it('variable grupo se inicializa correctamente', async () => {
    const nuevo = {
      nombre: '',
      proyecto: '',
      correlativo: 0
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.grupo).toEqual(nuevo)
  })

  it('variable listaEstudiantes se inicializa vacía', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.listaEstudiantes).toEqual([])
  })

  it('variable listaGrupos se inicializa correctamente', async () => {
    wrapper.vm.obtenerGrupos()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.listaGrupos).toEqual(grupos)
  })

  it('variable "notificar" se inicializa correctamente', () => {
    expect(wrapper.vm.notificar.id).toEqual(0)
    expect(wrapper.vm.notificar.mostrar).toBeFalsy()
    expect(wrapper.vm.notificar.mensaje).toEqual('¿Confirma la eliminación del grupo?')
  })

  it('propiedad computada "sinAsignar" funciona correctamente', async () => {
    const esperado = [
      {id: 29353, jornada: 'Diurna'},
      {id: 9534, jornada: 'Diurna'}
    ]
    wrapper.vm.listaEstudiantes = listaEstudiantes
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.sinAsignar).toEqual(esperado)
  })

  it('propiedad computada "mostrarLista" funciona correctamente con "true"', async () => {
    wrapper.vm.listaEstudiantes = listaEstudiantes
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mostrarLista).toBeTruthy()
  })

  it('propiedad computada "mostrarLista" funciona correctamente con "false"', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mostrarLista).toBeFalsy()
  })

  it('propiedad computada "gruposJornada" funciona correctamente con jornada "Diurna"', async () => {
    const esperado = [
      {
        id: 93453,
        nombre: 'G01',
        proyecto: 'Proyecto de prueba unitario',
        correlativo: 34,
        jornada: 'Diurna',
        estudiantes: [{
          id: 92345,
          iniciales: 'ABC',
          usuario: {
            nombre: 'Alberto',
            apellido_paterno: 'Becerra',
            apellido_materno: 'Castro',
            run: '11111111-1',
            email: 'alberto.becerra@algo.com'
          }
        }],
        stakeholders: []
      }
    ]
    wrapper.vm.obtenerGrupos()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.gruposJornada).toEqual(esperado)
  })

  it('propiedad computada "gruposJornada" funciona correctamente con jornada "Vespertina"', async () => {
    wrapper.vm.$store.commit('setJornadaActual', "Vespertina")
    wrapper.vm.obtenerGrupos()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.gruposJornada).toEqual([])
  })

  it('método "concatenarNombre" funciona correctamente', async () => {
    const estudiante = {
      nombre_est: 'Mateo',
      apellido1: 'Iglesias',
      apellido2: 'Del Campo'
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.concatenarNombre(estudiante)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método "nombreCompleto" funciona correctamente', async () => {
    const estudiante = {
      nombre: 'Mateo',
      apellido_paterno: 'Iglesias',
      apellido_materno: 'Del Campo'
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método "visualizarRun" funciona correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.visualizarRun('12345678-9')).toEqual('12.345.678-9')
  })

  it('método "mostrarClientes" funciona correctamente con "true"', async () => {
    const grupo = {
      stakeholders: [{id: 962354}, {id: 6235345}, {id: 63453}]
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mostrarClientes(grupo)).toBeTruthy()
  })

  it('método "mostrarClientes" funciona correctamente con "true"', async () => {
    const grupo = {
      stakeholders: []
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mostrarClientes(grupo)).toBeFalsy()
  })

  it('método "agregarGrupo" funciona correctamente', async () => {
    wrapper.vm.verFormulario = false
    wrapper.vm.agregarGrupo()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verFormulario).toBeTruthy()
  })

/* Falta implementar función axios mock por única vez

  const url = '127.0.0.1:3000/estudiantes/asignacion/sin_grupo'
  axios.get.mockImplementationOnce((url) => Promise.resolve({data: listaEstudiantes}))

  it('método "obtenerEstudiantes" funciona correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.listaEstudiantes).toEqual(listaEstudiantes)
  })
*/

  it('método "obtenerGrupos" funciona correctamente', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.listaGrupos = []
    wrapper.vm.obtenerGrupos()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.listaGrupos).toEqual(grupos)
  })

  it('método "noAgregar" funciona correctamente', async () => {
    wrapper.vm.verFormulario = true
    wrapper.vm.entradas.proyecto.error = true
    wrapper.vm.entradas.estudiantes.error = true
    await wrapper.vm.$nextTick()
    wrapper.vm.noAgregar()
    expect(wrapper.vm.verFormulario).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeFalsy()
    expect(wrapper.vm.entradas.estudiantes.error).toBeFalsy()
  })

  it('método "nuevoGrupo" funciona correctamente', async () => {
    wrapper.vm.grupo.nombre = 'Grupo de prueba'
    wrapper.vm.grupo.proyecto = 'Pruebas de código'
    wrapper.vm.grupo.correlativo = 623534
    wrapper.vm.estudiantes = [{id: 962345}, {id: 9629353}]
    await wrapper.vm.$nextTick()
    wrapper.vm.nuevoGrupo()
    expect(wrapper.vm.grupo.nombre).toEqual('')
    expect(wrapper.vm.grupo.proyecto).toEqual('')
    expect(wrapper.vm.grupo.correlativo).toEqual(0)
    expect(wrapper.vm.estudiantes).toEqual([])
  })

  it('método "validarProyecto" funciona correctamente con proyecto igual a "null"', async () => {
    wrapper.vm.grupo.proyecto = null
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Se debe ingresar el nombre del proyecto a realizar')
  })

  it('método "validarProyecto" funciona correctamente con proyecto igual a "undefined"', async () => {
    wrapper.vm.grupo.proyecto = undefined
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Se debe ingresar el nombre del proyecto a realizar')
  })

  it('método "validarProyecto" funciona correctamente con proyecto igual a ""', async () => {
    wrapper.vm.grupo.proyecto = ''
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Se debe ingresar el nombre del proyecto a realizar')
  })

  it('método "validarProyecto" funciona correctamente con proyecto distinto a "regExp"', async () => {
    wrapper.vm.grupo.proyecto = 'Gistdc,ast346#&#adis'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Sólo se admiten letras. Verificar que no tenga caracteres especiales')
  })

  it('método "validarProyecto" funciona correctamente con proyecto con "regExp" correcto', async () => {
    wrapper.vm.grupo.proyecto = 'Proyecto de Prueba'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarProyecto()).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.error).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('')
  })

  it('método "validarAsignacion" funciona correctamente para "true"', async () => {
    wrapper.vm.estudiantes = [{id: 943453}, {id: 9249345}]
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarAsignacion()).toBeTruthy()
    expect(wrapper.vm.entradas.estudiantes.error).toBeFalsy()
    expect(wrapper.vm.entradas.estudiantes.mensaje).toEqual('')
  })

  it('método "validarAsignacion" funciona correctamente para "false"', async () => {
    wrapper.vm.estudiantes = []
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarAsignacion()).toBeFalsy()
    expect(wrapper.vm.entradas.estudiantes.error).toBeTruthy()
    expect(wrapper.vm.entradas.estudiantes.mensaje).toEqual('No se han asignado estudiantes al grupo')
  })

  it('método "validarDatos" funciona correctamente para "true"', async () => {
    wrapper.vm.grupo.proyecto = 'Proyecto de Prueba'
    wrapper.vm.estudiantes = [{id: 943453}, {id: 9249345}]
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarDatos()).toBeTruthy()
  })

  it('método "validarDatos" funciona correctamente para "false"', async () => {
    wrapper.vm.grupo.proyecto = undefined
    wrapper.vm.estudiantes = [{id: 943453}, {id: 9249345}]
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.validarDatos()).toBeFalsy()
  })

  it('método "borrarGrupo" funciona correctamente', () => {
    wrapper.vm.borrarGrupo(10)
    expect(wrapper.vm.notificar.mostrar).toBeTruthy()
    expect(wrapper.vm.notificar.id).toEqual(10)
  })

  it('método "confirmarBorrado" funciona correctamente', async () => {
    wrapper.vm.notificar.mostrar = true
    wrapper.vm.notificar.id = 10
    wrapper.vm.confirmarBorrado()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.notificar.mostrar).toBeFalsy()
    expect(wrapper.vm.notificar.id).toEqual(0)
  })

  it('método "cerrarNotificacion" funciona correctamente', () => {
    wrapper.vm.notificar.mostrar = true
    wrapper.vm.cerrarNotificacion()
    expect(wrapper.vm.notificar.mostrar).toBeFalsy()
  })
})
