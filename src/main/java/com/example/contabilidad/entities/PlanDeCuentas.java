package com.example.contabilidad.entities;

import com.example.contabilidad.entities.Enums.EnumRubro;

import javax.persistence.*;
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
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "nroCuenta")
    private String nroCuenta;
    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "planDeCuentas")
    private final List<Asientos> asientos;

    public PlanDeCuentas(EnumRubro rubro, String nombre, String descripcion, List<Asientos> asientos) {
        this.rubro = rubro;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.asientos = asientos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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
