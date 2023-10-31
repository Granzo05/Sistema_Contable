function buscarAsiento() {
  const nroAsientos = document.getElementById("nroAsientosBuscar").value;
  const fecha = document.getElementById("fechaAsientoBuscar").value;
  const nroCuenta = document.getElementById("numeroCuentaBuscar").value;

  if (!nroCuenta) {
    var mensaje = "El numero de cuenta es necesario para la carga";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!fecha) {
    var mensaje = "La fecha del asiento es necesaria para la busqueda";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!nroAsientos) {
    var mensaje = "El numero de asiento es necesario para la carga";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else {
    fetch("http://localhost:8080/asientos/" + nroAsientos + "/" + fecha + "/" + nroCuenta, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          var mensaje = "No se ha encontrado ningun asiento con esos datos";
          var titulo = "Asiento no existente";
          abrirModal(mensaje, titulo);
        }
        return response.json();
      })
      .then((data) => {
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
      abrirModal(mensaje, titulo);
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
      abrirModal(mensaje, titulo);
      break;
    }
    sumaValorHaber = parseFloat(valor);
    asientosData.detallesHaber.push({ descripcion, valor });
  }

  if (!fechaFormateada) {
    var mensaje = "La fecha del asiento es necesaria para la busqueda";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!valorHaberInputs) {
    var mensaje = "La cuenta del haber debe tener valor";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!cuentaHaberInputs) {
    var mensaje = "Debe haber una cuenta hacia el haber";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!cuentaDebeInputs) {
    var mensaje = "Debe haber una cuenta hacia el haber";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!valorDebeInputs) {
    var mensaje = "La cuenta del debe debe tener valor";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (sumaValorDebe != sumaValorHaber) {
    var mensaje = "Ambas cuentas deben cancelarse, los valores ingresados son incorrectos o falta una cuenta";
    var titulo = "Partida doble erronea";
    abrirModal(mensaje, titulo);
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
          throw new Error(
            `Error al obtener datos (${response.status}): ${response.statusText}`
          );
        }
        limpiarCampos();
        return response.json();
      })
      .then((data) => {
        var mensaje = "Carga con exito";
        var titulo = "Asiento cargado con nº asiento: " + data.nroAsiento;
        abrirModal(mensaje, titulo);
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

function abrirModal(mensaje, titulo) {
  let modal = document.getElementById("myModalAsientos");

  let tituloModal = modal.querySelector(".modalErrorH2");
  let mensajeModal = modal.querySelector(".modalErrorP");

  tituloModal.innerHTML = titulo;
  mensajeModal.innerHTML = mensaje;

  modal.style.display = "block";
}


function cerrarModal() {
  let modal = document.getElementById("myModalCuentas");
  modal.style = "display: none";

}

