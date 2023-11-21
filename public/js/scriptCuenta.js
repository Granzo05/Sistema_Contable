let tabla = document.getElementById("tablaCuentas");

const mensajeErrorDescripcion = "La descripcion no debe estar vacía";
const mensajeErrorCuenta = "El número de cuenta es necesario para la busqueda";
const mensajeErrorBusqueda = "No se ha encontrado ningún resultado con los datos ingresados";
const mensajeErrorRepetido = "La cuenta ingresada ya existe";
const mensajeExito = "No hubo errores al procesar la tarea";
const tituloErrorVacio = "El campo está vacío";
const tituloErrorBusquedaNula = "Búsqueda sin resultados";
const tituloErrorRepetido = "Valor repetido";
const tituloExito = "Tarea exitosa";
const tituloInicialErroneo = "Valor inicial erroneo";

// Valores a verificar antes de la carga de una nueva cuenta
const valorInicialActivo = "1";
const valorInicialPasivo = "2";
const valorInicialPatrimonio = "3";
const valorInicialIngreso = "4";
const valorInicialEgreso = "5";

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
        abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
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

function buscarCuentaEliminar() {
  const nroCuenta = document.getElementById("numeroCuentaEliminar").value;

  const datalist = document.getElementById("opcionesCuentaEliminar");
  datalist.innerHTML = "";

  if (nroCuenta) {
    fetch("http://localhost:8080/asientos/cuenta/nro_cuenta/" + nroCuenta, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((cuenta) => {
          llenarDataList(cuenta, null, datalist);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

}

function buscarCuentaModificar() {
  const nroCuentaInput = document.getElementById("numeroCuentaModificar");
  const descripcionInput = document.getElementById("descripcionModificar");
  const datalist = document.getElementById("opcionesCuentaModificar");
  datalist.innerHTML = "";

  if (nroCuentaInput.value) {
    fetch("http://localhost:8080/asientos/cuenta/nro_cuenta/" + nroCuentaInput.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((cuenta) => {
          llenarDataList(cuenta, descripcionInput, datalist);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function llenarDataList(cuenta, descripcionInput = null, datalist) {
  let option = document.createElement("option");
  option.value = cuenta.nroCuenta;
  option.textContent = cuenta.nroCuenta + " - " + cuenta.descripcion + " - " + cuenta.rubro;

  if (descripcionInput) {
    descripcionInput.value = cuenta.descripcion;
    descripcionInput.textContent = cuenta.descripcion;
  }

  datalist.appendChild(option);
}

function buscarCuentasPorNroCuenta() {
  const nroCuenta = document.getElementById("numeroCuentaBuscar").value;

  if (nroCuenta) {
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
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
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

  if (descripcion) {
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
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
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
    abrirModalError(mensajeErrorCuenta, tituloErrorVacio);
  } else if (!descripcion) {
    abrirModalError(mensajeErrorDescripcion, tituloErrorVacio);
  } else if (verificarRubroYNroCuenta(rubro, numeroCuenta)) {
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
        if (response.status === 400) {
          abrirModalError(mensajeErrorRepetido, tituloErrorRepetido);
        } else if (response.status === 200) {
          limpiarCampos();
          abrirModalExito(mensajeExito, tituloExito);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function actualizarCuenta() {
  var numeroCuenta = document.getElementById("numeroCuentaModificar").value;
  var descripcion = document.getElementById("descripcionModificar").value;
  var rubro = document.getElementById("rubroModificar").value;
  if (!numeroCuenta) {
    abrirModalError(mensajeErrorCuenta, tituloErrorVacio);
  } else if (!descripcion) {
    abrirModalError(mensajeErrorDescripcion, tituloErrorVacio);
  } else if (verificarRubroYNroCuenta(rubro, numeroCuenta)) {
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
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
        } else {
          limpiarCampos();
          abrirModalExito(mensajeExito, tituloExito);
        }
      })
      .catch(() => {
        abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
      });
  }
}

function eliminarCuenta() {
  var numeroCuenta = document.getElementById("numeroCuentaEliminar").value;

  if (!numeroCuenta) {
    abrirModalError(mensajeErrorCuenta, tituloErrorVacio);
  } else {
    fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
        } else {
          limpiarCampos();
          abrirModalExito(mensajeExito, tituloExito);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

// Cada cuenta debe comenzar con un valor específico, por lo tanto al intentar añadir una cuenta se debe verificar
function verificarRubroYNroCuenta(rubro, numeroCuenta) {
  if (rubro === "ACTIVO" && numeroCuenta[0] != valorInicialActivo) {
    var mensaje = "El numero de cuenta del activo debe empezar con 1 obligatoriamente";
    abrirModalError(mensaje, tituloInicialErroneo);
    return false;
  } else if (rubro === "PASIVO" && numeroCuenta[0] != valorInicialPasivo) {
    var mensaje = "El numero de cuenta del pasivo debe empezar con 2 obligatoriamente";
    abrirModalError(mensaje, tituloInicialErroneo);
    return false;
  } else if (rubro === "PN" && numeroCuenta[0] != valorInicialPatrimonio) {
    var mensaje = "El numero de cuenta del patrimonio neto debe empezar con 3 obligatoriamente";
    abrirModalError(mensaje, tituloInicialErroneo);
    return false;
  } else if (rubro === "INGRESO" && numeroCuenta[0] != valorInicialIngreso) {
    var mensaje = "El numero de cuenta del ingreso debe empezar con 4 obligatoriamente";
    abrirModalError(mensaje, tituloInicialErroneo);
    return false;
  } else if (rubro === "EGRESO" && numeroCuenta[0] != valorInicialEgreso) {
    var mensaje = "El numero de cuenta del egreso debe empezar con 5 obligatoriamente";
    abrirModalError(mensaje, tituloInicialErroneo);
    return false;
  } else {
    return true;
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

function limpiarCampos() {
  limpiarCamposPorId("numeroCuentaAñadir");
  limpiarCamposPorId("descripcionAñadir");
  limpiarCamposPorId("numeroCuentaEliminar");
  limpiarCamposPorId("numeroCuentaModificar");
  limpiarCamposPorId("descripcionModificar");
  var rubro = document.getElementById("rubroModificar");
  rubro.value = "ACTIVO";
}

// Navegabilidad
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
  } else {
    botonConsultarCuenta.style.display = "none";
  }
}