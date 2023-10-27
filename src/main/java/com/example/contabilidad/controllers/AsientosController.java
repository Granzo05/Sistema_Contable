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
        asientosRepository.save(asientosDetails);

        List<Asientos> asientos = asientosRepository.findByNroCuenta(asientosDetails.getNroCuenta());
        asientos.add(asientosDetails);

        Mayor mayor = new Mayor();
        mayor.setAsientos(asientos);
        mayor.setDebe(mayor.getDebe() + asientosDetails.getDebe());
        mayor.setHaber(mayor.getHaber() + asientosDetails.getHaber());

        if (mayor.getDebe() == mayor.getHaber()) {
            mayor.setSaldo("Saldado");
        } else if (mayor.getDebe() > mayor.getHaber()) {
            mayor.setSaldo("Deudor");
        } else {
            mayor.setSaldo("Acreedor");
        }

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
    @PostMapping("/asientos/{asiento}")
    public List<Asientos> buscarAsientosPorNroAsiento(@PathVariable String asiento) {
        // Recibo un email y una password desde el asientos, esa pass la encripto para ver si coincide con la guardada
        List<Asientos> asientosOptional = asientosRepository.findByNroAsiento(asiento);
        return asientosOptional;
    }

    @CrossOrigin
    @PostMapping("/asientos/{fecha}")
    public List<Asientos> buscarAsientosPorFecha(@PathVariable String fechaStr) {
        // Convierte la fecha recibida en un objeto Date con el formato "dd/MM/yyyy"
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date fecha = null;
        try {
            fecha = dateFormat.parse(fechaStr);
        } catch (ParseException ignored) {
        }
        return asientosRepository.findAll();

    }

    @CrossOrigin
    @PostMapping("/asientos/mayor")
    public List<Asientos> buscarAsientosEnMayor(@RequestBody Asientos asientos) {
        // Convierte la fecha recibida en un objeto Date con el formato "dd/MM/yyyy"
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        Date fecha = null;
        return asientosRepository.findAll();
    }

}
