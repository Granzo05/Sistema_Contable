let tabla = document.getElementById("tablaCuentas");

// Esta funcion carga la tabla al abrir la pagina o al cambiar de rubro
function buscarCuentasPorRubro() {
  const rubroSelect = document.getElementById("rubroBuscar");
  let rubro = rubroSelect.value;

  // Borra el contenido existente de la tabla
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }

  fetch("http://localhost:8080/cuenta/" + rubro, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener datos (${response.status}): ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((cuenta) => {
        cargarTabla(cuenta);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function buscarCuentasPorNroCuenta() {
  const nroCuenta = document.getElementById("numeroCuentaBuscar").value;

  if (nroCuenta != "") {
    while (tabla.firstChild) {
      tabla.removeChild(tabla.firstChild);
    }

    fetch("http://localhost:8080/cuenta/nro_cuenta/" + nroCuenta, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al obtener datos (${response.status}): ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((cuenta) => {
          cargarTabla(cuenta);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

}

function buscarCuentasPorDescripcion() {
  let descripcion = document.getElementById("descripcionBuscar").value;

  if (descripcion != "") {
    while (tabla.firstChild) {
      tabla.removeChild(tabla.firstChild);
    }

    fetch("http://localhost:8080/cuenta/descripcion/" + descripcion, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al obtener datos (${response.status}): ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((cuenta) => {
          cargarTabla(cuenta);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function AñadirCuenta() {
  var rubroSelect = document.getElementById("rubroAñadir");
  var rubro = rubroSelect.value;

  var numeroCuenta = document.getElementById("numeroCuentaAñadir").value;
  var descripcion = document.getElementById("descripcionAñadir").value;

  if (!numeroCuenta) {
    var mensaje = "El numero de cuenta es necesario para la carga";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!descripcion) {
    var mensaje = "La descripcion de la cuenta es necesaria para la carga";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (verificarRubroYNroCuenta(rubro, numeroCuenta)) {
  } else {
    let cuentaData = {
      rubro: rubro,
      nroCuenta: numeroCuenta,
      descripcion: descripcion,
    };

    fetch("http://localhost:8080/cuenta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuentaData),
    })
      .then((response) => {
        if (!response.ok) {
          var mensaje = "La descripcion o el numero de cuenta ya ha sido cargado";
          var titulo = "Cuenta repetida";
          abrirModal(mensaje, titulo);
        }
        limpiarCampos();
        var mensaje = "La cuenta ha sido añadida correctamente";
        var titulo = "Carga con exito";
        abrirModal(mensaje, titulo);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function verificarRubroYNroCuenta(rubro, numeroCuenta) {
  if (rubro === "ACTIVO" && numeroCuenta[0] != "1") {
    var mensaje = "El numero de cuenta del activo debe empezar con 1 obligatoriamente";
    var titulo = "Valor inicial erroneo";
    abrirModal(mensaje, titulo);
    return true;

  } else if (rubro === "PASIVO" && numeroCuenta[0] != "2") {
    var mensaje = "El numero de cuenta del pasivo debe empezar con 2 obligatoriamente";
    var titulo = "Valor inicial erroneo";
    abrirModal(mensaje, titulo);
    return true;

  } else if (rubro === "PN" && numeroCuenta[0] != "3") {
    var mensaje = "El numero de cuenta del patrimonio neto debe empezar con 3 obligatoriamente";
    var titulo = "Valor inicial erroneo";
    abrirModal(mensaje, titulo);
    return true;

  } else if (rubro === "INGRESO" && numeroCuenta[0] != "4") {
    var mensaje = "El numero de cuenta del ingreso debe empezar con 4 obligatoriamente";
    var titulo = "Valor inicial erroneo";
    abrirModal(mensaje, titulo);
    return true;

  } else if (rubro === "EGRESO" && numeroCuenta[0] != "5") {
    var mensaje = "El numero de cuenta del egreso debe empezar con 5 obligatoriamente";
    var titulo = "Valor inicial erroneo";
    abrirModal(mensaje, titulo);
    return true;
  }
  return false;
}

function actualizarCuenta() {
  var numeroCuenta = document.getElementById("numeroCuentaActualizar").value;
  var descripcion = document.getElementById("descripcionActualizar").value;
  var rubro = document.getElementById("rubroActualizar").value;

  if (!numeroCuenta) {
    var mensaje = "El numero de cuenta es necesario para la carga";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!descripcion) {
    var mensaje = "La descripcion de la cuenta es necesaria para la carga";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (verificarRubroYNroCuenta(rubro, numeroCuenta)) {
  } else {
    let data = {
      nroCuenta: numeroCuenta,
      descripcion: descripcion,
      rubro: rubro
    };
    fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          var mensaje = "Ha habido un error al intentar actualizar la cuenta";
          var titulo = "Error";
          abrirModal(mensaje, titulo);
        }
        limpiarCampos();
        var mensaje = "Cuenta actualizada con éxito";
        var titulo = "Actualizacion completada";
        abrirModal(mensaje, titulo);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocurrió un error al actualizar la cuenta. Por favor, inténtelo de nuevo más tarde.");
      });
  }
}

function eliminarCuenta() {
  var numeroCuenta = document.getElementById("numeroCuentaEliminar").value;

  if (!numeroCuenta) {
    var mensaje = "El numero de cuenta es necesaria para la eliminar la cuenta";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else {
    fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          var mensaje = "Ha ocurrido un error";
          var titulo = "Eliminacion fallida";
          abrirModal(mensaje, titulo);
        }
        limpiarCampos();
        var mensaje = "La cuenta ha sido eliminada correctamente";
        var titulo = "Eliminacion con exito";
        abrirModal(mensaje, titulo);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function cargarTabla(dato) {
  let tr = document.createElement("tr");
  let numeroCuenta = document.createElement("td");
  numeroCuenta.textContent = dato.nroCuenta;

  let descripcion = document.createElement("td");
  descripcion.textContent = dato.descripcion;

  tr.appendChild(numeroCuenta);
  tr.appendChild(descripcion);

  tabla.appendChild(tr);
}

let botonAñadirCuenta = document.getElementById("añadirCuenta");
let botonEliminarCuenta = document.getElementById("eliminarCuentaId");
let botonModificarCuenta = document.getElementById("modificarCuenta");
let botonConsultarCuenta = document.getElementById("consultarCuenta");

function botonAñadir() {
  if (botonAñadirCuenta.style.display === "none") {
    botonAñadirCuenta.style.display = "block";
    botonEliminarCuenta.style.display = "none";
    botonModificarCuenta.style.display = "none";
    botonConsultarCuenta.style.display = "none";
  } else {
    botonAñadirCuenta.style.display = "none";
  }
}

function botonEliminar() {
  if (botonEliminarCuenta.style.display === "none") {
    botonEliminarCuenta.style.display = "block";
    botonAñadirCuenta.style.display = "none";
    botonModificarCuenta.style.display = "none";
    botonConsultarCuenta.style.display = "none";
  } else {
    botonEliminarCuenta.style.display = "none";
  }
}

function botonModificar() {
  if (botonModificarCuenta.style.display === "none") {
    botonModificarCuenta.style.display = "block";
    botonEliminarCuenta.style.display = "none";
    botonAñadirCuenta.style.display = "none";
    botonConsultarCuenta.style.display = "none";
  } else {
    botonModificarCuenta.style.display = "none";
  }
}

function botonConsultar() {
  if (botonConsultarCuenta.style.display === "none") {
    botonConsultarCuenta.style.display = "block";
    botonEliminarCuenta.style.display = "none";
    botonModificarCuenta.style.display = "none";
    botonAñadirCuenta.style.display = "none";

    buscarCuentasPorRubro();
  } else {
    botonConsultarCuenta.style.display = "none";
  }
}

function botonCerrar() {
  var iconoCerrar = document.getElementsByClassName("iconoCerrar");

  botonAñadirCuenta.style.display = "none";
  botonConsultarCuenta.style.display = "none";
  botonEliminarCuenta.style.display = "none";
  botonModificarCuenta.style.display = "none";
}

function limpiarCampos() {
  var numeroCuenta = document.getElementById("numeroCuentaActualizar");
  var descripcion = document.getElementById("descripcionActualizar");
  var rubro = document.getElementById("rubroActualizar");

  numeroCuenta.value = "";
  descripcion.value = "";
  rubro.value = "ACTIVO";

  var numeroCuenta = document.getElementById("numeroCuentaAñadir");
  var descripcion = document.getElementById("descripcionAñadir");
  var rubro = document.getElementById("rubroAñadir");

  numeroCuenta.value = "";
  descripcion.value = "";
  rubro.value = "ACTIVO";

  var numeroCuenta = document.getElementById("numeroCuentaEliminar");

  numeroCuenta.value = "";

}

function abrirModal(mensaje, titulo) {
  let modal = document.getElementById("myModalCuentas");

  let tituloModal = modal.querySelector(".modalErrorH2");
  let mensajeModal = modal.querySelector(".modalErrorP");

  tituloModal.innerHTML = titulo;
  mensajeModal.innerHTML = mensaje;

  modal.style.display = "block";
}


function cerrarModal() {
  let modal = document.getElementById("myModalCuentas");
  modal.style = "display: none";

}