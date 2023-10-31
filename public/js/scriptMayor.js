function buscarMayor() {
  const numeroCuenta = document.getElementById("numeroCuenta").value;
  const mes = document.getElementById("mes").value;
  const año = document.getElementById("año").value;

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

/* function llenarSelectNroCuenta() {
  const numeroCuenta = document.getElementById("numeroCuenta");
  const listaSugerencia = document.getElementById("listaSugerencias");
  numeroCuenta.addEventListener('input', function () {

    fetch("http://localhost:8080/cuentas/lista", {
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
        listaSugerencia.innerHTML = '';
        sugerencias.forEach(sugerencia => {
          const item = document.createElement('li');
          item.textContent = sugerencia;
          listaSugerencia.appendChild(item);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  listaSugerencia.addEventListener('click', function (event) {
    const clic = event.target;
    if (clic.tagName === 'LI') {
      numeroCuenta.value = clic.textContent;
      listaSugerencia.innerHTML = '';
    }
  });
}
*/

var openModalButton = document.getElementById("btnBuscar");
var modal = document.getElementById("myModal");
var closeModal = document.getElementById("closeModalButton");

openModalButton.addEventListener("click", function() {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function() {
  modal.style.display = "none"; // Oculta el modal
});

window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
