package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.DetalleAsiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleAsientoRepository extends JpaRepository<DetalleAsiento, Long> {
    List<DetalleAsiento> findAll();

    @Query("SELECT d FROM DetalleAsiento d WHERE d.asiento.id = :idAsiento AND d.cuenta.id = :idCuenta")
    List<DetalleAsiento> findByAsientoIdYNroCuenta(@Param("idAsiento") Long idAsiento, @Param("idCuenta") Long idCuenta);

    @Query("SELECT d FROM DetalleAsiento d WHERE d.cuenta.id = :idCuenta")
    List<DetalleAsiento> findByNroCuenta(@Param("idCuenta") Long idCuenta);

    @Query("SELECT d FROM DetalleAsiento d WHERE d.asiento.id = :idAsiento")
    List<DetalleAsiento> findByAsientoId(@Param("idAsiento") Long idAsiento);

}