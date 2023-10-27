package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Asientos;
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
    public Mayor buscarMayor(@RequestParam("nroCuenta") String nroCuenta,
                             @RequestParam("mes") int mes,
                             @RequestParam("año") int anio) {

        Mayor mayor = mayorRepository.findByNroCuenta(nroCuenta);

        List<Asientos> asientos = mayor.getAsientos();

        double debe = 0;
        double haber = 0;

        Mayor mayorFiltrado = new Mayor();
        for (Asientos asiento : asientos) {
            if (asiento.getFechaRegistro().getMonth() == mes && asiento.getFechaRegistro().getYear() == anio) {
                mayorFiltrado.addAsiento(asiento);
                haber += asiento.getHaber();
                debe += asiento.getDebe();
            }
        }
        if (haber > debe) {
            mayorFiltrado.setSaldo("Acreedor");
        } else {
            mayorFiltrado.setSaldo("Deudor");
        }

        mayorFiltrado.setDebe(debe);
        mayorFiltrado.setHaber(haber);

        return mayorFiltrado;
    }
}
