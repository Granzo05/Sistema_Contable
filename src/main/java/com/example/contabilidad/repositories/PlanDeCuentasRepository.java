package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.PlanDeCuentas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanDeCuentasRepository extends JpaRepository<PlanDeCuentas, Long> {
    List<PlanDeCuentas> findAll();

    @Query("SELECT c FROM PlanDeCuentas c WHERE c.nombre = :nombre AND c.nroCuenta = :nroCuenta")
    Optional<PlanDeCuentas> findByNameAndID(@Param("nombre") String nombre, @Param("nroCuenta") String numeroCuenta);

    @Query("SELECT c FROM PlanDeCuentas c WHERE c.nroCuenta = :nroCuenta")
    Optional<PlanDeCuentas> findByNroCuenta(@Param("nroCuenta") String numeroCuenta);

    @Query("SELECT c FROM PlanDeCuentas c WHERE c.rubro = :rubro")
    List<PlanDeCuentas> findByRubro(@Param("rubro") String rubro);

}