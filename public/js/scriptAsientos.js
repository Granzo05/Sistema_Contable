const mensajeErrorFecha = "La fecha completa es necesaria para la busqueda";
const mensajeErrorAsiento = "El número de asiento es necesario para la busqueda";
const mensajeErrorCuenta = "El número de cuenta es necesario para la busqueda";
const mensajeErrorBusqueda = "No se ha encontrado ningún resultado con los datos ingresados";
const mensajeErrorCuentaDebe = "Campo de cuenta del debe vacío";
const mensajeErrorCuentaHaber = "Campo de cuenta del haber vacío";
const mensajeErrorValorDebe = "Campo de valor del debe vacío o negativo";
const mensajeErrorValorHaber = "Campo de valor del haber vacío o negativo";
const mensajeErrorSumaValores = "Los valores del debe y el haber deben ser iguales";
const mensajeExito = "No hubo errores al procesar la tarea";
const tituloErrorBalance = "Cuenta doble errónea";
const tituloErrorVacio = "El campo está vacío";
const tituloErrorBusquedaNula = "Búsqueda sin resultados";
const tituloExito = "Tarea exitosa";

function buscarAsiento() {
  const nroAsientos = document.getElementById("numeroAsientoBuscar").value;
  const fechaInput = document.getElementById("fechaAsientoBuscar").value;
  const nroCuenta = document.getElementById("numeroCuentaBuscarAsiento").value;

  let fecha = new Date(fechaInput);
  let dia = fecha.getDate() + 1;
  let mes = fecha.getMonth() + 1;
  let anio = fecha.getFullYear();

  let fechaFormateada = `${anio}/${mes}/${dia}`;
  let fechaFinalControlada = fechaFormateada.split("/");

  // Comprobamos si se busca por número de cuenta o por fecha y número de asiento, es decir si nroAsiento posee texto y tanto la fecha como el nroCuenta estan vacíos se busca por uno
  // o por otro. Al buscar por número de cuenta y fecha se pueden ver todos los asientos de ese día que involucren esa cuenta en específico, dando el asientoId con el cual
  // se puede buscar como nroAsiento y ver todas las cuentas que involucran ese asiento. Con fecha y cuenta se busca solo esa cuenta, con asiento id todas las cuentas de un asiento.
  if ((nroCuenta && (fechaFinalControlada[0] != "NaN" || fechaFinalControlada[1] != "NaN" || fechaFinalControlada[2] != "NaN")) && !nroAsientos) {
    busquedaPorCuentaYfecha(nroCuenta, fechaFinalControlada);
  } else if (!nroAsientos && (!nroCuenta && (fechaFinalControlada[0] === "NaN" || fechaFinalControlada[1] === "NaN" || fechaFinalControlada[2] === "NaN"))) {
    abrirModalError(mensajeErrorAsiento, tituloErrorVacio);
  } else if (nroAsientos && (!nroCuenta && (fechaFinalControlada[0] === "NaN" || fechaFinalControlada[1] === "NaN" || fechaFinalControlada[2] === "NaN"))) {
    busquedaPorAsiento(nroAsientos);
  }
}

