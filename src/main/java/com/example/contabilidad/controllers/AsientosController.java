package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.DetalleAsiento;
import com.example.contabilidad.entities.Mayor;
import com.example.contabilidad.repositories.AsientosRepository;
import com.example.contabilidad.repositories.MayorRepository;
import com.example.contabilidad.repositories.PlanDeCuentasRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class AsientosController {
    private final AsientosRepository asientosRepository;
    private final MayorRepository mayorRepository;
    private final PlanDeCuentasRepository planDeCuentasRepository;

    public AsientosController(AsientosRepository asientosRepository,
                              MayorRepository mayorRepository,
                              PlanDeCuentasRepository planDeCuentasRepository) {
        this.asientosRepository = asientosRepository;
        this.mayorRepository = mayorRepository;
        this.planDeCuentasRepository = planDeCuentasRepository;
    }

    @PostMapping("/asientos")
    public ResponseEntity<String> crearAsientos(@RequestBody Asientos asientosDetails) {
        asientosRepository.save(asientosDetails);

        List<DetalleAsiento> detallesDebe = asientosDetails.getDetallesDebe();
        List<DetalleAsiento> detallesHaber = asientosDetails.getDetallesHaber();

        List<Mayor> mayores = new ArrayList<>();

        for (DetalleAsiento detalle : detallesDebe) {
            Mayor mayor = mayorRepository.findByDescripcionCuenta(detalle.getDescripcion());
            if (mayor == null) {
                mayor = new Mayor();
            }
            if (detalle.getValor() != null) {
                mayor.setDescripcion(detalle.getDescripcion());
                mayor.setDebe(detalle.getValor());
                mayores.add(mayor);
            }
        }

        for (DetalleAsiento detalle : detallesHaber) {
            Mayor mayor = mayorRepository.findByDescripcionCuenta(detalle.getDescripcion());
            if (mayor == null) {
                mayor = new Mayor();
            }
            if (detalle.getValor() != null) {
                mayor.setDescripcion(detalle.getDescripcion());
                mayor.setHaber(detalle.getValor());
                mayores.add(mayor);
            }
        }

        for (Mayor mayor : mayores) {
            if (mayor.getDebe() > mayor.getHaber()) {
                mayor.setSaldo("Deudor");
            } else if (mayor.getDebe() < mayor.getHaber()) {
                mayor.setSaldo("Acreedor");
            } else {
                mayor.setSaldo("Saldado");
            }
            mayorRepository.save(mayor);
        }

        return new ResponseEntity<>("El asiento ha sido añadido correctamente", HttpStatus.CREATED);
    }


    @GetMapping("/asientos/id/{id}")
    public List<Asientos> buscarAsientosPorNroCuenta(@PathVariable String nroCuenta) {
        List<Asientos> asientos = asientosRepository.findByNroCuenta(nroCuenta);

        return asientos;
    }

    @CrossOrigin
    @PostMapping("/asientos/{nroAsiento}")
    public List<Asientos> buscarAsientosPorNroAsiento(@PathVariable Long nroAsiento) {
        return asientosRepository.findByNroAsiento(nroAsiento);
    }

    @CrossOrigin
    @PostMapping("/asientos/{fecha}")
    public List<Asientos> buscarAsientosPorFecha(@PathVariable String fechaStr) {
        Date fecha = convertirFechaStringADate(fechaStr);

        if (fecha != null) {
            List<Asientos> asiento = asientosRepository.findByFecha(fecha);
            return asiento;
        } else {
            return Collections.emptyList();
        }
    }

    public Date convertirFechaStringADate(String fechaStr) {
        try {
            SimpleDateFormat formatoFecha = new SimpleDateFormat("dd/MM/yyyy");
            Date fecha = formatoFecha.parse(fechaStr);

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(fecha);

            Date fechaConvertida = calendar.getTime();

            return fechaConvertida;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
