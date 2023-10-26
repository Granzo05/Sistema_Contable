package com.example.contabilidad.entities;

import com.example.contabilidad.entities.Enums.EnumRubro;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "plan_de_cuentas")
public class PlanDeCuentas {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "rubro")
    @Enumerated(EnumType.STRING)
    private EnumRubro rubro;
    @Column(name = "nro_cuenta")
    private String nroCuenta;
    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "planDeCuentas")
    private List<Asientos> asientos;

    public PlanDeCuentas() {
    }

    public PlanDeCuentas(EnumRubro rubro, String descripcion, List<Asientos> asientos) {
        this.rubro = rubro;
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

    public EnumRubro getRubro() {
        return rubro;
    }

    public void setRubro(EnumRubro rubro) {
        this.rubro = rubro;
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
}
