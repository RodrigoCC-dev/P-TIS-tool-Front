import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import Respuestas from '@/components/comentarios/RespuestasMinuta.vue'

const store = createStore({
  state() {
    return {
      apiUrl: '127.0.0.1:3000',
      grupo: {
        id: 96435,
        nombre: 'G01',
        proyecto: 'Proyecto de prueba',
        correlativo: 9,
        estudiantes: [
          {id: 454, iniciales: 'ABC', usuario: {
            nombre: 'Alberto',
            apellido_paterno: 'Becerra',
            apellido_materno: 'Cabrera',
            run: '11111111-1',
            email: 'alberto.becerra@algo.com'
          }
        }
        ],
        stakeholders: []
      },
      tipoAprobaciones: [
        {id: 4353, identificador: 'A', descripcion: 'Aprobada', rango: 1},
        {id: 94543, identificador: 'AC', descripcion: 'Aprobada con comentarios', rango: 2},
        {id: 9454, identificador: 'R', descripcion: 'Rechazada', rango: 3},
        {id: 235, identificador: 'RC', descripcion: 'Rechazada con comentarios', rango: 4}
      ]
    }
  }
})

const bitacora = {
  id: 9454,
  revision: 'A',
  motivo: 'Emitido para prueba',
  identificador: 'ECI',
  minuta: {
    id: 39453,
    codigo: 'MINUTA_G04_03_2020-2_1121',
    correlativo: 3,
    tema: 'Esta es una prueba',
    creada_por: 'ABC',
    creada_el: '2020-03-04T09:23:34.454Z',
    tipo: 'Coordinacion',
    fecha_reunion: '2020-03-02T00:00:00.345Z',
    h_inicio: '2000-01-01T11:30:00.000Z',
    h_termino: '2000-01-01T12:30:00.000Z',
    clasificacion: {
      informativa: false,
      avance: true,
      coordinacion: false,
      decision: true,
      otro:false
    },
    objetivos: [],
    conclusiones: [],
    asistencia: [],
    items: []
  }
}

const comentarios = [
  {
    id: 94534,
    comentario: 'Este es un comentario de prueba',
    es_item: true,
    id_item: 3454,
    asistencia_id: 34,
    bitacora_revision_id: 9454,
    respuestas: [
      {
        id: 4543,
        respuesta: 'Respuesta al comentario de prueba',
        comentario_id: 94534,
        assitencia_id: 23495
      }
    ]
  }
]

jest.mock('axios')

const apiUrl = '127.0.0.1:3000'

axios.get.mockImplementation((url) => {
  switch (url) {
    case apiUrl + '/minutas/495':
      return Promise.resolve({data: bitacora})
    case apiUrl + '/respuestas/495':
      return Promise.resolve({data: comentarios})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('RespuestasMinuta.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Respuestas, {
      global: {
        plugins: [store]
      }
    })
  })

  it('se asigna prop "idBitacora" correctamente', () => {
    const wrapper = shallowMount(Respuestas, {
      propsData: {
        idBitacora: 5
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.props().idBitacora).toEqual(5)
  })

  it('variable "id" se asigna correctamente con props', () => {
    const wrapper = shallowMount(Respuestas, {
      propsData: {
        idBitacora: 5
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.id).toEqual(5)
  })

  it('vairable "bitacora" se inicializa correctamente', () => {
    const wrapper = shallowMount(Respuestas, {
      propsData: {
        idBitacora: 5
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('vairable "comentarios" se inicializa correctamente', () => {
    const wrapper = shallowMount(Respuestas, {
      propsData: {
        idBitacora: 5
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.comentarios).toEqual([])
  })

  it('vairable "aprobacion" se inicializa correctamente', () => {
    const wrapper = shallowMount(Respuestas, {
      propsData: {
        idBitacora: 5
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.aprobacion).toEqual(0)
  })
})
