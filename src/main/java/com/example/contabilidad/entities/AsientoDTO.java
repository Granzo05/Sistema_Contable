package com.example.contabilidad.entities;

import java.util.Date;
import java.util.List;

public class AsientoDTO {
    private String fechaRegistro;
    private List<DetalleAsiento> detallesDebe;
    private List<DetalleAsiento> detallesHaber;

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public List<DetalleAsiento> getDetallesDebe() {
        return detallesDebe;
    }

    public void setDetallesDebe(List<DetalleAsiento> detallesDebe) {
        this.detallesDebe = detallesDebe;
    }

    public List<DetalleAsiento> getDetallesHaber() {
        return detallesHaber;
    }

    public void setDetallesHaber(List<DetalleAsiento> detallesHaber) {
        this.detallesHaber = detallesHaber;
    }
}
