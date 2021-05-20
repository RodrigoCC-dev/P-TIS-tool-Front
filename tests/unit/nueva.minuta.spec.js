import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'
import Nueva from '@/components/comentarios/NuevaMinuta.vue'

// Mock store
const apiUrl = '127.0.0.1:3000'

const store = createStore({
  state() {
    return {
      apiUrl: apiUrl,
      grupo: {
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
      },
      motivos: [
        {id: 9245, motivo: 'Emitida para coordinación interna', identificador: 'ECI'},
        {id: 9245, motivo: 'Emitida para revisión del cliente', identificador: 'ERC'},
        {id: 9245, motivo: 'Emitida para aprobación del cliente', identificador: 'EAC'},
        {id: 9245, motivo: 'Emisión final', identificador: 'EF'}
      ]
    }
  }
})

// Variables globales
const idMinuta = 663462

const bitacora = {
  id: idMinuta,
  revision: 'M',
  identificador: 'EAC',
  minuta: {
    id: 242345345,
    correlativo: 6345,
    tema: 'Esto es una prueba',
    fecha_reunion: '2020-12-14T00:00:00.000Z',
    h_inicio: '2020-12-14T23:00:00.000Z',
    h_termino: '2020-12-14T23:59:00.000Z',
    clasificacion: {
      informativa: false,
      avance: false,
      decision: true,
      coordinacion: false,
      otro: false
    },
    asistencia: [
      {
        id: 62345,
        iniciales: 'GER',
        descripcion: 'Presente'
      },
      {
        id: 143534,
        iniciales: 'PAR',
        descripcion: 'Presente'
      },
      {
        id: 63453,
        iniciales: 'CER',
        descripcion: 'Presente'
      }
    ],
    items: [
      {
        id: 413453,
        tipo: 'Compromiso',
        correlativo: 1,
        descripcion: 'Este es un item de prueba',
        fecha: '2020-12-31T00:00:00.000Z',
        responsables: [
          {
            id: 653453,
            asistencia_id: 62345
          }
        ]
      }
    ]
  }
}

const respuestas = [
  {
    id: 93453,
    comentario: 'Este es un comentario para la prueba',
    es_item: true,
    id_item: 413453,
    asistencia_id: 62345,
    bitacora_revision_id: idMinuta,
    respuestas: [
      {
        id: 134534,
        respuesta: 'Respuesta a un comentario de prueba',
        comentario_id: 93453,
        asistencia_id: 143534
      }
    ]
  },
  {
    id: 34534,
    comentario: 'Este es un comentario de prueba general',
    es_item: false,
    id_item: null,
    asistencia_id: 62345,
    bitacora_revision_id: idMinuta,
    respuestas: [
      {
        id: 845343,
        respuesta: 'Esta es una respuesta general de prueba',
        comentario_id: 34534,
        asistencia_id: 143534
      }
    ]
  }
]

const aprobaciones = [
  {
    id: 134534,
    bitacora_revision_id: idMinuta,
    asistencia_id: 143534,
    tipo_aprobacion_id: 1453464,
    tipo_aprobacion: {
      id: 1453464,
      identificador: 'A',
      descripcion: 'Aprobada',
      rango: 1
    }
  },
  {
    id: 843453,
    bitacora_revision_id: idMinuta,
    asistencia_id: 63453,
    tipo_aprobacion_id: 613453,
    tipo_aprobacion: {
      id: 613453,
      identificador: 'R',
      descripcion: 'Rechazada',
      rango: 3
    }
  }
]

