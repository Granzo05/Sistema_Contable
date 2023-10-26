function agregarCuenta() {
    var rubro = document.getElementById("rubro").value;
    var numeroCuenta = document.getElementById("numeroCuenta").value;
    var descripcion = document.getElementById("descripcion").value;

    var resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h2>Cuenta agregada con éxito:</h2>
        <strong>Número de Cuenta:</strong> ${numeroCuenta}<br>
        <strong>Rubro:</strong> ${rubro}<br>
        <strong>Descripción:</strong> ${descripcion}
    `;
}

function botonAgregar(){
    var añadirCuenta = document.getElementById("añadirCuenta");
    var eliminarCuenta = document.getElementById("eliminarCuenta");
    var modificarCuenta = document.getElementById("modificarCuenta");
    var consultarCuenta = document.getElementById("consultarCuenta");

    if(añadirCuenta.style.display === "none"){
        añadirCuenta.style.display = "block";
        eliminarCuenta.style.display = "none";
        modificarCuenta.style.display = "none";
        consultarCuenta.style.display = "none";
    }else {
        añadirCuenta.style.display = "none";
    }
    
}

function botonEliminar(){
    var eliminarCuenta = document.getElementById("eliminarCuenta");

    if(eliminarCuenta.style.display === "none"){
        eliminarCuenta.style.display = "block";
        añadirCuenta.style.display = "none";
        modificarCuenta.style.display = "none";
        consultarCuenta.style.display = "none";
    } else {
        eliminarCuenta.style.display = "none";
    }
    
}

function botonModificar(){
    var modificarCuenta = document.getElementById("modificarCuenta");

    if(modificarCuenta.style.display === "none"){
        modificarCuenta.style.display = "block";
        eliminarCuenta.style.display = "none";
        añadirCuenta.style.display = "none";
        consultarCuenta.style.display = "none";
    } else {
        modificarCuenta.style.display = "none";
    }
    
}

function botonConsultar(){
    var consultarCuenta = document.getElementById("consultarCuenta");

    if(consultarCuenta.style.display === "none"){
        consultarCuenta.style.display = "block";
        eliminarCuenta.style.display = "none";
        modificarCuenta.style.display = "none";
        añadirCuenta.style.display = "none";
    } else {
        consultarCuenta.style.display = "none";
    }
    
}

function botonCerrar(){
    var iconoCerrar = document.getElementById("iconoCerrar");
    
    añadirCuenta.style.display = "none";
}