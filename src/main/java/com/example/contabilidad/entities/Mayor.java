package com.example.contabilidad.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "mayor")
public class Mayor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "nro_cuenta")
    private String nroCuenta;
    @OneToMany(mappedBy = "mayor")
    private List<Asientos> asientos;

    @Column(name = "debe")
    private double debe;

    @Column(name = "haber")
    private double haber;

    @Column(name = "saldo")
    private String saldo;

    public Mayor() {
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
