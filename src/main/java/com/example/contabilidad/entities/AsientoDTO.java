package com.example.contabilidad.entities;

import java.util.List;

public class AsientoDTO {
    private String fechaRegistro;
    private List<DetalleAsiento> detallesDebe;
    private List<DetalleAsiento> detallesHaber;
    private String descripcion;

    public String getFechaRegistro() {
        return fechaRegistro;
    }


    public List<DetalleAsiento> getDetallesDebe() {
        return detallesDebe;
    }


    public List<DetalleAsiento> getDetallesHaber() {
        return detallesHaber;
    }

}
