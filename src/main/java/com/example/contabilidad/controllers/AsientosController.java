package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Asientos;
import com.example.contabilidad.entities.Mayor;
import com.example.contabilidad.repositories.AsientosRepository;
import com.example.contabilidad.repositories.MayorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class AsientosController {
    private final AsientosRepository asientosRepository;
    private final MayorRepository mayorRepository;

    public AsientosController(AsientosRepository asientosRepository,
                              MayorRepository mayorRepository) {
        this.asientosRepository = asientosRepository;
        this.mayorRepository = mayorRepository;
    }

    @PostMapping("/asientos")
    public ResponseEntity<String> crearAsientos(@RequestBody Asientos asientosDetails) {
        // Cargo el asiento
        asientosRepository.save(asientosDetails);

        // Busco los asientos de ese nro de cuenta, por ejemplo los de caja. Cargo el asiento y busco todos los cargados neuvamente
        List<Asientos> asientos = asientosRepository.findByNroCuenta(asientosDetails.getNroCuenta());

        // Creo el mayor
        Mayor mayor = new Mayor();
        // Le asigno los asientos
        mayor.setAsientos(asientos);
        // Actualizo los debe y haber de ese mayor
        mayor.setDebe(mayor.getDebe() + asientosDetails.getDebe());
        mayor.setHaber(mayor.getHaber() + asientosDetails.getHaber());

        // Actualizo el saldo
        if (mayor.getDebe() == mayor.getHaber()) {
            mayor.setSaldo("Saldado");
        } else if (mayor.getDebe() > mayor.getHaber()) {
            mayor.setSaldo("Deudor");
        } else {
            mayor.setSaldo("Acreedor");
        }
        // Lo actualizo
        mayorRepository.save(mayor);
        return new ResponseEntity<>("El asiento ha sido añadido correctamente", HttpStatus.CREATED);
    }

    @GetMapping("/asientos/id/{id}")
    public List<Asientos> buscarAsientosPorNroCuenta(@PathVariable String nroCuenta) {
        List<Asientos> asientos = asientosRepository.findByNroCuenta(nroCuenta);
        if (asientos.isEmpty()) {
            return asientos;
        }
        return asientos;
    }

    @CrossOrigin
    @PostMapping("/asientos/{nroAsiento}")
    public List<Asientos> buscarAsientosPorNroAsiento(@PathVariable String nroAsiento) {
        List<Asientos> asientos = asientosRepository.findByNroAsiento(nroAsiento);
        return asientos;
    }

    @CrossOrigin
    @PostMapping("/asientos/{fecha}")
    public List<Asientos> buscarAsientosPorFecha(@PathVariable String fechaStr) {
        List<Asientos> asiento = asientosRepository.findByFecha(fechaStr);
        return asiento;
    }
}
