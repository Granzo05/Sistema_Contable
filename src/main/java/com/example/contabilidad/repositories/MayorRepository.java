package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Mayor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MayorRepository extends JpaRepository<Mayor, Long> {
    List<Mayor> findAll();

    @Query("SELECT m FROM Mayor m WHERE m.nroCuenta = :nroCuenta")
    Mayor findByNroCuenta(@Param("nroCuenta") String numeroCuenta);

    /*
    @Query("SELECT m FROM Mayor m WHERE YEAR(m.fecha) = :anio AND MONTH(m.fecha) = :mes AND m.asiento.nroCuenta = :nroCuenta")
    Mayor findByCuentaAnioYMes(@Param("nroCuenta") String nroCuenta, @Param("anio") int anio, @Param("mes") int mes);

     */


}