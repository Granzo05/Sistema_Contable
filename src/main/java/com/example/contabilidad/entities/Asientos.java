package com.example.contabilidad.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "asientos")
public class Asientos {
    @Column(name = "fecha_asentado", updatable = false, nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    public Date fechaRegistro;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long nroAsiento;
    @Column(name = "nro_cuenta")
    private String nroCuenta;
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "transaccion")
    private String transaccion;

    @Column(name = "debe")
    private double debe;

    @Column(name = "haber")
    private double haber;

    @ManyToOne
    @JoinColumn(name = "plan_de_cuentas")
    private PlanDeCuentas planDeCuentas;

    @ManyToOne
    @JoinColumn(name = "mayor")
    private Mayor mayor;

    public Asientos() {
    }

    public Long getNroAsiento() {
        return nroAsiento;
    }

    public void setNroAsiento(Long nroAsiento) {
        this.nroAsiento = nroAsiento;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
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

    public PlanDeCuentas getPlanDeCuentas() {
        return planDeCuentas;
    }

    public void setPlanDeCuentas(PlanDeCuentas planDeCuentas) {
        this.planDeCuentas = planDeCuentas;
    }

    public Mayor getMayor() {
        return mayor;
    }

    public void setMayor(Mayor mayor) {
        this.mayor = mayor;
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

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }
}

