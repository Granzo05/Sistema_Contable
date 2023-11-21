function abrirModalExito(mensaje, titulo) {
    let modal = document.getElementById("modalExito");

    let tituloModal = modal.querySelector(".modalTitulo");
    let mensajeModal = modal.querySelector(".modalMensaje");

    tituloModal.innerHTML = titulo;
    mensajeModal.innerHTML = mensaje;

    modal.style.display = "block";
}

function cerrarModalExito() {
    let modal = document.getElementById("modalExito");
    modal.style = "display: none";
}

function abrirModalError(mensaje, titulo) {
    let modal = document.getElementById("modalError");

    let tituloModal = modal.querySelector(".modalTitulo");
    let mensajeModal = modal.querySelector(".modalMensaje");

    tituloModal.innerHTML = titulo;
    mensajeModal.innerHTML = mensaje;

    modal.style.display = "block";
}

function cerrarModalError() {
    let modal = document.getElementById("modalError");
    modal.style = "display: none";
}

function cerrarModalResultado() {
    let modal = document.getElementById("modalResultado");
    modal.style = "display: none";
}

// scriptMayor.js
function abrirModalResultadoMayor(data) {
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

    let modal = document.getElementById("modalResultado");
    modal.style = "display: block";
}

// scriptAsientos.js
function crearModalAsiento(detalles) {
    let divResultado = document.getElementById("modalResultado");
    let divModal = document.getElementById("modal-asiento");
    // Reiniciamos el modal por si ya habia un asiento precargado no mostrarlo nuevamente
    divModal.innerHTML = "";

    let fecha = document.createElement("p");
    detalles.forEach(detalle => {
        var fechaDB = detalle.asiento.fechaRegistro;
        var fechaDB = fechaDB.split("-");
        fecha.textContent = "Fecha: " + fechaDB[2] + "/" + fechaDB[1] + "/" + fechaDB[0];
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

    limpiarCampos();
}