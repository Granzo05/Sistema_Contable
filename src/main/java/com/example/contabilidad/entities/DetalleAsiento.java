package com.example.contabilidad.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "detalles_asiento")
public class DetalleAsiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "asiento_id")
    private Asientos asiento;
    @ManyToOne
    @JoinColumn(name = "cuenta_id")
    private Cuentas cuenta;
    @Transient
    private String descripcion;
    @Column(name = "tipo_cuenta")
    private String tipo;

    @Column(name = "valor")
    private Double valor;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Asientos getAsiento() {
        return asiento;
    }

    public void setAsiento(Asientos asiento) {
        this.asiento = asiento;
    }

    public Cuentas getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuentas cuenta) {
        this.cuenta = cuenta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public String toString() {
        return "DetalleAsiento{" +
                "id=" + id +
                ", asiento=" + asiento +
                ", cuenta=" + cuenta +
                ", descripcion='" + descripcion + '\'' +
                ", tipo='" + tipo + '\'' +
                ", valor=" + valor +
                '}';
    }
}
