package com.example.contabilidad.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cuentas")
public class Cuentas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "rubro")
    private String rubro;
    @Column(name = "nro_cuenta", unique = true)
    private String nroCuenta;
    @Column(name = "descripcion")
    private String descripcion;

    public Cuentas() {
    }

    public Long getId() {
        return id;
    }


    public String getNroCuenta() {
        return nroCuenta;
    }

    public void setNroCuenta(String nroCuenta) {
        this.nroCuenta = nroCuenta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getRubro() {
        return rubro;
    }

    public void setRubro(String rubro) {
        this.rubro = rubro;
    }
}
