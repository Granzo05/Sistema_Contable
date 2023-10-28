package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.DetalleAsiento;
import com.example.contabilidad.entities.Mayor;
import com.example.contabilidad.repositories.MayorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MayorController {
    private final MayorRepository mayorRepository;

    public MayorController(MayorRepository mayorRepository) {
        this.mayorRepository = mayorRepository;
    }

    @GetMapping("/mayor")
    public Mayor buscarMayor(@RequestParam("descripcion") String descripcion,
                             @RequestParam("mes") int mes,
                             @RequestParam("año") int anio) {

        Mayor mayor = mayorRepository.findByDescripcionCuenta(descripcion);

        Double debeTotal = 0.0;
        Double haberTotal = 0.0;

        Mayor mayorFiltrado = new Mayor();

        if (haberTotal > debeTotal) {
            mayorFiltrado.setSaldo("Acreedor");
        } else {
            mayorFiltrado.setSaldo("Deudor");
        }

        mayorFiltrado.setDebe(debeTotal);
        mayorFiltrado.setHaber(haberTotal);

        return mayorFiltrado;
    }
}
