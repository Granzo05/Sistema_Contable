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
        console.log(data);
        let divModal = document.getElementById('myModalayorExito');

        let h2 = document.getElementById("modalTitulo");
        h2.innerHTML = data.cuenta.descripcion;

        let p = document.getElementById("modalMensaje");
        p.hidden = true;

        let mes = document.createAttribute("h3");
        mes.textContent = "Mes: " + data.mes;

        let año = document.createAttribute("h3");
        año.textContent = "Año: " + data.año;

        let debe = document.createAttribute("h3");
        debe.textContent = "Total debe: " + data.debe;

        let haber = document.createAttribute("h3");
        haber.textContent = "Total haber: " + data.haber;

        let saldo = document.createAttribute("h3");
        saldo.textContent = "Saldo: " + data.saldo;

        divModal.appendChild(mes);
        divModal.appendChild(año);
        divModal.appendChild(debe);
        divModal.appendChild(haber);

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
