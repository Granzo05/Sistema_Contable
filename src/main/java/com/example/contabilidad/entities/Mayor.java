package com.example.contabilidad.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "mayor")
public class Mayor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "descripcion_cuenta")
    private String descripcion;
    @OneToMany(mappedBy = "mayor")
    private List<Asientos> asientos;
    @Column(name = "debe")
    private Double debe = 0.0;

    @Column(name = "haber")
    private Double haber = 0.0;

    @Column(name = "saldo")
    private String saldo;

    public Mayor() {
        this.debe = 0.0;
        this.haber = 0.0;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setDebe(Double debe) {
        this.debe = debe;
    }

    public void setHaber(Double haber) {
        this.haber = haber;
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

    public void addAsiento(Asientos asientos) {
        this.asientos.add(asientos);
    }

    public double getDebe() {
        return debe;
    }

    public void setDebe(double debe) {
        this.debe = debe;
    }

    public double getHaber() {
        return haber;
    }

    public void setHaber(double haber) {
        this.haber = haber;
    }

    public String getSaldo() {
        return saldo;
    }

    public void setSaldo(String saldo) {
        this.saldo = saldo;
    }
}
