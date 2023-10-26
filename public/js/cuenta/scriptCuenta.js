function buscarCuentasPorRubro() {
    const rubro = document.getElementById("rubroBuscar").value;

    fetch("http://localhost:8080/cuenta/rubro/" + rubro, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos (${response.status}): ${response.statusText}`);
            }
        })
        .then(data => {
            // Hacer una table o algo con los datos
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function buscarCuentasPorNroCuenta() {
    const nroCuenta = document.getElementById("nroCuentaBuscar").value;

    fetch("http://localhost:8080/cuenta/nro/" + nroCuenta, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos (${response.status}): ${response.statusText}`);
            }
        })
        .then(data => {
            // Hacer una table o algo con los datos
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function agregarCuenta() {
    var rubro = document.getElementById("rubroAgregar").value;
    var numeroCuenta = document.getElementById("numeroCuentaAgregar").value;
    var descripcion = document.getElementById("descripcionAgregar").value;

    let cuentaData = {
        rubro: rubro,
        nroCuenta: numeroCuenta,
        descripcion: descripcion
    }

    fetch("http://localhost:8080/cuenta", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cuentaData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos (${response.status}): ${response.statusText}`);
            }
            var resultado = document.getElementById("resultado");
            resultado.innerHTML = `
                <h2>Cuenta agregada con éxito:</h2>
                <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
                <strong>Rubro:</strong> ${rubro}<br>
                <strong>Descripción:</strong> ${descripcion}
            `;
        })
        .then(data => {
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function actualizarCuenta() {
    var rubro = document.getElementById("rubroActualizar").value;
    var numeroCuenta = document.getElementById("numeroCuentaActualizar").value;
    var descripcion = document.getElementById("descripcionActualizar").value;

    let datos = [];

    if (rubro != null) {
        datos.push(rubro);
    }

    if (numeroCuenta != null) {
        datos.push(numeroCuenta);
    }

    if (descripcion != null) {
        datos.push(descripcion);
    }

    fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos (${response.status}): ${response.statusText}`);
            }
            var resultado = document.getElementById("resultado");
            resultado.innerHTML = `
                <h2>Cuenta actualizada con exito:</h2>
                <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
            `;
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function eliminarCuenta() {
    var numeroCuenta = document.getElementById("numeroCuentaEliminar").value;

    fetch("http://localhost:8080/cuenta/" + numeroCuenta + "/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos (${response.status}): ${response.statusText}`);
            }
            var resultado = document.getElementById("resultado");
            resultado.innerHTML = `
                <h2>Cuenta eliminada con exito:</h2>
                <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
            `;
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function botonAgregar() {
    var añadirCuenta = document.getElementById("añadirCuenta");
    var eliminarCuenta = document.getElementById("eliminarCuenta");
    var modificarCuenta = document.getElementById("modificarCuenta");
    var consultarCuenta = document.getElementById("consultarCuenta");

    if (añadirCuenta.style.display === "none") {
        añadirCuenta.style.display = "block";
        eliminarCuenta.style.display = "none";
        modificarCuenta.style.display = "none";
        consultarCuenta.style.display = "none";
    } else {
        añadirCuenta.style.display = "none";
    }

}

function botonEliminar() {
    var eliminarCuenta = document.getElementById("eliminarCuenta");

    if (eliminarCuenta.style.display === "none") {
        eliminarCuenta.style.display = "block";
        añadirCuenta.style.display = "none";
        modificarCuenta.style.display = "none";
        consultarCuenta.style.display = "none";
    } else {
        eliminarCuenta.style.display = "none";
    }

}

function botonModificar() {
    var modificarCuenta = document.getElementById("modificarCuenta");

    if (modificarCuenta.style.display === "none") {
        modificarCuenta.style.display = "block";
        eliminarCuenta.style.display = "none";
        añadirCuenta.style.display = "none";
        consultarCuenta.style.display = "none";
    } else {
        modificarCuenta.style.display = "none";
    }

}

function botonConsultar() {
    var consultarCuenta = document.getElementById("consultarCuenta");

    if (consultarCuenta.style.display === "none") {
        consultarCuenta.style.display = "block";
        eliminarCuenta.style.display = "none";
        modificarCuenta.style.display = "none";
        añadirCuenta.style.display = "none";
    } else {
        consultarCuenta.style.display = "none";
    }

}

function botonCerrar() {
    var iconoCerrar = document.getElementById("iconoCerrar");

    añadirCuenta.style.display = "none";
}