function buscarMayor() {
  const numeroCuenta = document.getElementById("numeroCuenta").value;
  const mes = document.getElementById("mes").value;
  const año = document.getElementById("año").value;

  if (!numeroCuenta) {
    var mensaje = "El numero de cuenta es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!mes) {
    var mensaje = "El mes del mayor es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else if (!año) {
    var mensaje = "El año del mayor es necesario para la busqueda";
    var titulo = "Campo vacío";
    abrirModal(mensaje, titulo);
  } else {
    fetch("http://localhost:8080/mayor/" + numeroCuenta + "/" + mes + "/" + año, {
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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function abrirModal(mensaje, titulo) {
  let modal = document.getElementById("myModalMayor");

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
