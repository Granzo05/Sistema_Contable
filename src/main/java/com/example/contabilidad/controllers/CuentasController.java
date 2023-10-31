package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.Cuentas;
import com.example.contabilidad.repositories.CuentasRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class CuentasController {
    private final CuentasRepository cuentasRepository;

    public CuentasController(CuentasRepository cuentasRepository) {
        this.cuentasRepository = cuentasRepository;
    }

    @PostMapping("/cuenta")
    public ResponseEntity<String> crearCuenta(@RequestBody Cuentas cuentasDetails) {
        System.out.println(cuentasDetails.getNroCuenta());
        Optional<Cuentas> planDeCuentas = cuentasRepository.findByDescripcionAndNroCuenta(cuentasDetails.getDescripcion(), cuentasDetails.getNroCuenta());
        if (planDeCuentas.isEmpty()) {
            cuentasRepository.save(cuentasDetails);
            return new ResponseEntity<>("El plan de cuentas ha sido añadido correctamente", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("El plan de cuentas ya existe", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cuenta/nro_cuenta/{nroCuenta}")
    public List<Cuentas> buscarPlanDeCuentasPorNroCuenta(@PathVariable String nroCuenta) {
        List<Cuentas> cuentasFiltradas = cuentasRepository.findByNroCuentaEquals(nroCuenta);
        return cuentasFiltradas;
    }

    @GetMapping("/cuenta/descripcion/{descripcion}")
    public List<Cuentas> buscarPlanDeCuentasPorDescripcion(@PathVariable String descripcion) {
        List<Cuentas> cuentasFiltradas = cuentasRepository.findByDescripcionEquals(descripcion);
        return cuentasFiltradas;
    }

    @CrossOrigin
    @GetMapping("/cuenta/{rubro}")
    public List<Cuentas> buscarPlanDeCuentasPorRubro(@PathVariable String rubro) {
        // Recibo un email y una password desde el planDeCuentas, esa pass la encripto para ver si coincide con la guardada
        List<Cuentas> cuentasOptional = cuentasRepository.findByRubro(rubro);
        return cuentasOptional;
    }

    @PutMapping("/cuenta/{nroCuenta}/update")
    public ResponseEntity<Cuentas> updatePlanDeCuentas(@PathVariable String nroCuenta, @RequestBody Map<String, String> requestData) {
        Cuentas cuenta = cuentasRepository.findByNroCuenta(nroCuenta);
        if (cuenta == null) {
            return ResponseEntity.notFound().build();
        }

        if (requestData.containsKey("descripcion")) {
            cuenta.setDescripcion(requestData.get("descripcion"));
        }

        if (requestData.containsKey("rubro")) {
            cuenta.setRubro(requestData.get("rubro"));
        }

        cuentasRepository.save(cuenta);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/cuenta/{nroCuenta}/delete")
    public ResponseEntity<?> borrarPlanDeCuentas(@PathVariable String nroCuenta) {
        Cuentas cuenta = cuentasRepository.findByNroCuenta(nroCuenta);
        if (cuenta == null) {
            return new ResponseEntity<>("No existe o ya ha sido borrado", HttpStatus.BAD_REQUEST);
        }
        cuentasRepository.delete(cuenta);
        return new ResponseEntity<>("Ha sido borrado correctamente", HttpStatus.ACCEPTED);
    }
}
