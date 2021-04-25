import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import Stakeholder from '@/components/views/Stakeholder.vue'

const apiUrl = '127.0.0.1:3000'

// Mock store
const store = createStore({
  state() {
    return {
      apiUrl: apiUrl,
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
          rol: 'Stakeholder',
          rango: 4
        }
      },
      stakeholder: {},
      grupo: {},
      jornadaActual: 'Diurna',
      tipoAprobaciones: []
    }
  },
  mutations: {
    setStakeholder(state, valor) {
      state.stakeholder = valor
    },
    setGrupo(state, valor) {
      state.grupo = valor
    },
    setTipoAprobaciones(state, valor) {
      state.tipoAprobaciones = valor
    }
  }
})

// Variables globales
const stakeholder = {
  id: 964,
  iniciales: 'MAH',
  usuario_id: 345,
  usuario: {
    id: 345,
    nombre: 'Manuel',
    apellido_paterno: 'Aravena',
    apellido_materno: 'Hernandez',
    run: '12345678-9',
    email: 'manuel.aravena@algo.com',
    rol_id: 6493
  },
  grupos: [
    {
      id: 123,
      nombre: 'G05',
      proyecto: 'Prueba de estudiantes',
      correlativo: 5
    }
  ]
}

const grupo = {
  id: 123,
  nombre: 'G05',
  proyecto: 'Prueba de estudiantes',
  correlativo: 5,
  stakeholders: [
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

const listaGrupos = [
  {
    id: 62343,
    nombre: 'G01',
    proyecto: 'Pagina web de prueba',
    correlativo: 1,
    jornada: 'Vespertina',
    estudiantes: [
      {
        id: 1343,
        iniciales: 'ABC',
        usuario: {
          nombre: 'Andrea',
          apellido_paterno: 'Becerra',
          apellido_materno: 'Contreras',
          run: '19876543-2',
          email: 'andrea.becerra@algo.com'
        }
      },
      {
        id: 3453,
        iniciales: 'DEF',
        usuario: {
          nombre: 'Daniel',
          apellido_paterno: 'Espinoza',
          apellido_materno: 'Faundez',
          run: '112223333-4',
          email: 'daniel.espinoza@algo.com'
        }
      }
    ],
    stakeholder: []
  },
  {
    id: 123,
    nombre: 'G05',
    proyecto: 'Prueba de estudiantes',
    correlativo: 5,
    jornada: 'Diurna',
    estudiantes: [
      {
        id: 4634,
        inicales: 'GHI',
        usuario: {
          nombre: 'Gabriela',
          apellido_paterno: 'Hernandez',
          apellido_materno: 'Ibarra',
          run: '11333444-5',
          email: 'gabriela.hernadez@algo.com'
        }
      },
      {
        id: 5423463,
        inicales: 'JKL',
        usuario: {
          nombre: 'José',
          apellido_paterno: 'Kast',
          apellido_materno: 'López',
          run: '11444555-6',
          email: 'jose.kast@algo.com'
        }
      }
    ],
    stakeholders: [
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
]

// Mock axios
jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case apiUrl + '/stakeholders/345':
      return Promise.resolve({data: stakeholder})
    case apiUrl + '/grupos/123':
      return Promise.resolve({data: grupo})
    case apiUrl + '/grupos':
      return Promise.resolve({data: listaGrupos})
    case apiUrl + '/tipo_aprobaciones':
      return Promise.resolve({data: tipoAprobaciones})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('Stakeholder.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Stakeholder, {
      global: {
        plugins: [store]
      }
    })
  })

  // Comienzo de pruebas unitarias
  it('variable "nombreTab" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('variable "idRevision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idRevision).toEqual(0)
  })

  it('variable "idRespuestas" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idRespuestas).toEqual(0)
  })

  it('variable "idMinuta" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.idMinuta).toEqual(0)
  })

  it('variable "verTablero" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verTablero).toBeTruthy()
  })

  it('variable "verRevision" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verRevision).toBeFalsy()
  })

  it('variable "verRespuestas" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verRespuestas).toBeFalsy()
  })

  it('variable "verMinuta" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verMinuta).toBeFalsy()
  })

  it('variable "listaGrupos" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.listaGrupos).toEqual(listaGrupos)
  })

  it('variable "grupoActual" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.grupoActual).toEqual(123)
  })

  it('variable "grupoSeleccionado" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.grupoSeleccionado).toEqual(listaGrupos[1])
  })

  it('variable "verSelectorGrupo" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verSelectorGrupo).toBeFalsy()
  })

  it('variable "tableroStk" se inicializa correctamente', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableroStk).toEqual(1)
  })

  
})
