package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Mayor;
import com.example.contabilidad.entities.PlanDeCuentas;
import com.example.contabilidad.repositories.MayorRepository;
import com.example.contabilidad.repositories.PlanDeCuentasRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@RestController
public class MayorController {
    private final MayorRepository mayorRepository;

    public MayorController(MayorRepository mayorRepository) {
        this.mayorRepository = mayorRepository;
    }

    @GetMapping("/mayor")
    public ResponseEntity<Mayor> buscarMayor(@RequestParam("nroCuenta") String nroCuenta,
                                             @RequestParam("mes") int mes,
                                             @RequestParam("año") int año) {

        Mayor mayor = mayorRepository.findByCuentaAñoYMes(nroCuenta, año, mes);

        if (mayor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mayor);
    }

}
