import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Notificacion from '@/components/Notificacion.vue'

const store = createStore({
  state() {
    return {
      notificacion: {
        mensaje: '',
        mostrar: false
      },
      claseNotificacion: {
        exito: false,
        alarma: false,
        error: false
      }
    }
  },
  mutations: {
    setNotificacion (state, valor) {
      state.notificacion.mensaje = valor
      state.notificacion.mostrar = true
    },
    setClaseNotExito (state, valor) {
      state.claseNotificacion.exito = valor
      state.claseNotificacion.alarma = false
      state.claseNotificacion.error = false
    },
    setClaseNotAlarma (state, valor) {
      state.claseNotificacion.alarma = valor
      state.claseNotificacion.exito = false
      state.claseNotificacion.error = false
    },
    setClaseNotError (state, valor) {
      state.claseNotificacion.error = valor
      state.claseNotificacion.alarma = false
      state.claseNotificacion.exito = false
    },
    cerrarNotificacion (state) {
      state.notificacion.mensaje = ''
      state.notificacion.mostrar = false
      state.claseNotificacion.error = false
      state.claseNotificacion.alarma = false
      state.claseNotificacion.exito = false
    }
  }
})

describe('Notificacion', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Notificacion, {
      global: {
        plugins: [store]
      }
    })
  })

  it('propiedad computada "tipoNotificacion" funciona correctamente para valores iniciales', () => {
    expect(wrapper.vm.tipoNotificacion).toEqual('')
  })

  it('propiedad computada "tipoNotificacion" funciona correctamente para "exito"', () => {
    wrapper.vm.$store.commit('setClaseNotExito', true)
    expect(wrapper.vm.tipoNotificacion).toEqual('is-success-usach')
  })

  it('propiedad computada "tipoNotificacion" funciona correctamente para "alarma"', () => {
    wrapper.vm.$store.commit('setClaseNotAlarma', true)
    expect(wrapper.vm.tipoNotificacion).toEqual('is-warning-usach')
  })

  it('propiedad computada "tipoNotificacion" funciona correctamente para "error"', () => {
    wrapper.vm.$store.commit('setClaseNotError', true)
    expect(wrapper.vm.tipoNotificacion).toEqual('is-danger-usach')
  })

  it('método "cerrar" funciona correctamente', () => {
    wrapper.vm.$store.commit('setNotificacion', 'Notificacion de prueba')
    wrapper.vm.$store.commit('setClaseNotAlarma', true)
    wrapper.vm.cerrar()
    expect(wrapper.vm.notificacion.mensaje).toEqual('')
    expect(wrapper.vm.notificacion.mostrar).toBeFalsy()
    expect(wrapper.vm.claseNotificacion.error).toBeFalsy()
    expect(wrapper.vm.claseNotificacion.alarma).toBeFalsy()
    expect(wrapper.vm.claseNotificacion.exito).toBeFalsy()
  })
})
