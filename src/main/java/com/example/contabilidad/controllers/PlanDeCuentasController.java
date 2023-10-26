package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.PlanDeCuentas;
import com.example.contabilidad.repositories.PlanDeCuentasRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@RestController
public class PlanDeCuentasController {
    private final PlanDeCuentasRepository planDeCuentasRepository;

    public PlanDeCuentasController(PlanDeCuentasRepository planDeCuentasRepository) {
        this.planDeCuentasRepository = planDeCuentasRepository;
    }

    @PostMapping("/planDeCuentas")
    public ResponseEntity<String> crearPlanDeCuentas(@RequestBody PlanDeCuentas planDeCuentasDetails) {
        Optional<PlanDeCuentas> planDeCuentas = planDeCuentasRepository.findByNameAndID(planDeCuentasDetails.getNombre(), planDeCuentasDetails.getNroCuenta());
        if (planDeCuentas.isEmpty()) {
            planDeCuentasRepository.save(planDeCuentasDetails);
            return new ResponseEntity<>("El plan de cuentas ha sido añadido correctamente", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("El plan de cuentas ya existe", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/planDeCuentas/id/{id}")
    public ResponseEntity<PlanDeCuentas> buscarPlanDeCuentasPorNroCuenta(@PathVariable String nroCuenta) {
        Optional<PlanDeCuentas> planDeCuentasOptional = planDeCuentasRepository.findByNroCuenta(nroCuenta);
        if (planDeCuentasOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        PlanDeCuentas planDeCuentas = planDeCuentasOptional.get();
        return ResponseEntity.ok(planDeCuentas);
    }

    @CrossOrigin
    @PostMapping("/planDeCuentas/{rubro}")
    public List<PlanDeCuentas> buscarPlanDeCuentasPorRubro(@PathVariable String rubro) {
        // Recibo un email y una password desde el planDeCuentas, esa pass la encripto para ver si coincide con la guardada
        List<PlanDeCuentas> planDeCuentasOptional = planDeCuentasRepository.findByRubro(rubro);
        return planDeCuentasOptional;
    }

    @PutMapping("/planDeCuentas/{nroCuenta}")
    public ResponseEntity<PlanDeCuentas> updatePlanDeCuentas(@PathVariable String nroCuenta, @RequestBody PlanDeCuentas planDeCuentasDetails) {
        Optional<PlanDeCuentas> planDeCuentasOptional = planDeCuentasRepository.findByNroCuenta(nroCuenta);
        if (planDeCuentasOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        PlanDeCuentas planDeCuentas = planDeCuentasOptional.get();
        Class<?> planDeCuentasClass = planDeCuentas.getClass();
        Class<?> planDeCuentasDetailsClass = planDeCuentasDetails.getClass();

        for (Field field : planDeCuentasClass.getDeclaredFields()) {
            field.setAccessible(true);
            String fieldName = field.getName();
            try {
                Field planDeCuentasDetailsField = planDeCuentasDetailsClass.getDeclaredField(fieldName);
                planDeCuentasDetailsField.setAccessible(true);
                Object newValue = planDeCuentasDetailsField.get(planDeCuentasDetails);
                if (newValue != null && !newValue.equals(field.get(planDeCuentas))) {
                    field.set(planDeCuentas, newValue);
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                System.out.println("El error es " + e.getClass());
            }
        }
        PlanDeCuentas savedPlanDeCuentas = planDeCuentasRepository.save(planDeCuentas);
        return ResponseEntity.ok(savedPlanDeCuentas);
    }

    @DeleteMapping("/planDeCuentas/{nroCuenta}")
    public ResponseEntity<?> borrarPlanDeCuentas(@PathVariable String nroCuenta) {
        Optional<PlanDeCuentas> planDeCuentas = planDeCuentasRepository.findByNroCuenta(nroCuenta);
        if (!planDeCuentas.isPresent()) {
            return new ResponseEntity<>("No existe o ya ha sido borrado", HttpStatus.BAD_REQUEST);
        }
        planDeCuentasRepository.delete(planDeCuentas.get());
        return new ResponseEntity<>("Ha sido borrado correctamente", HttpStatus.ACCEPTED);
    }
}
