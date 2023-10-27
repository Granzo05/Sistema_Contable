function buscarCuentasPorRubro() {
  const rubroSelect = document.getElementById("rubroBuscar");
  let rubro = rubroSelect.value;
  let tabla = document.getElementById("tablaCuentas");

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
        let tr = document.createElement("tr");
        let numeroCuenta = document.createElement("td");
        numeroCuenta.textContent = cuenta.nroCuenta;

        let descripcion = document.createElement("td");
        descripcion.textContent = cuenta.descripcion;

        tr.appendChild(numeroCuenta);
        tr.appendChild(descripcion);

        tabla.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



function buscarCuentasPorNroCuenta() {
  const nroCuenta = document.getElementById("nroCuentaBuscar").value;

  fetch("http://localhost:8080/cuenta/nro/" + nroCuenta, {
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
    })
    .then((data) => {
      // Hacer una table o algo con los datos
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function AñadirCuenta() {
  var rubroSelect = document.getElementById("rubroAñadir");
  var rubro = rubroSelect.value;

  var numeroCuenta = document.getElementById("numeroCuentaAñadir").value;
  var descripcion = document.getElementById("descripcionAñadir").value;

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
        throw new Error(
          `Error al obtener datos (${response.status}): ${response.statusText}`
        );
      }
      var resultado = document.getElementById("resultadoAñadir");
      resultado.innerHTML = `
                <h2>Cuenta agregada con éxito:</h2>
                <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
                <strong>Rubro:</strong> ${rubro}<br>
                <strong>Descripción:</strong> ${descripcion}
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function actualizarCuenta() {
  var numeroCuenta = document.getElementById("numeroCuentaActualizar").value;
  var descripcion = document.getElementById("descripcionActualizar").value;
  var rubro = document.getElementById("rubroActualizar").value;

  if (!numeroCuenta) {
    alert("Por favor, ingrese un número de cuenta válido.");
    return;
  }

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
        throw new Error(
          `Error al actualizar la cuenta (${response.status}): ${response.statusText}`
        );
      } else {
        alert("Joyaaaaaaa");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al actualizar la cuenta. Por favor, inténtelo de nuevo más tarde.");
    });
}


function eliminarCuenta() {
  var numeroCuenta = document.getElementById("numeroCuentaEliminar").value;

  fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/delete", {
    method: "DELETE",
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
      var resultado = document.getElementById("resultadoEliminar");
      resultado.innerHTML = `
                <h2>Cuenta eliminada con exito:</h2>
                <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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

function botonCerrar(){
  var iconoCerrar = document.getElementById("iconoCerrar");
  
  añadirCuenta.style.display = "none";
  consultarCuenta.style.display = "none";
  eliminarCuentaId.style.display = "none";
  modificarCuenta.style.display = "none";
}
