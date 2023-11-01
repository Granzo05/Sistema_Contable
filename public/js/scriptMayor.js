function buscarMayor() {
  const numeroCuenta = document.getElementById("numeroCuenta").value;
  const mes = document.getElementById("mes").value;
  const año = document.getElementById("año").value;

  if (!numeroCuenta) {
    var mensaje = "El numero de cuenta es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (!mes) {
    var mensaje = "El mes del mayor es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else if (!año) {
    var mensaje = "El año del mayor es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModalError(mensaje, titulo);
  } else {
    fetch("http://localhost:8080/mayor/" + numeroCuenta + "/" + mes + "/" + año, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          var mensaje = "La cuenta buscada no tiene un mayor registrado en esa fecha";
          var titulo = "Mayor no existente";
          abrirModalError(mensaje, titulo);
        }
        return response.json();
      })
      .then((data) => {
        abrirModalResultado(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function abrirModalExito(mensaje, titulo) {
  let modal = document.getElementById("myModalayorExito");

  let tituloModal = modal.querySelector(".modalTitulo");
  let mensajeModal = modal.querySelector(".modalMensaje");

  tituloModal.innerHTML = titulo;
  mensajeModal.innerHTML = mensaje;

  modal.style.display = "block";
}

function cerrarModalExito() {
  let modal = document.getElementById("myModalayorExito");
  modal.style = "display: none";
}

function abrirModalError(mensaje, titulo) {
  let modal = document.getElementById("myModalMayorError");

  let tituloModal = modal.querySelector(".modalTitulo");
  let mensajeModal = modal.querySelector(".modalMensaje");

  tituloModal.innerHTML = titulo;
  mensajeModal.innerHTML = mensaje;

  modal.style.display = "block";
}

function cerrarModalError() {
  let modal = document.getElementById("myModalMayorError");
  modal.style = "display: none";
}

function cerrarModalResultado() {
  let modal = document.getElementById("myModalMayorResultado");
  modal.style = "display: none";
}

function abrirModalResultado(data) {
  let descripcion = document.getElementById("modalDescripcion");
  descripcion.textContent = data.cuenta.descripcion;

  let año = document.getElementById("modalAño");
  año.textContent = "Año: " + data.año;

  let mes = document.getElementById("modalMes");

  switch (data.mes) {
    case 1:
      mes.textContent = "Mes: Enero";
      break;
    case 2:
      mes.textContent = "Mes: Febrero";
      break;
    case 3:
      mes.textContent = "Mes: Marzo";
      break;
    case 4:
      mes.textContent = "Mes: Abril";
      break;
    case 5:
      mes.textContent = "Mes: Mayo";
      break;
    case 6:
      mes.textContent = "Mes: Junio";
      break;
    case 7:
      mes.textContent = "Mes: Julio";
      break;
    case 8:
      mes.textContent = "Mes: Agosto";
      break;
    case 9:
      mes.textContent = "Mes: Septiembre";
      break;
    case 10:
      mes.textContent = "Mes: Octubre";
      break;
    case 11:
      mes.textContent = "Mes: Noviembre";
      break;
    case 12:
      mes.textContent = "Mes: Diciembre";
      break;
  }

  let debe = document.getElementById("modalDebe");
  debe.textContent = "Total debe: " + data.debe;

  let haber = document.getElementById("modalHaber");
  haber.textContent = "Total haber: " + data.haber;

  let saldo = document.getElementById("modalSaldo");
  saldo.textContent = "Saldo: " + data.saldo;

  let modal = document.getElementById("myModalMayorResultado");
  modal.style = "display: block";
}