package com.example.contabilidad.repositories;

import com.example.contabilidad.entities.Mayor;
import com.example.contabilidad.entities.ModificacionMayor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModificacionMayorRepository extends JpaRepository<ModificacionMayor, Long> {
}