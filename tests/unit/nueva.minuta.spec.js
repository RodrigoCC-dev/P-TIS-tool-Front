import { shallowMount } from '@vue/test-utils'
import Nueva from '@/components/comentarios/NuevaMinuta.vue'

describe('NuevaMinuta.vue', () => {
  let bitacora

  beforeEach(() => {
    bitacora = {
      id: 663462,
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

  it('método "buscarIniciales" funciona correctamente', () => {
    const wrapper = shallowMount(Nueva, {
      data() {
        return {
          bitacora: bitacora
        }
      }
    })
    expect(wrapper.vm.buscarIniciales(62345)).toEqual('GER')
  })

  it('método "establecerNuevaRevision" funciona correctamente con "nuevoMotivo" igual a "EF"', () => {
    const wrapper = shallowMount(Nueva, {
      data() {
        return {
          bitacora: bitacora,
          nuevoMotivo: 'EF'
        }
      }
    })
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual(0)
  })

  it('método "establecerNuevaRevision" funciona correctamente con "identificador" igual a "EF"', () => {
    const wrapper = shallowMount(Nueva, {
      data() {
        return {
          bitacora: bitacora,
          nuevoMotivo: 'EF'
        }
      }
    })
    wrapper.vm.bitacora.identificador = 'EF'
    wrapper.vm.bitacora.revision = 1
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual(2)
  })

  it('método "establecerNuevaRevision" funciona correctamente con "nuevoMotivo" distinto a "EF"', () => {
    const wrapper = shallowMount(Nueva, {
      data() {
        return {
          bitacora: bitacora,
          nuevoMotivo: 'EAC'
        }
      }
    })
    wrapper.vm.establecerNuevaRevision()
    expect(wrapper.vm.nuevaRevision).toEqual('N')
  })

  it('método "emitir" funciona correctamente', async () => {
    const wrapper = shallowMount(Nueva, {
      data() {
        return {
          bitacora: bitacora
        }
      }
    })
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
})
