package com.example.contabilidad.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "mayor")
public class Mayor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(mappedBy = "mayor")
    private List<Asientos> asientos;

    @Column(name = "debe")
    private double debe;

    @Column(name = "haber")
    private double haber;

    @Column(name = "saldo")
    private String saldo;

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
