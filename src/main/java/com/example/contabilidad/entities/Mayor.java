package com.example.contabilidad.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "mayor")
public class Mayor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "debe")
    private Double debe = 0.0;
    @Column(name = "haber")
    private Double haber = 0.0;
    @Column(name = "saldo")
    private String saldo;
    @OneToOne
    @JoinColumn(name = "cuenta_id")
    private Cuentas cuenta;

    public Mayor() {
        this.debe = 0.0;
        this.haber = 0.0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cuentas getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuentas cuenta) {
        this.cuenta = cuenta;
    }

    public double getDebe() {
        return debe;
    }

    public void setDebe(Double debe) {
        this.debe = debe;
    }

    public void setDebe(double debe) {
        this.debe = debe;
    }

    public double getHaber() {
        return haber;
    }

    public void setHaber(Double haber) {
        this.haber = haber;
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
