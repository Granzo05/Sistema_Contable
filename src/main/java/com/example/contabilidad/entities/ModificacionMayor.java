package com.example.contabilidad.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "modificacion_mayor")
public class ModificacionMayor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "asiento_id")
    private Asientos asiento;

    @ManyToOne
    @JoinColumn(name = "mayor_id")
    private Mayor mayor;

    @Column(name = "fecha_modificacion")
    private Date fechaModificacion;

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

    public Mayor getMayor() {
        return mayor;
    }

    public void setMayor(Mayor mayor) {
        this.mayor = mayor;
    }

    public Date getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }
}
