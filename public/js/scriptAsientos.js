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

  /*
  if (!nroCuenta) {
    var mensaje = "El numero de cuenta es necesario para la carga";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (fechaFinalControlada[0] === "NaN" || fechaFinalControlada[1] === "NaN" || fechaFinalControlada[2] === "NaN") {
    var mensaje = "La fecha del asiento es necesaria para la busqueda";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else 
  */
  if (!nroAsientos) {
    var mensaje = "El numero de asiento es necesario para la carga";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else {
    fetch("http://localhost:8080/asientos/" + nroAsientos, {
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
      .then((data) => {
        console.log(data);
        let divResultado = document.getElementById("resultadoBuscar");

        let divDebe = document.createElement("div");
        divDebe.className = "debeResultado";

        data.detallesDebe.forEach(detalle => {
          let spanCuenta = document.createElement("span");
          spanCuenta.textContent = detalle.cuenta.descripcion;

          let spanValor = document.createElement("span");
          spanValor.textContent = detalle.valor;

          divDebe.appendChild(spanCuenta);
          divDebe.appendChild(spanValor);
          divDebe.appendChild(document.createAttribute("br"));
        });

        let divHaber = document.createElement("div");
        divHaber.className = "haberResultado";

        data.detallesHaber.forEach(detalle => {
          let spanCuenta = document.createElement("span");
          spanCuenta.textContent = detalle.cuenta.descripcion;

          let spanValor = document.createElement("span");
          spanValor.textContent = detalle.valor;

          divHaber.appendChild(spanCuenta);
          divHaber.appendChild(spanValor);
          divHaber.appendChild(document.createAttribute("br"));
        });

        divResultado.appendChild(divDebe);
        divResultado.appendChild(divHaber);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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
  buscarCuentasPorRubro();
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

function buscarCuentasPorRubro() {
  const rubroSelect = document.getElementById("rubroAsientos");
  let rubro = rubroSelect.value;
  const tabla = document.getElementById("tablaDeCuentasAsientos");

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
  const nroCuenta = document.getElementById("numeroCuentaBuscar").value;
  const tabla = document.getElementById("tablaDeCuentasAsientos");

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

}
