export default {
  obtenerHora (timestamp) {
    var separar = timestamp.split('T')
    var tiempo = separar[1].split(':')
    return tiempo[0] + ':' + tiempo[1]
  },
  obtenerFecha (timestamp) {
    var fecha = timestamp.split('T')
    var separar = fecha[0].split('-')
    return separar[2] + '-' + separar[1] + '-' + separar[0]
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
  },
  nombreCompleto (obj) {
    return obj.nombre + ' ' + obj.apellido_paterno + ' ' + obj.apellido_materno
  }
}
