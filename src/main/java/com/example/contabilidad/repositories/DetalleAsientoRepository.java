package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.DetalleAsiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DetalleAsientoRepository extends JpaRepository<DetalleAsiento, Long> {
    List<DetalleAsiento> findAll();

}