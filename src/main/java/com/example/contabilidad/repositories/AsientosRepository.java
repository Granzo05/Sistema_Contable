package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.Cuentas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AsientosRepository extends JpaRepository<Asientos, Long> {
    List<Asientos> findAll();
    @Query("SELECT a FROM Asientos a WHERE a.id = :id")
    List<Asientos> findByNroAsiento(@Param("id") Long id);
    @Query("SELECT a FROM Asientos a WHERE a.fechaRegistro = :fecha")
    List<Asientos> findByFecha(@Param("fecha") Date fecha);

}