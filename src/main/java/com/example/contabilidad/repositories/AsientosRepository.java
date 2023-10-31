package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.Cuentas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface AsientosRepository extends JpaRepository<Asientos, Long> {
    List<Asientos> findAll();

    // Busqueda nativa para no tener los joins de todas las entidades relaciondas ya que solo necesito el id para manejar mejor la busqueda
    @Query("SELECT a.id FROM Asientos a WHERE a.fechaRegistro BETWEEN :startDate AND :endDate")
    List<Long> findAsientoIdsByFechaRegistroBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


}