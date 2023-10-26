package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.Mayor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MayorRepository extends JpaRepository<Mayor, Long> {
    List<Mayor> findAll();

    @Query("SELECT m FROM Mayor m WHERE m.asiento.nroCuenta = :nroCuenta")
    List<Asientos> findByNroCuenta(@Param("nroCuenta") String numeroCuenta);

    @Query("SELECT m FROM Mayor m WHERE YEAR(m.fecha) = :año AND MONTH(m.fecha) = :mes AND m.asiento.nroCuenta = :nroCuenta")
    Mayor findByCuentaAñoYMes(@Param("nroCuenta") String nroCuenta, @Param("año") int ano, @Param("mes") int mes);



}