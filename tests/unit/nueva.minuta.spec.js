import { shallowMount } from '@vue/test-utils'
import Nueva from '@/components/comentarios/NuevaMinuta.vue'

describe('NuevaMinuta.vue', () => {
  const bitacora = {
    id: 663462,
    revision: 'Z',
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
          iniciales: 'GER',
          descripcion: 'Presente'
        }
      ]
    }
  }

  it('se asigna props "idBitacora" adecuadamente', () => {
    const wrapper = shallowMount(Nueva, {
      propsData: {
        idBitacora: 523
      }
    })
    expect(wrapper.props().idBitacora).toEqual(523)
  })

  it('variable "id" se asigna con props correctamente', () => {
    const wrapper = shallowMount(Nueva, {
      propsData: {
        idBitacora: 523
      }
    })
    expect(wrapper.vm.id).toEqual(523)
  })

  it('variable "bitacora" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.bitacora).toEqual({})
  })

  it('variable "comentarios" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.comentarios).toEqual([])
  })

  it('variable "aprobaciones" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.aprobaciones).toEqual([])
  })

  it('variable "verAprobacion" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.verAprobacion).toBeFalsy()
  })

  it('variable "nuevoMotivo" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.nuevoMotivo).toEqual('')
  })

  it('variable "nuevaRevision" se inicializa correctamente', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.nuevaRevision).toEqual('')
  })

  it('propiedad computada "mostrarMinuta funciona correctamente para "false"', () => {
    const wrapper = shallowMount(Nueva)
    expect(wrapper.vm.mostrarMinuta).toBeFalsy()
  })

  it('propiedad computada "mostrarMinuta funciona correctamente para "true"', () => {
    const wrapper = shallowMount(Nueva, {
      data() {
        return {
          bitacora: bitacora
        }
      }
    })
    expect(wrapper.vm.mostrarMinuta).toBeTruthy()
  })
})
