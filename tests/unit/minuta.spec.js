import { shallowMount, mount } from '@vue/test-utils'
import Minuta from '@/components/Minuta.vue'

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
})
