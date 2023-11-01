package com.example.contabilidad.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "asientos")
public class Asientos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nro_asiento")
    private Long id;
    @Temporal(TemporalType.DATE)
    @Column(columnDefinition = "DATE", name = "fecha_asentado")
    private Date fechaRegistro;
    @OneToMany(mappedBy = "asiento", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DetalleAsiento> detallesAsiento = new ArrayList<>();

    public Asientos() {
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

    public List<DetalleAsiento> getDetallesAsiento() {
        return detallesAsiento;
    }

    public void setDetallesAsiento(List<DetalleAsiento> detallesAsiento) {
        this.detallesAsiento = detallesAsiento;
    }

    public void addDetalles(DetalleAsiento detallesAsiento) {
        this.detallesAsiento.add(detallesAsiento);
    }
}

