function limpiarCamposPorId(id) {
    var input = document.getElementById(id);
    if (input) {
      input.value = "";
    }
  }
  
  function limpiarCamposPorClase(clase) {
    var elementos = document.querySelectorAll(clase);
    elementos.forEach(elemento => {
      elemento.value = "";
    });
  }