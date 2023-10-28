function buscarAsientosPorRubro() {
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

function buscarAsientosPorNroAsientos() {
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

function cargarAsiento() {
  var fechaInput = document.getElementById("fechaAsientoAñadir").value;

  let fecha = new Date(fechaInput);

  let dia = fecha.getDate() + 1;
  let mes = fecha.getMonth() + 1;
  let anio = fecha.getFullYear();

  let fechaFormateada = `${dia}/${mes}/${anio}`;

  let asientosData = {
    fechaRegistro: fechaFormateada,
    detallesDebe: [],
    detallesHaber: [],
  };

  let cuentaDebeInputs = document.querySelectorAll(".cuentaDebe");
  let valorDebeInputs = document.querySelectorAll(".valorDebe");

  for (let i = 0; i < cuentaDebeInputs.length; i++) {
    let descripcion = cuentaDebeInputs[i].value;
    let valor = valorDebeInputs[i].value;

    asientosData.detallesDebe.push({ descripcion, valor });
  }

  let cuentaHaberInputs = document.querySelectorAll(".cuentaHaber");
  let valorHaberInputs = document.querySelectorAll(".valorHaber");

  for (let i = 0; i < cuentaHaberInputs.length; i++) {
    let descripcion = cuentaHaberInputs[i].value;
    let valor = valorHaberInputs[i].value;

    asientosData.detallesHaber.push({ descripcion, valor });
  }


  fetch("http://localhost:8080/asientos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(asientosData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al obtener datos (${response.status}): ${response.statusText}`
        );
      }
      alert("Cargo joya");
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

function botonCerrar() {
  var iconoCerrar = document.getElementById("iconoCerrar");

  añadirAsientos.style.display = "none";
  consultarAsientos.style.display = "none";
}

function agregarInputsAsientoHaber() {
  let divCuentasHaber = document.getElementById("cuenta-cointainer-haber");

  let cuentaHaber = document.createElement("input");
  cuentaHaber.type = "text";
  cuentaHaber.placeholder = "Cuenta al haber"
  cuentaHaber.className = "cuentaHaber";
  cuentaHaber.style = "direction: rtl"

  divCuentasHaber.appendChild(cuentaHaber);

  let divValorHaber = document.getElementById("haber-valor-container");

  let valorHaber = document.createElement("input");
  valorHaber.type = "number";
  valorHaber.placeholder = "Valor del haber";
  valorHaber.className = "valorHaber";
  valorHaber.onchange = function () {
    agregarInputsAsiento();
  }

  divValorHaber.appendChild(valorHaber);
}

function agregarInputsAsientoDebe() {
  let divCuentasDebe = document.getElementById("cuenta-cointainer-debe");

  let cuentaDebe = document.createElement("input");
  cuentaDebe.type = "text";
  cuentaDebe.placeholder = "Cuenta al debe"
  cuentaDebe.className = "cuentaDebe";

  divCuentasDebe.appendChild(cuentaDebe);

  let divValorDebe = document.getElementById("debe-valor-container");

  let valorDebe = document.createElement("input");
  valorDebe.type = "number";
  valorDebe.placeholder = "Valor del debe";
  valorDebe.className = "valorDebe";

  divValorDebe.appendChild(valorDebe);
}

function agregarInputsAsientos() {
  agregarInputsAsientoDebe();
  agregarInputsAsientoHaber();
}

