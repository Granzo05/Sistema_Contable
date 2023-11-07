function validarNumeroCuenta(numeroCuenta) {
  if (!numeroCuenta) {
    return "El número de cuenta es necesario para la búsqueda";
  }
  // Puedes agregar más validaciones específicas aquí si es necesario
  return null; // Indica que la validación es exitosa
}

function validarMes(mes) {
  if (!mes) {
    return "El mes del mayor es necesario para la búsqueda";
  }
  if (parseInt(mes) > 12 || parseInt(mes) < 1) {
    return "El mes debe ser válido entre 1 y 12";
  }
  return null;
}

function validarAño(año) {
  if (!año) {
    return "El año del mayor es necesario para la búsqueda";
  }
  if (año > 2023 || año < 2013) {
    return "El año no puede ser mayor al actual o menor a 2013";
  }
  return null;
}

function buscarMayor() {
  const numeroCuenta = document.getElementById("numeroCuentaMayor").value;
  const mes = document.getElementById("mes").value;
  const año = document.getElementById("año").value;

  const errores = [];

  const numeroCuentaError = validarNumeroCuenta(numeroCuenta);
  if (numeroCuentaError) {
    errores.push(numeroCuentaError);
  }

  const mesError = validarMes(mes);
  if (mesError) {
    errores.push(mesError);
  }

  const añoError = validarAño(año);
  if (añoError) {
    errores.push(añoError);
  }

  if (errores.length > 0) {
    for (const error of errores) {
      abrirModalError(error, "Campo vacío o incorrecto");
    }
  } else {
    const data = { nroCuenta: numeroCuenta, mes: mes, año: año };
    const queryString = new URLSearchParams(data).toString();

    fetch(`http://localhost:8080/mayor/?${queryString}`, {
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
        console.log(data);
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

function buscarCuentasPorNroCuenta() {
  const nroCuenta = document.getElementById("numeroCuentaMayor").value;

  const datalist = document.getElementById("opcionesCuentasMayor");
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