function buscarMayor() {
  const descripcion = document.getElementById("descripcionBuscar").value;

  fetch("http://localhost:8080/mayor/" + descripcion, {
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

function cargarSelectPorRubro() {
  const rubro = document.getElementById("rubro").value;

  fetch("http://localhost:8080/mayor/" + rubro, {
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
      // Hacer un buscador dinamico que diga que descripciones hay parecidas al texto dependiendo del rubro
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

