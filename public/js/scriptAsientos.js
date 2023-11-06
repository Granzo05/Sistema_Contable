function buscarAsiento() {
  const nroAsientos = document.getElementById("numeroAsientoBuscar").value;
  const fechaInput = document.getElementById("fechaAsientoBuscar").value;
  const nroCuenta = document.getElementById("numeroCuentaBuscar").value;

  let fecha = new Date(fechaInput);
  let dia = fecha.getDate() + 1;
  let mes = fecha.getMonth() + 1;
  let anio = fecha.getFullYear();

  let fechaFormateada = `${dia}/${mes}/${anio}`;
  let fechaFinalControlada = fechaFormateada.split("/");


  if ((nroCuenta && (fechaFinalControlada[0] != "NaN" || fechaFinalControlada[1] != "NaN" || fechaFinalControlada[2] != "NaN")) && !nroAsientos) {
    busquedaPorCuentaYfecha(nroCuenta, fechaFinalControlada);
  } else if (!nroAsientos && (!nroCuenta && (fechaFinalControlada[0] === "NaN" || fechaFinalControlada[1] === "NaN" || fechaFinalControlada[2] === "NaN"))) {
    var mensaje = "El numero de asiento es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (nroAsientos) {
    busquedaPorAsiento(nroAsientos);
  }
}

function crearModalAsiento(detalles) {
  let divResultado = document.getElementById("myModalAsientoResultado");
  let divModal = document.getElementById("modal-asiento");
  // Reiniciamos el modal por si ya habia un asiento precargado no mostrarlo nuevamente
  divModal.innerHTML = "";

  let fecha = document.createElement("p");
  detalles.forEach(detalle => {
    fecha.textContent = "Fecha: " + detalle.asiento.fechaRegistro;
  });
  divModal.appendChild(fecha);

  let nroAsiento = document.createElement("p");
  detalles.forEach(detalle => {
    nroAsiento.textContent = "Numero de asiento: " + detalle.asiento.id;
  });
  divModal.appendChild(nroAsiento);

  let table = document.createElement("table");
  table.classList.add("modal-table");

  // Encabezado de la tabla
  let encabezados = document.createElement("tr");

  let encabezadoCuenta = document.createElement("th");
  encabezadoCuenta.textContent = "CUENTA";

  let encabezadoDebe = document.createElement("th");
  encabezadoDebe.textContent = "DEBE";

  let encabezadoHaber = document.createElement("th");
  encabezadoHaber.textContent = "HABER";

  encabezados.appendChild(encabezadoCuenta);
  encabezados.appendChild(encabezadoDebe);
  encabezados.appendChild(encabezadoHaber);

  table.appendChild(encabezados);

  detalles.forEach(detalle => {
    let fila = document.createElement("tr");

    let cuenta = document.createElement("td");
    cuenta.textContent = detalle.cuenta.descripcion;
    fila.appendChild(cuenta);

    // DEBE o HABER
    let debeValor = document.createElement("td");
    let haberValor = document.createElement("td");

    if (detalle.tipo === "DEBE") {
      debeValor.textContent = detalle.valor;
    } else if (detalle.tipo === "HABER") {
      haberValor.textContent = detalle.valor;
    }

    fila.appendChild(debeValor);
    fila.appendChild(haberValor);

    table.appendChild(fila);
  });

  divModal.appendChild(table);

  let buttonCerrar = document.createElement("button");
  buttonCerrar.textContent = "Listo";
  buttonCerrar.onclick = function () {
    cerrarModalResultado();
  }
  divModal.appendChild(buttonCerrar);

  divResultado.style.display = "block";
}


