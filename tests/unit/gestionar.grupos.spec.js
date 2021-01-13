import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import flushPromises from 'flush-promises'
import axios from 'axios'
import GestionGrupos from '@/components/GestionGrupos.vue'

const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
      jornadaActual: 'Diurna'
    }
  }
})

jest.mock('axios', () => {
  get: () => new Promise(resolve => {
    resolve({ data: [
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
    ]})
  })
})

describe('GestionGrupos.vue', () => {
  const listaEstudiantes = [
    {id: 29353, jornada: 'Diurna'},
    {id: 9534, jornada: 'Diurna'},
    {id: 926364, jornada: 'Vespertina'}
  ]

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(GestionGrupos, {
      global: {
        plugins: [store]
      }
    })
  })

  it('variable verFormulario se inicializa en false', async () => {
    await flushPromises()
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable mostrarJornadas se inicializa en false', async () => {
    await flushPromises()
    expect(wrapper.vm.mostrarJornadas).toBeFalsy()
  })

  it('variable jornadaActual se inicializa en Diurna', async () => {
    await flushPromises()
    expect(wrapper.vm.jornadaActual).toEqual('Diurna')
  })

  it('variable grupo se inicializa correctamente', async () => {
    const nuevo = {
      nombre: '',
      proyecto: '',
      correlativo: 0
    }
    await flushPromises()
    expect(wrapper.vm.grupo).toEqual(nuevo)
  })

  it('variable estudiantes se inicializa vacía', async () => {
    await flushPromises()
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
    await flushPromises()
    expect(wrapper.vm.entradas).toEqual(entradas)
  })

  it('variable listaEstudiantes se inicializa vacía', async () => {
    await flushPromises()
    expect(wrapper.vm.listaEstudiantes).toEqual([])
  })

  it('variable listaGrupos se inicializa vacía', async () => {
    await flushPromises()
    expect(wrapper.vm.listaGrupos).toEqual([])
  })

  it('propiedad computada "sinAsignar" funciona correctamente', async () => {
    const esperado = [
      {id: 29353, jornada: 'Diurna'},
      {id: 9534, jornada: 'Diurna'}
    ]
    wrapper.vm.listaEstudiantes = listaEstudiantes
    wrapper.vm.jornadaActual = 'Diurna'
    await flushPromises()
    expect(wrapper.vm.sinAsignar).toEqual(esperado)
  })

  it('propiedad computada "mostrarLista" funciona correctamente con "true"', async () => {
    wrapper.vm.listaEstudiantes = listaEstudiantes
    wrapper.vm.jornadaActual = 'Diurna'
    await flushPromises()
    expect(wrapper.vm.mostrarLista).toBeTruthy()
  })

  it('propiedad computada "mostrarLista" funciona correctamente con "false"', async () => {
    await flushPromises()
    expect(wrapper.vm.mostrarLista).toBeFalsy()
  })

  it('método "nombreCompleto" funciona correctamente', async () => {
    const estudiante = {
      nombre: 'Mateo',
      apellido_paterno: 'Iglesias',
      apellido_materno: 'Del Campo'
    }
    await flushPromises()
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Mateo Iglesias Del Campo')
  })

  it('método "mostrarClientes" funciona correctamente con "true"', async () => {
    const grupo = {
      stakeholders: [{id: 962354}, {id: 6235345}, {id: 63453}]
    }
    await flushPromises()
    expect(wrapper.vm.mostrarClientes(grupo)).toBeTruthy()
  })

  it('método "mostrarClientes" funciona correctamente con "true"', async () => {
    const grupo = {
      stakeholders: []
    }
    await flushPromises()
    expect(wrapper.vm.mostrarClientes(grupo)).toBeFalsy()
  })

