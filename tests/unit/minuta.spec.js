import { shallowMount, mount } from '@vue/test-utils'
import Minuta from '@/components/Minuta.vue'
import { nextTick } from 'vue'

describe('Minuta.vue', () => {
  it('se asigna prop adecuadamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        tipoMinuta: 2
      }
    })
    expect(wrapper.props().tipoMinuta).toBe(2)
  })

  it('variable minuta se inicializa correctamente', () => {
    const wrapper = mount(Minuta, {
      propsData: {
        tipoMinuta: 2
      }
    })
    const minuta = {
      estudiante_id: 0,
      codigo: '',
      correlativo: 0,
      fecha_reunion: '',
      h_inicio: '',
      h_termino: '',
      tipo_minuta_id: 2
    }
    expect(wrapper.vm.minuta).toEqual(minuta)
  })

  it('variable clasificacion se inicializa correctamente', () => {
    const clasificacion = {
      informativa: false,
      avance: false,
      coordinacion: false,
      decision: false,
      otro: false
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.clasificacion).toEqual(clasificacion)
  })

  it('variable tema se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tema).toEqual('')
  })

  it('variable revision se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.revision).toEqual('')
  })

  it('variable asistencia se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.asistencia).toEqual([])
  })

  it('variable objetivos se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.objetivos).toEqual([''])
  })

  it('variable conclusiones se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.conclusiones).toEqual([''])
  })

  it('variable item se inicializa correctamente', () => {
    const item = {
      correlativo: 0,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: 0,
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.item).toEqual(item)
  })

  it('variable motivo_id se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.motivo_id).toEqual(1)
  })

  it('variable listaItems se inicializa correctamente', () => {
    const lista = [{
      correlativo: 1,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: 0,
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }]
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.listaItems).toEqual(lista)
  })

  it('variable tipo_items se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tipo_items).toEqual([])
  })

  it('variable tipo_asistencias se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tipo_asistencias).toEqual([])
  })

  it('variable tipo_estados se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.tipo_estados).toEqual([])
  })

  it('variable motivos se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.motivos).toEqual([])
  })

  it('variable listaClasificacion se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.listaClasificacion).toEqual([])
  })

  it('variable estudiante se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.estudiante).toEqual({})
  })

  it('variable grupo se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.grupo).toEqual({})
  })

  it('variable semestre se inicializa correctamente', () => {
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.semestre).toEqual({})
  })

  it('variable entradas se inicializa correctamente', () => {
    const entrada = {
      revision: {
        error: false,
        mensaje: ''
      },
      fecha_reunion: false,
      tema: false,
      h_inicio: false,
      h_termino: false,
      asistencias: false,
      clasificacion: false,
      objetivos: false,
      conclusiones: false
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.entradas).toEqual(entrada)
  })

  it('método removeFromArray funciona correctamente', () => {
    const array = ['Papa', 'Manzana', 'Naranja']
    const resultado = ['Manzana', 'Naranja']
    const wrapper = shallowMount(Minuta)
    wrapper.vm.removeFromArray(array, 'Papa')
    expect(array).toEqual(resultado)
  })

  it('método nombreCompleto funciona correctamente', () => {
    const estudiante = {
      nombre: 'Pablo',
      apellido_paterno: 'Mackena',
      apellido_materno: 'Saldias'
    }
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.nombreCompleto(estudiante)).toEqual('Pablo Mackena Saldias')
  })

  it('método buscarIdEstado funciona correctamente', () => {
    const array = [{
      id: 1,
      abreviacion: 'BO'
    },
    {
      id: 2,
      abreviacion: 'QU'
    }]
    const wrapper = shallowMount(Minuta)
    expect(wrapper.vm.buscarIdEstado(array, 'QU')).toEqual(2)
  })

  it('método agregarItem funciona correctamente', () => {
    const nuevo = {
      correlativo: 2,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: 0,
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }
    const wrapper = shallowMount(Minuta)
    wrapper.vm.agregarItem()
    expect(wrapper.vm.listaItems[1]).toEqual(nuevo)
  })

  it('método removerItem funciona correctamente', async () => {
    const elemento = {
      correlativo: 1,
      descripcion: '',
      fecha: '',
      tipo_item_id: 0,
      responsables: 0,
      entradas: {
        descripcion: false,
        fecha: false,
        tipo_item: false,
        responsables: false
      }
    }
    const wrapper = shallowMount(Minuta, {
      data() {
        return {
          listaItems: [
            {
              correlativo: 1,
              descripcion: '',
              fecha: '',
              tipo_item_id: 0,
              responsables: 0,
              entradas: {
                descripcion: false,
                fecha: false,
                tipo_item: false,
                responsables: false
              }
            },
            {
              correlativo: 2,
              descripcion: '',
              fecha: '',
              tipo_item_id: 0,
              responsables: 0,
              entradas: {
                descripcion: false,
                fecha: false,
                tipo_item: false,
                responsables: false
              }
            }
          ]
        }
      }
    })
    wrapper.vm.removerItem(elemento)
    await nextTick()
    await nextTick()
    expect(wrapper.vm.listaItems.length).toEqual(1)
  })
})
