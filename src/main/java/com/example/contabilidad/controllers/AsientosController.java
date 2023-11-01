package com.example.contabilidad.controllers;

import com.example.contabilidad.entities.*;
import com.example.contabilidad.repositories.AsientosRepository;
import com.example.contabilidad.repositories.CuentasRepository;
import com.example.contabilidad.repositories.DetalleAsientoRepository;
import com.example.contabilidad.repositories.MayorRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class AsientosController {
    private final AsientosRepository asientosRepository;
    private final MayorRepository mayorRepository;
    private final CuentasRepository cuentasRepository;
    private final DetalleAsientoRepository detalleAsientoRepository;

    public AsientosController(AsientosRepository asientosRepository,
                              MayorRepository mayorRepository,
                              CuentasRepository cuentasRepository,
                              DetalleAsientoRepository detalleAsientoRepository) {
        this.asientosRepository = asientosRepository;
        this.mayorRepository = mayorRepository;
        this.cuentasRepository = cuentasRepository;
        this.detalleAsientoRepository = detalleAsientoRepository;
    }

    @Transactional
    @PostMapping("/asientos")
    public ResponseEntity<String> crearAsientos(@RequestBody AsientoDTO asientoDTO) {
        // Inicializo un nuevo asiento
        Asientos asiento = new Asientos();
        // Formateo la fecha
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = null;
        try {
            date = sdf.parse(asientoDTO.getFechaRegistro());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        // Asigno la fecha
        asiento.setFechaRegistro(date);

        // Almaceno todos los detalles que se recibieron desde el cliente
        List<DetalleAsiento> detalleAsiento = new ArrayList<>();

        // Se encarga de buscar todos los detalles que se enviaron desde el cliente para acomodarlos y agregarle el objeto cuenta asociado a la descripcion que trae del cliente.
        for (DetalleAsiento detalle : asientoDTO.getDetallesDebe()) {
            detalleAsiento.add(cargarDetallesAsiento("DEBE", detalle, asiento));
        }

        for (DetalleAsiento detalle : asientoDTO.getDetallesHaber()) {
            detalleAsiento.add(cargarDetallesAsiento("HABER", detalle, asiento));
        }

        // Relaciono el detalle_id al asiento
        asiento.setDetallesAsiento(detalleAsiento);
        // Asentamos el asiento
        asientosRepository.save(asiento);

        // Actualizamos los mayores obteniendo los detalles que acaban de ser cargados al asiento
        List<DetalleAsiento> detallesAsiento = asiento.getDetallesAsiento();

        // Aca creamos el mayor de la cuenta cargada en caso de que no haya un mayor existente, actualizamos el debe y haber de la cuenta y controlamos el saldo actual
        cargaDelMayor(detallesAsiento);

        return new ResponseEntity<>("El asiento ha sido añadido correctamente", HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/asientos/{nroAsientos}")
    public List<DetalleAsiento> buscarAsiento(@PathVariable("nroAsientos") Long nroAsiento) {
        // Esto es para buscar por fecha y nro de asiento, pero como uso el nro_asiento como id, no necesitaria la fecha pero la dejo por las dudas
        /*
        String[] fechaFinal = fecha.split("/");
        int dia = Integer.valueOf(fechaFinal[0]);
        int mes = Integer.valueOf(fechaFinal[1]);
        int año = Integer.valueOf(fechaFinal[2]);

        LocalDate fechaFormateada = LocalDate.of(año, mes, dia);
        */

        return detalleAsientoRepository.findByAsientoId(nroAsiento);
    }

    private void cargaDelMayor(List<DetalleAsiento> detallesAsiento) {
        for (DetalleAsiento detalle : detallesAsiento) {
            // Buscamos el mayor en la db
            Mayor mayor = mayorRepository.findByDescripcionCuenta(detalle.getCuenta().getDescripcion());
            // Si no existe, lo cual puede pasar al ser el primer mayor de una cuenta, lo creamos.
            if (mayor == null) {
                mayor = new Mayor();
                // Asignamos la cuenta que va a tener asociada
                mayor.setCuenta(detalle.getCuenta());
            }
            // Asignamos el valor que se haya registrado en el cliente sobre el mayor de cada una de las cuentas
            if (detalle.getTipo().equals("DEBE")) {
                mayor.setDebe(mayor.getDebe() + detalle.getValor());
            } else if (detalle.getTipo().equals("HABER")) {
                mayor.setHaber(mayor.getHaber() + detalle.getValor());
            }

            // Al final actualizamos el saldo actual del mayor
            if (mayor.getDebe() > mayor.getHaber()) {
                mayor.setSaldo("Deudor");
            } else if (mayor.getDebe() < mayor.getHaber()) {
                mayor.setSaldo("Acreedor");
            } else {
                mayor.setSaldo("Saldado");
            }
            // Por ultimo le asignamos el asiento
            // Cargamos el mayor en la db
            mayorRepository.save(mayor);

            // Cargamos los detalles del asiento asignado, ya que el asiento tiene un solo detalle asignado, pero el detalle puede ser 1 o muchos, ya que si o si de entrada
            // Va a tener 2 cuentas asociadas, una al haber y otra al debe, pero pueden haber 3 cuentas en el haber para igualar una del debe. Por lo tanto un solo asiento tiene muchos detalles
            detalleAsientoRepository.save(detalle);
        }
    }

    private DetalleAsiento cargarDetallesAsiento(String tipoCuenta, DetalleAsiento detalle, Asientos asiento) {

        // Busco la cuenta en el plan de cuentas, la que por ahora va a ser nula mientras no existan cuentas
        Cuentas cuenta = cuentasRepository.findByDescripcion(detalle.getDescripcion());
        // Almaceno cada uno de los detalles del lado del debe para luego almacenarlos en el array que se le asigna al asiento
        DetalleAsiento detalleFinal = new DetalleAsiento();
        detalleFinal.setTipo(tipoCuenta);
        detalleFinal.setCuenta(cuenta);
        detalleFinal.setValor(detalle.getValor());
        detalleFinal.setAsiento(asiento);

        return detalleFinal;
    }
}