/*
  it('método "elegirTab" funciona correctamente', () => {
    wrapper.vm.elegirTab('Vespertina')
    expect(wrapper.vm.jornadaActual).toEqual('Vespertina')
  })
*/

  it('método "agregarGrupo" funciona correctamente', async () => {
    wrapper.vm.verFormulario = false
    wrapper.vm.agregarGrupo()
    await flushPromises()
    expect(wrapper.vm.verFormulario).toBeTruthy()
  })

  it('método "noAgregar" funciona correctamente', async () => {
    wrapper.vm.verFormulario = true
    wrapper.vm.entradas.proyecto.error = true
    wrapper.vm.entradas.estudiantes.error = true
    await flushPromises()
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
    await flushPromises()
    wrapper.vm.nuevoGrupo()
    expect(wrapper.vm.grupo.nombre).toEqual('')
    expect(wrapper.vm.grupo.proyecto).toEqual('')
    expect(wrapper.vm.grupo.correlativo).toEqual(0)
    expect(wrapper.vm.estudiantes).toEqual([])
  })

  it('método "validarProyecto" funciona correctamente con proyecto igual a "null"', async () => {
    wrapper.vm.grupo.proyecto = null
    await flushPromises()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Se debe ingresar el nombre del proyecto a realizar')
  })

  it('método "validarProyecto" funciona correctamente con proyecto igual a "undefined"', async () => {
    wrapper.vm.grupo.proyecto = undefined
    await flushPromises()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Se debe ingresar el nombre del proyecto a realizar')
  })

  it('método "validarProyecto" funciona correctamente con proyecto igual a ""', async () => {
    wrapper.vm.grupo.proyecto = ''
    await flushPromises()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Se debe ingresar el nombre del proyecto a realizar')
  })

  it('método "validarProyecto" funciona correctamente con proyecto distinto a "regExp"', async () => {
    wrapper.vm.grupo.proyecto = 'Gistdc,ast346#&#adis'
    await flushPromises()
    expect(wrapper.vm.validarProyecto()).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.error).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('Sólo se admiten letras. Verificar que no tenga caracteres especiales')
  })

  it('método "validarProyecto" funciona correctamente con proyecto con "regExp" correcto', async () => {
    wrapper.vm.grupo.proyecto = 'Proyecto de Prueba'
    await flushPromises()
    expect(wrapper.vm.validarProyecto()).toBeTruthy()
    expect(wrapper.vm.entradas.proyecto.error).toBeFalsy()
    expect(wrapper.vm.entradas.proyecto.mensaje).toEqual('')
  })

  it('método "validarAsignacion" funciona correctamente para "true"', async () => {
    wrapper.vm.estudiantes = [{id: 943453}, {id: 9249345}]
    await flushPromises()
    expect(wrapper.vm.validarAsignacion()).toBeTruthy()
    expect(wrapper.vm.entradas.estudiantes.error).toBeFalsy()
    expect(wrapper.vm.entradas.estudiantes.mensaje).toEqual('')
  })

  it('método "validarAsignacion" funciona correctamente para "false"', async () => {
    wrapper.vm.estudiantes = []
    await flushPromises()
    expect(wrapper.vm.validarAsignacion()).toBeFalsy()
    expect(wrapper.vm.entradas.estudiantes.error).toBeTruthy()
    expect(wrapper.vm.entradas.estudiantes.mensaje).toEqual('No se han asignado estudiantes al grupo')
  })

  it('método "validarDatos" funciona correctamente para "true"', async () => {
    wrapper.vm.grupo.proyecto = 'Proyecto de Prueba'
    wrapper.vm.estudiantes = [{id: 943453}, {id: 9249345}]
    await flushPromises()
    expect(wrapper.vm.validarDatos()).toBeTruthy()
  })

  it('método "validarDatos" funciona correctamente para "false"', async () => {
    wrapper.vm.grupo.proyecto = undefined
    wrapper.vm.estudiantes = [{id: 943453}, {id: 9249345}]
    await flushPromises()
    expect(wrapper.vm.validarDatos()).toBeFalsy()
  })
})
