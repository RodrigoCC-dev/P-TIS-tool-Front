import { shallowMount } from '@vue/test-utils'
import TableroStk from '@/components/TableroStk.vue'

describe('TableroStk.vue', () => {
  it('variable nombreTab se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.nombreTab).toEqual('Revision')
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable listaRevision se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaRevision).toEqual([])
  })

  it('variable listaComentadas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaComentadas).toEqual([])
  })

  it('variable listaRespondidasGrupo se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaRespondidasGrupo).toEqual([])
  })

  it('variable listaRespondidasCliente se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaRespondidasCliente).toEqual([])
  })

  it('variable listaCerradas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.listaCerradas).toEqual([])
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      revision: 'Revision',
      comentadas: 'Comentadas',
      respondidas: 'Respondidas',
      cerradas: 'Cerradas'
    }
    const wrapper = shallowMount(TableroStk)
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })
})
