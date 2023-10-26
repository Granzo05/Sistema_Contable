function buscarAsientossPorRubro() {
  const rubro = document.getElementById("rubroBuscar").value;

  fetch("http://localhost:8080/asientos/rubro/" + rubro, {
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

function buscarAsientossPorNroAsientos() {
  const nroAsientos = document.getElementById("nroAsientosBuscar").value;

  fetch("http://localhost:8080/asientos/nro/" + nroAsientos, {
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

function agregarAsientos() {
  var rubro = document.getElementById("rubroAgregar").value;
  var numeroAsientos = document.getElementById("numeroAsientosAgregar").value;
  var descripcion = document.getElementById("descripcionAgregar").value;

  let AsientosData = {
    rubro: rubro,
    nroAsientos: numeroAsientos,
    descripcion: descripcion,
  };

  fetch("http://localhost:8080/asientos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(AsientosData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener datos (${response.status}): ${response.statusText}`
        );
      }
      var resultado = document.getElementById("resultadoAñadir");
      resultado.innerHTML = `
                <h2>Asientos agregada con éxito:</h2>
                <strong>Número de Asientos:</strong> ${numeroAsientos}<br>
                <strong>Rubro:</strong> ${rubro}<br>
                <strong>Descripción:</strong> ${descripcion}
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function actualizarAsientos() {
  var rubro = document.getElementById("rubroActualizar").value;
  var numeroAsientos = document.getElementById(
    "numeroAsientosActualizar"
  ).value;
  var descripcion = document.getElementById("descripcionActualizar").value;

  let datos = [];

  if (rubro != null) {
    datos.push(rubro);
  }

  if (numeroAsientos != null) {
    datos.push(numeroAsientos);
  }

  if (descripcion != null) {
    datos.push(descripcion);
  }

  fetch("http://localhost:8080/asientos/" + idAsiento + "/update", {
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
                <h2>Asientos actualizada con exito:</h2>
                <strong>Número de Asientos:</strong> ${numeroAsientos}<br>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function eliminarAsientos() {
  var numeroAsientos = document.getElementById("numeroAsientosEliminar").value;

  fetch("http://localhost:8080/asientos/" + idAsiento + "/delete", {
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
                <h2>Asientos eliminada con exito:</h2>
                <strong>Número de Asientos:</strong> ${numeroAsientos}<br>
            `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let botonAñadirAsientos = document.getElementById("añadirAsientos");
let botonEliminarAsientos = document.getElementById("eliminarAsientos");
let botonModificarAsientos = document.getElementById("modificarAsientos");
let botonConsultarAsientos = document.getElementById("consultarAsientos");

function botonAgregar() {
  if (botonAñadirAsientos.style.display === "none") {
    botonAñadirAsientos.style.display = "block";
    botonEliminarAsientos.style.display = "none";
    botonModificarAsientos.style.display = "none";
    botonConsultarAsientos.style.display = "none";
  } else {
    botonAñadirAsientos.style.display = "none";
  }
}

function botonEliminar() {
  if (botonEliminarAsientos.style.display === "none") {
    botonEliminarAsientos.style.display = "block";
    botonAñadirAsientos.style.display = "none";
    botonModificarAsientos.style.display = "none";
    botonConsultarAsientos.style.display = "none";
  } else {
    botonEliminarAsientos.style.display = "none";
  }
}

function botonModificar() {
  if (botonModificarAsientos.style.display === "none") {
    botonModificarAsientos.style.display = "block";
    botonEliminarAsientos.style.display = "none";
    botonAñadirAsientos.style.display = "none";
    botonConsultarAsientos.style.display = "none";
  } else {
    botonModificarAsientos.style.display = "none";
  }
}

function botonConsultar() {
  if (botonConsultarAsientos.style.display === "none") {
    botonConsultarAsientos.style.display = "block";
    botonEliminarAsientos.style.display = "none";
    botonModificarAsientos.style.display = "none";
    botonAñadirAsientos.style.display = "none";
  } else {
    botonConsultarAsientos.style.display = "none";
  }
}
