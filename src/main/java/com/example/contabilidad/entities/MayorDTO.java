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

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public int getAño() {
        return año;
    }

    public void setAño(int año) {
        this.año = año;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getSaldo() {
        return saldo;
    }

    public void setSaldo(String saldo) {
        this.saldo = saldo;
    }

    @Override
    public String toString() {
        return "MayorDTO{" +
                "cuenta=" + cuenta +
                ", mes=" + mes +
                ", año=" + año +
                ", descripcion='" + descripcion + '\'' +
                ", debe=" + debe +
                ", haber=" + haber +
                ", saldo='" + saldo + '\'' +
                '}';
    }
}
