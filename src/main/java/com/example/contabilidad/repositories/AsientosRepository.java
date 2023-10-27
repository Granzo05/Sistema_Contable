package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Asientos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AsientosRepository extends JpaRepository<Asientos, Long> {
    List<Asientos> findAll();

    @Query("SELECT a FROM Asientos a WHERE a.nroCuenta = :nroCuenta")
    List<Asientos> findByNroCuenta(@Param("nroCuenta") String numeroCuenta);

    @Query("SELECT a FROM Asientos a WHERE a.nroAsiento = :nroAsiento")
    List<Asientos> findByNroAsiento(@Param("nroAsiento") Long nroAsiento);
    @Query("SELECT a FROM Asientos a WHERE a.fechaRegistro = :fecha")
    List<Asientos> findByFecha(@Param("fecha") Date fecha);

}