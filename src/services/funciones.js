export default {
  obtenerHora (timestamp) {
    var separar = timestamp.split('T')
    var tiempo = separar[1].split(':')
    return tiempo[0] + ':' + tiempo[1]
  },
  obtenerFecha (timestamp) {
    if (timestamp !== null) {
      var fecha = timestamp.split('T')
      var separar = fecha[0].split('-')
      return separar[2] + '-' + separar[1] + '-' + separar[0]
    } else {
      return ''
    }
  },
  removeFromArray (arr, item) {
    var i = arr.indexOf(item)
    i !== -1 && arr.splice(i, 1)
  },
  obtenerDescripciones (lista) {
    var resultado = []
    if (lista.length > 0) {
      for (var i = 0; i < lista.length; i++) {
        resultado.push(lista[i].descripcion)
      }
    }
    return resultado
  },
  obtenerIdDeLista (listaObj, llave, valor) {
    var id = 0
    for (var i = 0; i < listaObj.length; i++) {
      if (listaObj[i][llave] === valor) {
        id = listaObj[i].id
      }
    }
    return id
  },
  busquedaPorId (lista, id) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) {
        return lista[i]
      }
    }
    return {}
  },
  nombreCompleto (obj) {
    return obj.nombre + ' ' + obj.apellido_paterno + ' ' + obj.apellido_materno
  },
  buscarIniciales (listaAsistencia, asistenciaId) {
    var asistente = ''
    for (var i = 0; i < listaAsistencia.length; i++) {
      if (listaAsistencia[i].id === asistenciaId) {
        asistente = listaAsistencia[i].iniciales
      }
    }
    return asistente
  },
  asistenciaParticipante (listaAsistencia, llave, iniciales) {
    var asistencia = ''
    for (var i = 0; i < listaAsistencia.length; i++) {
      if (listaAsistencia[i].iniciales === iniciales && listaAsistencia[i][llave] !== null) {
        asistencia = listaAsistencia[i].descripcion
      }
    }
    return asistencia
  }
}
