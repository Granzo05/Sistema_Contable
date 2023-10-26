package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Asientos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsientosRepository extends JpaRepository<Asientos, Long> {
    List<Asientos> findAll();

    @Query("SELECT a FROM Asientos a WHERE a.nroCuenta = :nroCuenta")
    Optional<Asientos> findByNroCuenta(@Param("nroCuenta") String numeroCuenta);

    @Query("SELECT a FROM Asientos a WHERE c.nroAsiento = :nroAsiento")
    List<Asientos> findByNroAsiento(@Param("nroAsiento") String nroAsiento);

    @Query("SELECT a FROM Asientos a WHERE TO_DATE(a.fecha, 'dd/MM/yyyy') = :fecha")
    List<Asientos> findByFecha(@Param("fecha") Date fecha);


}