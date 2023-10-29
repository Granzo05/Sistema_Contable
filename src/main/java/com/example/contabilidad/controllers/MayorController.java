package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.Cuentas;
import com.example.contabilidad.entities.DetalleAsiento;
import com.example.contabilidad.entities.Mayor;
import com.example.contabilidad.repositories.AsientosRepository;
import com.example.contabilidad.repositories.CuentasRepository;
import com.example.contabilidad.repositories.MayorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MayorController {
    private final MayorRepository mayorRepository;
    private final CuentasRepository cuentasRepository;
    private final AsientosRepository asientosRepository;

    public MayorController(MayorRepository mayorRepository,
                           CuentasRepository cuentasRepository,
                           AsientosRepository asientosRepository) {
        this.mayorRepository = mayorRepository;
        this.cuentasRepository = cuentasRepository;
        this.asientosRepository = asientosRepository;
    }

    @GetMapping("/mayor")
    public Mayor buscarMayor(@RequestParam("nroCuenta") String nroCuenta,
                             @RequestParam("mes") int mes,
                             @RequestParam("año") int anio) {

        List<Asientos> asientos = asientosRepository.findByMesYAño(mes, anio);
        Cuentas cuenta = cuentasRepository.findByNroCuenta(nroCuenta);
        Mayor mayorFiltrado = new Mayor();
        mayorFiltrado.setCuenta(cuenta);
        for (Asientos asiento : asientos) {
            List<DetalleAsiento> detalles = asiento.getDetallesAsiento();
            for (DetalleAsiento detalle : detalles) {
                if (detalle.getCuenta().getId() == cuenta.getId()) {
                    if (detalle.getTipo().equals("DEBE")) {
                        mayorFiltrado.setDebe(mayorFiltrado.getDebe() + detalle.getValor());
                    } else if (detalle.getTipo().equals("HABER")) {
                        mayorFiltrado.setHaber(mayorFiltrado.getHaber() + detalle.getValor());
                    }
                }
            }
        }
        if (mayorFiltrado.getHaber() > mayorFiltrado.getDebe()) {
            mayorFiltrado.setSaldo("Acreedor");
        } else if (mayorFiltrado.getHaber() < mayorFiltrado.getDebe()) {
            mayorFiltrado.setSaldo("Deudor");
        } else {
            mayorFiltrado.setSaldo("Saldado");
        }
        return mayorFiltrado;
    }
}
