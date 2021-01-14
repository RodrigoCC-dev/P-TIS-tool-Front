import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
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
