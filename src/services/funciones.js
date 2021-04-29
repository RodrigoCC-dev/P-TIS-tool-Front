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
  },
  obtenerListaSegunTipo (listaFuente, llave, tipo) {
    var lista = []
    for (var i = 0; i < listaFuente.length; i++) {
      if (listaFuente[i][llave] === tipo) {
        lista.push(listaFuente[i])
      }
    }
    return lista
  },
  buscarIndexPorId (listaFuente, id) {
    var indice = -1
    for (var i = 0; i < listaFuente.length; i++) {
      if (listaFuente[i].id === id) {
        indice = i
      }
    }
    return indice
  },
  convertirFecha (timestamp) {
    var fecha = timestamp.split('T')
    return fecha[0]
  },
  convertirRevisionAEstado (identificador) {
    switch (identificador) {
      case 'ECI':
        return 'Coordinación de grupo'
      case 'ERC':
        return 'Para el cliente'
      case 'EAC':
        return 'Para aprobación'
      case 'EF':
        return 'Emisión final'
      default:
        return 'Sin estado'
    }
  },
  buscarIdAsistencia (bitacora, idEstudiante) {
    for (var i = 0; i < bitacora.minuta.asistencia.length; i++) {
      if (bitacora.minuta.asistencia[i].id_estudiante === idEstudiante) {
        return bitacora.minuta.asistencia[i].id
      }
    }
  },
  separarPorEstudiante (listaFuente, idAsistencia) {
    var lista = []
    for (var i = 0; i < listaFuente.length; i++) {
      if (listaFuente[i].responsables.asistencia_id === idAsistencia) {
        lista.push(listaFuente[i])
      }
    }
    return lista
  }
}
