function buscarCuentasPorRubro() {
  const rubro = document.getElementById("rubroBuscar").value;

  fetch("http://localhost:8080/cuenta/rubro/" + rubro, {
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

function agregarCuenta() {
  var rubro = document.getElementById("rubroAgregar").value;
  var numeroCuenta = document.getElementById("numeroCuentaAgregar").value;
  var descripcion = document.getElementById("descripcionAgregar").value;

  let cuentaData = {
    rubro: rubro,
    nroCuenta: numeroCuenta,
    descripcion: descripcion,
  };

  fetch("http://localhost:8080/cuenta", {
    method: "GET",
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
  var rubro = document.getElementById("rubroActualizar").value;
  var numeroCuenta = document.getElementById("numeroCuentaActualizar").value;
  var descripcion = document.getElementById("descripcionActualizar").value;

  let datos = [];

  if (rubro != null) {
    datos.push(rubro);
  }

  if (numeroCuenta != null) {
    datos.push(numeroCuenta);
  }

  if (descripcion != null) {
    datos.push(descripcion);
  }

  fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener datos (${response.status}): ${response.statusText}`
        );
      }
      var resultado = document.getElementById("resultadoActualizar");
      resultado.innerHTML = `
                <h2>Cuenta actualizada con exito:</h2>
                <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
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
let botonEliminarCuenta = document.getElementById("eliminarCuenta");
let botonModificarCuenta = document.getElementById("modificarCuenta");
let botonConsultarCuenta = document.getElementById("consultarCuenta");

function botonAgregar() {
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