// Mock axios
jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case apiUrl + '/minutas/' + idMinuta:
      return Promise.resolve({data: bitacora})
    case apiUrl + '/respuestas/' + idMinuta:
      return Promise.resolve({data: respuestas})
    case apiUrl + '/aprobaciones/' + idMinuta:
      return Promise.resolve({data: aprobaciones})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('NuevaMinuta.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Nueva, {
      global: {
        plugins: [store]
      }
    })
  })

  it('se asigna props "idBitacora" adecuadamente', () => {
    const wrapper = shallowMount(Nueva, {
      propsData: {
        idBitacora: 523
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.props().idBitacora).toEqual(523)
  })

  it('variable "id" se asigna con props correctamente', () => {
    const wrapper = shallowMount(Nueva, {
      propsData: {
        idBitacora: 523
      },
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.vm.id).toEqual(523)
  })

  it('variable "bitacora" se inicializa correctamente', () => {
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('variable "comentarios" se inicializa correctamente', () => {
    expect(wrapper.vm.comentarios).toEqual([])
  })

  it('variable "aprobaciones" se inicializa correctamente', () => {
    expect(wrapper.vm.aprobaciones).toEqual([])
  })

  it('variable "verAprobacion" se inicializa correctamente', () => {
    expect(wrapper.vm.verAprobacion).toBeFalsy()
  })

  it('variable "nuevoMotivo" se inicializa correctamente', () => {
    expect(wrapper.vm.nuevoMotivo).toEqual('')
  })

  it('variable "nuevaRevision" se inicializa correctamente', () => {
    expect(wrapper.vm.nuevaRevision).toEqual('')
  })

  it('variable "abc" se inicializa correctamente', () => {
    const esperado = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    expect(wrapper.vm.abc).toEqual(esperado)
  })

  it('propiedad computada "mostrarMinuta funciona correctamente para "false"', () => {
    expect(wrapper.vm.mostrarMinuta).toBeFalsy()
  })

  it('propiedad computada "mostrarMinuta funciona correctamente para "true"', () => {
    wrapper.vm.bitacora = bitacora
    expect(wrapper.vm.mostrarMinuta).toBeTruthy()
  })

  it('método "obtenerMinuta" funciona correctamente', async () => {
    wrapper.vm.obtenerMinuta(idMinuta)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.bitacora).toEqual(bitacora)
  })

  it('método "obtenerRespuestas" funciona correctamente', async () => {
    wrapper.vm.obtenerRespuestas(idMinuta)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.comentarios).toEqual(respuestas)
  })

  it('método "obtenerAprobaciones" funciona correctamente', async () => {
    wrapper.vm.obtenerAprobaciones(idMinuta)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.aprobaciones).toEqual(aprobaciones)
  })

  it('método "buscarIniciales" funciona correctamente', () => {
    wrapper.vm.bitacora = bitacora
    expect(wrapper.vm.buscarIniciales(62345)).toEqual('GER')
  })

  it('método "establecerNuevaRevision" funciona correctamente con "nuevoMotivo" igual a "EF"', () => {
    wrapper.vm.bitacora = bitacora
    wrapper.vm.nuevoMotivo = 'EF'
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual(0)
  })

  it('método "establecerNuevaRevision" funciona correctamente con "identificador" igual a "EF"', () => {
    wrapper.vm.bitacora = {
      id: idMinuta,
      revision: '1',
      identificador: 'EF',
      minuta: {
        id: 242345345,
        correlativo: 6345,
        tema: 'Esto es una prueba',
        fecha_reunion: '2020-12-14T00:00:00.000Z',
        h_inicio: '2020-12-14T23:00:00.000Z',
        h_termino: '2020-12-14T23:59:00.000Z',
        clasificacion: {
          informativa: false,
          avance: false,
          decision: true,
          coordinacion: false,
          otro: false
        },
        asistencia: [
          {
            id: 62345,
            iniciales: 'GER',
            descripcion: 'Presente'
          }
        ]
      }
    }
    wrapper.vm.nuevoMotivo = 'EF'
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual(2)
  })

  it('método "establecerNuevaRevision" funciona correctamente con "nuevoMotivo" distinto a "EF"', () => {
    wrapper.vm.bitacora = bitacora
    wrapper.vm.nuevoMotivo = 'EAC'
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual('N')
  })

  it('método "emitir" funciona correctamente', async () => {
    wrapper.vm.bitacora = {
      id: idMinuta,
      revision: '0',
      identificador: 'EF',
      minuta: {
        id: 242345345,
        correlativo: 6345,
        tema: 'Esto es una prueba',
        fecha_reunion: '2020-12-14T00:00:00.000Z',
        h_inicio: '2020-12-14T23:00:00.000Z',
        h_termino: '2020-12-14T23:59:00.000Z',
        clasificacion: {
          informativa: false,
          avance: false,
          decision: true,
          coordinacion: false,
          otro: false
        },
        asistencia: [
          {
            id: 62345,
            iniciales: 'GER',
            descripcion: 'Presente'
          }
        ]
      }
    }
    wrapper.vm.emitir()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.nuevoMotivo).toEqual('EF')
    expect(wrapper.vm.nuevaRevision).toEqual(1)
    expect(wrapper.emitted().cerrar).toBeTruthy()
    expect(wrapper.emitted().cerrar.length).toEqual(1)
    expect(wrapper.emitted().cerrar[0]).toEqual(['EF', 1])
    expect(wrapper.vm.verAprobacion).toBeFalsy()
  })

  it('método "revisar" funciona correctamente', async () => {
    wrapper.vm.bitacora = bitacora
    wrapper.vm.revisar()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verAprobacion).toBeTruthy()
    expect(wrapper.emitted().revisar).toBeTruthy()
    expect(wrapper.emitted().revisar.length).toEqual(1)
    expect(wrapper.emitted().revisar[0]).toEqual([])
  })

  it('método "cancelar" funciona correctamente', async () => {
    wrapper.vm.bitacora = bitacora
    wrapper.vm.cancelar()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.verAprobacion).toBeFalsy()
    expect(wrapper.emitted().cancelar).toBeTruthy()
    expect(wrapper.emitted().cancelar.length).toEqual(1)
    expect(wrapper.emitted().cancelar[0]).toEqual([])
  })
})
