import { shallowMount } from '@vue/test-utils'
import TableroEst from '@/components/TableroEst.vue'

describe('TableroEst.vue', () => {
  it('variable nombreTab de inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.nombreTab).toEqual('Borradores')
  })

  it('variable nombreTabs se inicializa correctamente', () => {
    const esperado = {
      borradores: 'Borradores',
      emitidas: 'Emitidas',
      revision: 'Revision',
      comentadas: 'Comentadas',
      respondidas: 'Respondidas',
      cerradas: 'Cerradas'
    }
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.nombreTabs).toEqual(esperado)
  })

  it('variable listaMinutas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaMinutas).toEqual([])
  })

  it('variable listaBorradores se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaBorradores).toEqual([])
  })

  it('variable listaComentadasGrupo se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaComentadasGrupo).toEqual([])
  })

  it('variable listaComentadasCliente se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaComentadasCliente).toEqual([])
  })

  it('variable listaRespondidasGrupo se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaRespondidasGrupo).toEqual([])
  })

  it('variable listaRespondidasCliente se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaRespondidasCliente).toEqual([])
  })

  it('variable listaCerradas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaCerradas).toEqual([])
  })

  it('variable listaEmitidas se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaEmitidas).toEqual([])
  })

  it('variable listaRevision se inicializa correctamente', () => {
    const wrapper = shallowMount(TableroEst)
    expect(wrapper.vm.listaRevision).toEqual([])
  })
})