function busquedaPorCuentaYfecha(nroCuenta, fecha) {
  // Parseo la fecha para almacenarla como dd-mm-yyyy
  var fechaFinal = fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  const data = { nroCuenta: nroCuenta, fecha: fechaFinal };
  const queryString = new URLSearchParams(data).toString();
  fetch(`http://localhost:8080/asientos/busqueda/?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
    }
    return response.json();
  })
    .then((detalles) => {
      crearModalAsiento(detalles);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function busquedaPorAsiento(nroAsiento) {
  fetch(`http://localhost:8080/asientos/nroAsiento/` + nroAsiento, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
    }
    return response.json();
  })
    .then((detalles) => {
      crearModalAsiento(detalles);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function cargarAsiento() {
  const fechaInput = document.getElementById("fechaAsientoAñadir").value;

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

  let sumaValorDebe = 0;
  let sumaValorHaber = 0;

  // Obtener los valores de las cuentas de debe
  let cuentaDebeInputs = document.querySelectorAll(".cuentaDebe");
  let valorDebeInputs = document.querySelectorAll(".valorDebe");

  for (let i = 0; i < cuentaDebeInputs.length; i++) {
    let nroCuenta = cuentaDebeInputs[i].value;
    let valor = parseFloat(valorDebeInputs[i].value);

    if (isNaN(valor) || valor < 0) {
      abrirModalError(mensajeErrorValorDebe, tituloErrorVacio);
      break;
    }
    // Sumamos para ver si ambas cuentas coinciden en valor al final
    sumaValorDebe += valor;
    asientosData.detallesDebe.push({ nroCuenta, valor });
  }

  // Obtener los valores de las cuentas de haber
  let cuentaHaberInputs = document.querySelectorAll(".cuentaHaber");
  let valorHaberInputs = document.querySelectorAll(".valorHaber");

  for (let i = 0; i < cuentaHaberInputs.length; i++) {
    let nroCuenta = cuentaHaberInputs[i].value;
    let valor = parseFloat(valorHaberInputs[i].value);

    if (isNaN(valor) || valor < 0) {
      abrirModalError(mensajeErrorValorHaber, tituloErrorVacio);
      break;
    }

    sumaValorHaber += valor;
    asientosData.detallesHaber.push({ nroCuenta, valor });
  }

  // Verificar que las sumas sean iguales
  if (sumaValorDebe === sumaValorHaber) {
    let fechaFinalControlada = fechaFormateada.split("/");

    if (fechaFinalControlada[0] === "NaN" || fechaFinalControlada[1] === "NaN" || fechaFinalControlada[2] === "NaN") {
      // Fecha incorrecta
      abrirModalError(mensajeErrorFecha, tituloErrorVacio);
    } else if (!valorHaberInputs) {
      // Valores vacios o negativos
      abrirModalError(mensajeErrorValorHaber, tituloErrorVacio);
    } else if (!cuentaHaberInputs) {
      // Cuentas vacías
      abrirModalError(mensajeErrorCuentaHaber, tituloErrorVacio);
    } else if (!cuentaDebeInputs) {
      abrirModalError(mensajeErrorCuentaDebe, tituloErrorVacio);
    } else if (!valorDebeInputs) {
      abrirModalError(mensajeErrorValorDebe, tituloErrorVacio);
    } else {
      fetch("http://localhost:8080/asientos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(asientosData),
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
  } else {
    // Valores entre debe y haber no coinciden
    abrirModalError(mensajeErrorSumaValores, tituloErrorBalance);
  }
}

function buscarCuentasPorNroCuenta() {
  const nroCuenta = document.getElementById("numeroCuentaBuscarAsiento").value;

  const datalist = document.getElementById("opcionesCuentas");
  datalist.innerHTML = "";

  if (nroCuenta) {
    buscarPorNroCuenta(nroCuenta, datalist);
  }
}

function buscarCuentasPorNroCuentaDebe() {
  const elementosCuentaDebe = document.getElementsByClassName("cuentaDebe");

  for (let i = 0; i < elementosCuentaDebe.length; i++) {
    const nroCuenta = elementosCuentaDebe[i].value;
    const datalist = document.getElementById("opcionesCuentasDebe");
    datalist.innerHTML = "";

    if (nroCuenta) {
      buscarPorNroCuenta(nroCuenta, datalist);
    }
  }
}

function buscarCuentasPorNroCuentaHaber() {
  const elementosCuentaDebe = document.getElementsByClassName("cuentaHaber");
  for (let i = 0; i < elementosCuentaDebe.length; i++) {
    const nroCuenta = elementosCuentaDebe[i].value;
    const datalist = document.getElementById("opcionesCuentasHaber");
    datalist.innerHTML = "";

    if (nroCuenta) {
      buscarPorNroCuenta(nroCuenta, datalist);
    }
  }
}

// Esta función se encarga de ir buscando y rellenando los inputs con la cuenta buscada utilizando un LIKE y trayendo todas las cuentas similares
function buscarPorNroCuenta(nroCuenta, datalist) {
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
        let option = document.createElement("option");
        option.value = cuenta.nroCuenta;
        option.textContent = cuenta.nroCuenta + " - " + cuenta.descripcion + " - " + cuenta.rubro;

        datalist.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function agregarInputsAsientoHaber() {
  let divCuentasHaber = document.getElementById("cuenta-cointainer-haber");

  let cuentaHaber = document.createElement("input");
  cuentaHaber.type = "text";
  cuentaHaber.placeholder = "Cuenta del haber";
  cuentaHaber.className = "cuentaHaber";
  cuentaHaber.style.direction = "rtl";
  cuentaHaber.oninput = function () {
    buscarCuentasPorNroCuentaHaber();
  }
  cuentaHaber.setAttribute("list", "opcionesCuentasHaber");


  divCuentasHaber.appendChild(cuentaHaber);

  let divValorHaber = document.getElementById("haber-valor-container");

  let valorHaber = document.createElement("input");
  valorHaber.type = "number";
  valorHaber.placeholder = "Valor del haber";
  valorHaber.className = "valorHaber";

  divValorHaber.appendChild(valorHaber);
}

function agregarInputsAsientoDebe() {
  let divCuentasDebe = document.getElementById("cuenta-cointainer-debe");

  let cuentaDebe = document.createElement("input");
  cuentaDebe.type = "text";
  cuentaDebe.placeholder = "Cuenta del debe";
  cuentaDebe.className = "cuentaDebe";
  cuentaDebe.setAttribute("list", "opcionesCuentasDebe");
  cuentaDebe.oninput = function () {
    buscarCuentasPorNroCuentaDebe();
  }

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

// Vaciado de campos
function limpiarCampos() {
  limpiarCamposPorId("fechaAsientoAñadir");
  limpiarCamposPorClase(".cuentaDebe");
  limpiarCamposPorClase(".valorDebe");
  limpiarCamposPorClase(".cuentaHaber");
  limpiarCamposPorClase(".valorHaber");

  limpiarCamposPorId("fechaAsientoBuscar");
  limpiarCamposPorId("numeroCuentaBuscarAsiento");
  limpiarCamposPorId("numeroAsientoBuscar");
}

function reiniciarAsiento() {
  document.getElementById('añadirAsiento').style.display = 'block';
  location.reload();
}

// Navegabilidad
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