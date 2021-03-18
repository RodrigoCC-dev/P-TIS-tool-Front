import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import Estudiante from '@/components/views/Estudiante.vue'

const apiUrl = '127.0.0.1:3000'

const store = createStore({
  state() {
    return {
      apiUrl: apiUrl,
      tipoMinutas: [],
      usuario: {
        id: 345,
        nombre: 'Manuel',
        apellido_paterno: 'Aravena',
        apellido_materno: 'Hernandez',
        run: '12345678-9',
        email: 'manuel.aravena@algo.com',
        rol_id: 6493,
        rol: {
          id: 6493,
          rol: 'Estudiante',
          rango: 3
        }
      },
      estudiante: {},
      grupo: {},
      motivos: [],
      tipoAprobaciones: []
    }
  },
  mutations: {
    setTipoMinutas(state, valor) {
      state.tipoMinutas = valor
    },
    setEstudiante(state, valor) {
      state.estudiante = valor
    },
    setGrupo(state, valor) {
      state.grupo = valor
    },
    setTipoAprobaciones(state, valor) {
      state.tipoAprobaciones = valor
    },
    setMotivos(state, valor) {
      state.motivos = valor
    }
  }
})

const tipoMinutas = [
  {id: 463, tipo: 'Coordinacion'},
  {id: 6921, tipo: 'Cliente'},
  {id: 631, tipo: 'Semanal'}
]

const estudiante = {
  id: 964,
  iniciales: 'MAH',
  usuario_id: 345,
  seccion_id: 5,
  grupo_id: 123,
  usuario: {
    id: 345,
    nombre: 'Manuel',
    apellido_paterno: 'Aravena',
    apellido_materno: 'Hernandez',
    run: '12345678-9',
    email: 'manuel.aravena@algo.com',
    rol_id: 6493
  }
}

const grupo = {
  id: 123,
  nombre: 'G05',
  proyecto: 'Prueba de estudiantes',
  correlativo: 5,
  estudiantes: [
    {
      id: 964,
      iniciales: 'MAH',
      usuario: {
        nombre: 'Manuel',
        apellido_paterno: 'Aravena',
        apellido_materno: 'Hernandez',
        run: '12345678-9',
        email: 'manuel.aravena@algo.com'
      }
    }
  ]
}

const tipoAprobaciones = [
  {id: 9643, identificador: 'A', descripcion: 'Aprobada', rango: 1},
  {id: 2353, identificador: 'AC', descripcion: 'Aprobada con comentarios', rango: 2},
  {id: 4613, identificador: 'R', descripcion: 'Rechazada', rango: 3},
  {id: 963, identificador: 'RC', descripcion: 'Rechazada con comentarios', rango: 4}
]

const motivos = [
  {id: 9643, motivo: 'Coordinacion interna', identificador: 'CI'},
  {id: 9436, motivo: 'Para aprobacion', identificador: 'PA'},
  {id: 9233, motivo: 'Emision final', identificador: 'EF'}
]

jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case apiUrl + '/tipo_minutas':
      return Promise.resolve({data: tipoMinutas})
    case apiUrl + '/estudiantes/345':
      return Promise.resolve({data: estudiante})
    case apiUrl + '/grupos/123':
      return Promise.resolve({data: grupo})
    case apiUrl + '/tipo_aprobaciones':
      return Promise.resolve({data: tipoAprobaciones})
    case apiUrl + '/motivos':
      return Promise.resolve({data: motivos})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('Estudiante.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Estudiante, {
      global: {
        plugins: [store]
      }
    })
  })

  it('variable "verFormulario" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verFormulario).toBeFalsy()
  })

  it('variable "tipo" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tipo).toEqual(0)
  })

  it('variable "seleccionarMinuta" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.seleccionarMinuta).toBeFalsy()
  })

  it('variable "idBitacora" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idBitacora).toEqual(0)
  })

  it('variable "idRevision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idRevision).toEqual(0)
  })

  it('variable "idComentarios" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idComentarios).toEqual(0)
  })

  it('variable "idRespuestas" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idRespuestas).toEqual(0)
  })

  it('variable "idEmision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idEmision).toEqual(0)
  })

  it('variable "crearMinuta" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.crearMinuta).toBeTruthy()
  })

  it('variable "verRevision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verRevision).toBeFalsy()
  })

  it('variable "verComentarios" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verComentarios).toBeFalsy()
  })

  it('variable "verRespuestas" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verRespuestas).toBeFalsy()
  })

  it('variable "verEmision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verEmision).toBeFalsy()
  })

  it('variable "verSemanal" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verSemanal).toBeFalsy()
  })

  it('variable "revisarSemanal" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.revisarSemanal).toBeFalsy()
  })

  it('variable "idMotivo" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idMotivo).toEqual(0)
  })

  it('variable "nuevaRevision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.nuevaRevision).toEqual('')
  })

  it('variable "esNuevaEmision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.esNuevaEmision).toBeFalsy()
  })

  it('variable "valorActual" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.valorActual).toEqual(0)
  })

  it('variable "tableroEst" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableroEst).toEqual(0)
  })

  it('variable "bitacoraAvance" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.bitacoraAvance).toEqual({})
  })
})
