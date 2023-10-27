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

function AñadirAsientos() {
  var rubro = document.getElementById("rubroAñadir").value;
  var numeroAsientos = document.getElementById("numeroAsientosAñadir").value;
  var descripcion = document.getElementById("descripcionAñadir").value;

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

let añadirAsientos = document.getElementById("añadirAsiento");
let consultarAsientos = document.getElementById("consultarAsiento");

function botonAñadir() {
  if (añadirAsientos.style.display === "none") {
    añadirAsientos.style.display = "block";
    consultarAsientos.style.display = "none";
  } else {
    añadirAsientos.style.display = "none";
  }
}


function botonConsultar() {
  if (consultarAsientos.style.display === "none") {
    consultarAsientos.style.display = "block";
    añadirAsientos.style.display = "none";
  } else {
    consultarAsientos.style.display = "none";
  }
}

function botonCerrar(){
  var iconoCerrar = document.getElementById("iconoCerrar");
  
  añadirAsientos.style.display = "none";
  consultarAsientos.style.display = "none";
}

