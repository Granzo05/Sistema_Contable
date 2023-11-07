package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Cuentas;
import com.example.contabilidad.entities.DetalleAsiento;
import com.example.contabilidad.entities.MayorDTO;
import com.example.contabilidad.repositories.AsientosRepository;
import com.example.contabilidad.repositories.CuentasRepository;
import com.example.contabilidad.repositories.DetalleAsientoRepository;
import com.example.contabilidad.repositories.MayorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class MayorController {
    private final MayorRepository mayorRepository;
    private final CuentasRepository cuentasRepository;
    private final AsientosRepository asientosRepository;
    private final DetalleAsientoRepository detalleAsientoRepository;

    public MayorController(MayorRepository mayorRepository,
                           CuentasRepository cuentasRepository,
                           AsientosRepository asientosRepository,
                           DetalleAsientoRepository detalleAsientoRepository) {
        this.mayorRepository = mayorRepository;
        this.cuentasRepository = cuentasRepository;
        this.asientosRepository = asientosRepository;
        this.detalleAsientoRepository = detalleAsientoRepository;
    }

    @GetMapping("/mayor/")
    public MayorDTO buscarMayor(@RequestParam("nroCuenta") String nroCuenta,
                                @RequestParam("mes") int mes,
                                @RequestParam("año") int anio) {

        LocalDate mesInicial = LocalDate.of(anio, mes, 1);
        LocalDate mesFinal = mesInicial.plusMonths(1);

        // Convertir LocalDate a Date
        Date fechaInicio = Date.from(mesInicial.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fechaFin = Date.from(mesFinal.atStartOfDay(ZoneId.systemDefault()).toInstant());

        // Busco los asientos de un mes y año específicos
        List<Long> idAsientos = asientosRepository.findAsientoIdsByFechaRegistroBetween(fechaInicio, fechaFin);

        // Busco la cuenta por el nroCuenta
        Cuentas cuenta = cuentasRepository.findByNroCuenta(nroCuenta);

        // Lista para almacenar todos los detalles relacionados con la cuenta
        List<DetalleAsiento> detallesCuenta = new ArrayList<>();

        // Iterar a través de los asientos
        for (Long idAsiento : idAsientos) {
            List<DetalleAsiento> detallesAsiento = detalleAsientoRepository.findByAsientoIdYNroCuenta(idAsiento, cuenta.getId());
            if (detallesAsiento != null) {
                detallesCuenta.addAll(detallesAsiento);
            }
        }

        MayorDTO mayorFiltrado = new MayorDTO();
        mayorFiltrado.setCuenta(cuenta);

        for (DetalleAsiento detalle : detallesCuenta) {
            if (detalle.getCuenta().getId() == mayorFiltrado.getCuenta().getId()) {
                if (detalle.getTipo().equals("DEBE")) {
                    mayorFiltrado.setDebe(mayorFiltrado.getDebe() + detalle.getValor());
                } else if (detalle.getTipo().equals("HABER")) {
                    mayorFiltrado.setHaber(mayorFiltrado.getHaber() + detalle.getValor());
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

        mayorFiltrado.setAño(anio);
        mayorFiltrado.setDescripcion(cuenta.getDescripcion());
        mayorFiltrado.setMes(mes);
        System.out.println(mayorFiltrado);
        return mayorFiltrado;
    }
}