function busquedaPorCuentaYfecha(nroCuenta, fecha) {
  const data = { nroCuenta: nroCuenta, fecha: fechaFinalControlada.replace("/", "-") };
  const queryString = new URLSearchParams(data).toString();
  fetch(`http://localhost:8080/asientos/busqueda/?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      var mensaje = "No se ha encontrado ningun asiento con esos datos";
      var titulo = "Asiento no existente";
      abrirModalError(mensaje, titulo);
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
      var mensaje = "No se ha encontrado ningun asiento con esos datos";
      var titulo = "Asiento no existente";
      abrirModalError(mensaje, titulo);
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

  var sumaValorDebe = parseFloat(0);
  var sumaValorHaber = parseFloat(0);

  let cuentaDebeInputs = document.querySelectorAll(".cuentaDebe");
  let valorDebeInputs = document.querySelectorAll(".valorDebe");

  for (let i = 0; i < cuentaDebeInputs.length; i++) {
    let descripcion = cuentaDebeInputs[i].value;
    let valor = valorDebeInputs[i].value;
    if (parseFloat(valor) < 0) {
      var mensaje = "El valor de la cuenta " + descripcion + " no puede ser negativo";
      var titulo = "Valor erroneo";
      abrirModalError(mensaje, titulo);
      break;
    }
    sumaValorDebe = parseFloat(valor);
    asientosData.detallesDebe.push({ descripcion, valor });
  }

  let cuentaHaberInputs = document.querySelectorAll(".cuentaHaber");
  let valorHaberInputs = document.querySelectorAll(".valorHaber");

  for (let i = 0; i < cuentaHaberInputs.length; i++) {
    let descripcion = cuentaHaberInputs[i].value;
    let valor = valorHaberInputs[i].value;
    if (parseFloat(valor) < 0) {
      var mensaje = "El valor de la cuenta " + descripcion + " no puede ser negativo";
      var titulo = "Valor erroneo";
      abrirModalError(mensaje, titulo);
      break;
    }
    sumaValorHaber = parseFloat(valor);
    asientosData.detallesHaber.push({ descripcion, valor });
  }

  let fechaFinalControlada = fechaFormateada.split("/");

  if (fechaFinalControlada[0] === "NaN" || fechaFinalControlada[1] === "NaN" || fechaFinalControlada[2] === "NaN") {
    var mensaje = "La fecha del asiento es necesaria para la busqueda";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (!valorHaberInputs) {
    var mensaje = "La cuenta del haber debe tener valor";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (!cuentaHaberInputs) {
    var mensaje = "Debe haber una cuenta hacia el haber";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (!cuentaDebeInputs) {
    var mensaje = "Debe haber una cuenta hacia el haber";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (!valorDebeInputs) {
    var mensaje = "La cuenta del debe debe tener valor";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (sumaValorDebe != sumaValorHaber) {
    var mensaje = "Ambas cuentas deben cancelarse, los valores ingresados son incorrectos o falta una cuenta";
    var titulo = "Partida doble erronea";
    abrirModalError(mensaje, titulo);
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
          var mensaje = "Las cuentas ingresadas no son correctas";
          var titulo = "Error al cargar asiento";
          abrirModalError(mensaje, titulo);
        } else {
          limpiarCampos();
          var mensaje = "Carga con exito";
          var titulo = "Asiento cargado satisfactoriamente";
          abrirModalExito(mensaje, titulo);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function buscarCuentasPorNroCuenta() {
  const nroCuenta = document.getElementById("numeroCuentaBuscarAsiento").value;

  const datalist = document.getElementById("opcionesCuentas");
  datalist.innerHTML = "";

  if (nroCuenta != null || nroCuenta != "") {
    fetch("http://localhost:8080/asientos/cuenta/nro_cuenta/" + nroCuenta, {
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

function limpiarCampos() {
  var fechaInput = document.getElementById("fechaAsientoAñadir");

  let cuentaDebeInputs = document.querySelectorAll(".cuentaDebe");
  let valorDebeInputs = document.querySelectorAll(".valorDebe");
  let cuentaHaberInputs = document.querySelectorAll(".cuentaHaber");
  let valorHaberInputs = document.querySelectorAll(".valorHaber");

  fechaInput.value = "";

  cuentaDebeInputs.forEach(element => {
    element.value = "";
  });

  valorDebeInputs.forEach(element => {
    element.value = "";
  });

  cuentaHaberInputs.forEach(element => {
    element.value = "";
  });

  valorHaberInputs.forEach(element => {
    element.value = "";
  });
}

function reiniciarAsiento() {
  document.getElementById('añadirAsiento').style.display = 'block';
  location.reload();
}

function abrirModalExito(mensaje, titulo) {
  let modal = document.getElementById("myModalAsientosExito");

  let tituloModal = modal.querySelector(".modalTitulo");
  let mensajeModal = modal.querySelector(".modalMensaje");

  tituloModal.innerHTML = titulo;
  mensajeModal.innerHTML = mensaje;

  modal.style.display = "block";
}


function cerrarModalExito() {
  let modal = document.getElementById("myModalAsientosExito");
  modal.style = "display: none";
}

function abrirModalError(mensaje, titulo) {
  let modal = document.getElementById("myModalAsientosError");

  let tituloModal = modal.querySelector(".modalTitulo");
  let mensajeModal = modal.querySelector(".modalMensaje");

  tituloModal.innerHTML = titulo;
  mensajeModal.innerHTML = mensaje;

  modal.style.display = "block";
}

function cerrarModalError() {
  let modal = document.getElementById("myModalAsientosError");
  modal.style = "display: none";
}

function cerrarModalResultado() {
  let modal = document.getElementById("myModalAsientoResultado");
  modal.style = "display: none";
}