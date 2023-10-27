package com.example.contabilidad.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "plan_de_cuentas")
public class PlanDeCuentas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "rubro")
    private String rubro;
    @Column(name = "nro_cuenta", unique = true)
    private String nroCuenta;
    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "planDeCuentas")
    private List<Asientos> asientos;

    public PlanDeCuentas() {
    }

    public PlanDeCuentas(String descripcion, List<Asientos> asientos) {
        this.descripcion = descripcion;
        this.asientos = asientos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Asientos> getAsientos() {
        return asientos;
    }

    public void setAsientos(List<Asientos> asientos) {
        this.asientos = asientos;
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
