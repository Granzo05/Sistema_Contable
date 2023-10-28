package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Cuentas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CuentasRepository extends JpaRepository<Cuentas, Long> {
    List<Cuentas> findAll();

    @Query("SELECT c FROM Cuentas c WHERE c.descripcion = :descripcion AND c.nroCuenta = :nroCuenta")
    Optional<Cuentas> findByDescripcionAndNroCuenta(String descripcion, String nroCuenta);

    @Query("SELECT c FROM Cuentas c WHERE c.descripcion = :descripcion")
    Cuentas findByDescripcion(String descripcion);

    @Query("SELECT c FROM Cuentas c WHERE c.nroCuenta = :nroCuenta")
    Cuentas findByNroCuenta(@Param("nroCuenta") String numeroCuenta);

    @Query("SELECT c FROM Cuentas c WHERE c.rubro = :rubro")
    List<Cuentas> findByRubro(@Param("rubro") String rubro);

}