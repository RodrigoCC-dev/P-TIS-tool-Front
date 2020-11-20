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
  }
}
