package com.example.contabilidad.entities;

public class MayorDTO {
    private Cuentas cuenta;
    private int mes;
    private int año;
    private String descripcion;
    private Double debe = 0.0;
    private Double haber = 0.0;
    private String saldo;

    public Cuentas getCuenta() {
        return cuenta;
    }

    public void setCuenta(Cuentas cuenta) {
        this.cuenta = cuenta;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public void setAño(int año) {
        this.año = año;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getDebe() {
        return debe;
    }

    public void setDebe(Double debe) {
        this.debe = debe;
    }

    public Double getHaber() {
        return haber;
    }

    public void setHaber(Double haber) {
        this.haber = haber;
    }

    public void setSaldo(String saldo) {
        this.saldo = saldo;
    }
}
