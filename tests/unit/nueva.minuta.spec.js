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

const respuestas = []

const aprobaciones = []

// Mock axios
jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case apiUrl + '/minutas/' + idMinuta:
      return Promise.resolve({data: bitacora})
    case apiUrl + '/respuestas/' + idMinuta:
      return Promise.resolve({data: []})
    case apiUrl + '/aprobaciones/' + idMinuta:
      return Promise.resolve({data: []})
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('NuevaMinuta.vue', () => {
  let wrapper
  let bitacora

  beforeEach(() => {
    wrapper = shallowMount(Nueva, {
      global: {
        plugins: [store]
      }
    })

    bitacora = {
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
          }
        ]
      }
    }
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
    wrapper.vm.bitacora = bitacora
    wrapper.vm.nuevoMotivo = 'EF'
    wrapper.vm.bitacora.identificador = 'EF'
    wrapper.vm.bitacora.revision = 1
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual(2)
  })

  it('método "establecerNuevaRevision" funciona correctamente con "nuevoMotivo" distinto a "EF"', () => {
    debugger
    wrapper.vm.bitacora = bitacora
    wrapper.vm.nuevoMotivo = 'EAC'
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual('N')
  })

  it('método "emitir" funciona correctamente', async () => {
    wrapper.vm.bitacora = bitacora
    wrapper.vm.bitacora.identificador = 'EF'
    wrapper.vm.bitacora.revision = 0
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
