package com.example.contabilidad.entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "asientos")
public class Asientos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "nro_asiento")
    private Long nroAsiento;
    @Column(name = "fecha_asentado")
    private Date fechaRegistro;
    @Column(name = "nro_cuenta")
    private String nroCuenta;
    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "asiento_id")
    private List<DetalleAsiento> detallesDebe;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "asiento_id")
    private List<DetalleAsiento> detallesHaber;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

