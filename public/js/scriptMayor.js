const mensajeErrorAño = "El año es necesario para la busqueda del mayor, este debe ser entre 2013 y 2023";
const mensajeErrorMes = "El mes es necesario para la busqueda del mayor";
const mensajeErrorCuenta = "El número de cuenta es necesario para la busqueda del mayor";
const mensajeErrorBusqueda = "No se ha encontrado ningún resultado con los datos ingresados";
const tituloErrorBusquedaNula = "Búsqueda sin resultados";

function buscarMayor() {
  const numeroCuenta = document.getElementById("numeroCuentaMayor").value;
  const mes = document.getElementById("mes").value;
  const año = document.getElementById("año").value;

  if (!numeroCuenta) {
    abrirModalError(mensajeErrorCuenta, "Numero de cuenta incorrecto");
  } else if (!mes || (parseInt(mes) > 12 || parseInt(mes) < 1)) {
    abrirModalError(mensajeErrorMes, "Mes incorrecto");
  } else if (!año || (año > 2023 || año < 2013)) {
    abrirModalError(mensajeErrorAño, "Error al ingresar el año");
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
          abrirModalError(mensajeErrorBusqueda, tituloErrorBusquedaNula);
        }
        return response.json();
      })
      .then((data) => {
        abrirModalResultadoMayor(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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
}