Requisitos:

JDK de Java: 19
Instrucciones de instalación y configuración.

Diagrama de Clases \n:

  ![image](https://github.com/Granzo05/Sistema_Contable/assets/121827648/dd558645-4bd6-46d4-bb83-bb77d64f15a4)


Explicación de clases de la API:

Asientos: 
  - Al cargar un asiento se crea un nuevo asiento el cual solo contiene el id y la fecha para poder filtrarlo de una forma más rápida al buscar por un dia específico.
    
DetalleAsiento:
  - Para una mejor estructura y entendimiento de tablas se crea un detalle del asiento por cada cuenta utilizada, es decir que si el asiento ID:1 tiene dos cuentas por el debe y una cuenta por el haber, van a crearse tres detalles del asiento con ID:1 con los respectivos valores númericos a debitar o acreditar.
  - La relación con la clase Asientos es de muchos a uno, ya que un Asiento va a tener obligatoriamente 2 o más detalles por carga.      

Cuentas:
  - Encargada de administrar, con funcionabilidad CRUD, las cuentas de la empresa.
  - La relación con la clase 'Mayor' es UNO a UNO ya que una cuenta solo puede tener un mayor el cual va variando los valores mediante los asientos que se asocian con esa cuenta.
  - La relación con la clase 'DetalleAsiento' es UNO a MUCHOS ya que una sola cuenta puede existir en diversos detalles, pero a la hora de almacenar un detalle este solo se puede realizar por una única cuenta.

Mayor:
  - Al cargarse un asiento, se utiliza la misma [función](#cargaDelMayor) para actualizar los valores en el mayor de esa cuenta.
  - La relación es únicamente con la clase Cuentas


Diagrama de Base de Datos:
![image](https://github.com/Granzo05/Sistema_Contable/assets/121827648/0086f911-5b6e-4634-87b5-8a8dd396be8b)


Controladores de la API:

AsientosController:
    @PostMapping("/asientos")
  - crearAsientos(@RequestBody AsientoDTO asientoDTO):
     1) Recibe un body con la fecha, un List<DetallesAsiento> con detalles del debe y un List<DetallesAsiento> con los detalles del haber.
     2) Parsea la fecha para almacenarla.
     3) Guarda el asiento.
     4) Recupera el asiento para obtener el ID que se le asignó a este en la base de datos.
     5) Se crea la List con los detalles del ID del asiento y el detalle de este para obtener la descripción de la cuenta para buscarla en la tabla 'cuentas'.
     6) [Carga el mayor](#cargaDelMayor) con los valores de cada detalle y al finalizar carga por separado cada uno de los detalles con el ID del asiento, el ID de la cuenta, los valores que interviene en esa cuenta (Debe o Haber).

  - cargaDelMayor(List<DetalleAsiento> detallesAsiento):
     1) Recibe todos los detalles del asiento, tanto los del debe como los del haber. Además de la cuenta asociada a cada detalle.
     2) Busca si esa cuenta ya tiene un mayor, en caso de tenerlo lo actualiza y en caso de ser nulo crea un nuevo mayor y lo asocia a esa cuenta.
     3) Verifica que detalle es el que está recorriendo el for, para ello busca el tipo que solo puede ser 'DEBE' o 'HABER'.
     4) Calcula el saldo, trayendo el guardado y sumándole el nuevo.
     6) Guarda el mayor.
     7) Guarda el detalle, al recorrer un for por todos los detalles nos aseguramos que todo esto se realice por cada una de las cuentas involucradas.

    @GetMapping("/asientos/busqueda/")
  - buscarAsientoPorNumeroCuentaYFecha(@RequestParam("fecha") String fecha,@RequestParam("nroCuenta") String nroCuenta):
     1) Recibe como parámetros la fecha y la cuenta a buscar.
     2) Separa la fecha por día, mes y año con un split, esta fecha viene con un formato (yyyy-mm-dd).
     3) Si el dia tiene un sólo dígito quiere decir que es entre el día 1 y 9 del mes, pero al utilizar DATE en la base de datos la almacena como 01 por ejemplo, por lo tanto debemos concatenarte un 0 adelante del parámetro recibido.
     4) Busca la cuenta mediante el número recibido como parámetro.
     5) Buscamos todos los detalles en la base de datos que involucren el ID de la cuenta.
     6) Recorremos cada uno y guardamos únicamente los que coincidan con la fecha buscada.
     7) Devolvemos esta lista hacia el cliente.

    @GetMapping("/asientos/nroAsiento/{nroAsiento}")
  - buscarAsientoPorNumeroAsiento(@PathVariable("nroAsiento") Long nroAsiento):
     1) Recibe como parámetro el número de asiento, el cual manejamos como ID dentro de la tabla asientos.
     2) Buscamos los detalles asientos que contengan el asiento_id que recibimos.
     3) Formateamos la fecha de yyyy-mm-dd a dd/mm/yyyy.
     4) Devolvemos el detalle del asiento.
 
  - cargarDetallesAsiento(String tipoCuenta, DetalleAsiento detalle, Asientos asiento):
     1) Recibe como parámetro el asiento, los detalles de la cuenta y el tipo de cuenta(Debe o Haber).
     2) Buscamos la cuenta que tiene asociada ese detalle.
     3) Creamos el detalle completo con el tipo de la cuenta, la cuenta específica, el valor que posee y el asiento al que está asociada.
     4) Con estos detalles podemos cargar a futuro el mayor y finalmente cargar estos datos en la base de datos
 

CuentasController:
    @PostMapping("/cuenta")
  - crearCuenta(@RequestBody Cuentas cuentasDetails):
     1) Recibe el numero de cuenta, la descripción y el rubro de la cuenta.
     2) Busca si existe una en la base de datos.
     3) Si ya existe una devuelve un error, si no existe la carga a la base de datos.

    @GetMapping("/cuenta/nro_cuenta/{nroCuenta}")
  - buscarPlanDeCuentasPorNroCuenta(@PathVariable String nroCuenta):
     1) Recibe el numero de cuenta.
     2) Devuelve todas las cuentas que sean similares a ese nroCuenta utilizando un LIKE %nro%.
     3) Se usa para cargar dinámicamente la tabla a mostrar cuando el usuario comienza a escribir un número de cuenta para ir filtrando los resultados.

    @GetMapping("/asientos/cuenta/nro_cuenta/{nroCuenta}")
  - findByNroCuentaEqualsLimit(@PathVariable String nroCuenta):
     1) Recibe el numero de cuenta.
     2) Devuelve todas las cuentas que sean similares a ese nroCuenta utilizando un LIKE %nro% pero con un máximo de 50 resultados.

    @GetMapping("/cuenta/descripcion/{descripcion}")
  - buscarPlanDeCuentasPorDescripcion(@PathVariable String descripcion):
     1) Recibe la descripción de la cuenta.
     2) Devuelve todas las cuentas que sean similares a esa descripcion utilizando un LIKE %descripcion%.
     3) Se usa para cargar dinámicamente la tabla a mostrar cuando el usuario comienza a escribir una descripción para ir filtrando los resultados.

    @GetMapping("/cuenta/{rubro}")
  - buscarPlanDeCuentasPorRubro(@PathVariable String rubro):
     1) Recibe el rubro.
     2) Devuelve todas las cuentas que posean ese rubro.
     3) Esto se utiliza al cambiar el select del lado del cliente, en el cual va a devolver todas las cuentas que pertenezcan a un rubro en específico.
        
    @PutMapping("/cuenta/{nroCuenta}/update")
  - updatePlanDeCuentas(@PathVariable String nroCuenta, @RequestBody Map<String, String> requestData):
     1) Recibe el número de cuenta, y si es posible la descripción o el rubro, al ser opcional se usa un Map.
     2) Busca por el número de cuenta.
     3) Si no encuentra una cuenta entonces la busca por la descripción, esto puede servir cuando a una cuenta se le quiere cambiar el número.

    @DeleteMapping("/cuenta/{nroCuenta}/delete")
  - borrarPlanDeCuentas(@PathVariable String nroCuenta):
     1) Recibe el número de cuenta.
     2) Busca la cuenta asociada y en caso de existir la borra.
   
CuentasController:
    @GetMapping("/mayor/")
  - buscarMayor(@RequestParam("nroCuenta") String nroCuenta, @RequestParam("mes") int mes, @RequestParam("año") int anio):
     1) Recibe el numero de cuenta, un mes y un año.
     2) Crea un LocalDate para el mes buscado y el siguiente, para solo contener esos días.
     3) Utilizando un BETWEEN trae todos los ID de los asientos contenidos entre esas fechas.
     4) Busca la cuenta que se recibió como parámetro.
     5) Itera en cada ID y trae todos los detalles que contengan esos ID's obtenidos en el punto 3.
     6) Crea un nuevo mayor que es el que se va a enviar al finalizar.
     7) De todos los detalles se busca aquellos que compartan el ID de la cuenta obtenida en el punto 4.
     8) Se cargan los valores en el mayor de todos los tipos de detalle asociados a esa cuenta.
     9) Una vez calculados se obtiene el saldo final, el cual se asigna a ese mayor a devolver.
     10) Se envía el Mayor al cliente para mostrar los resultados de la cuenta en ese mes específico con los valores del debe y el haber.
   

Descripción del cliente web:

Lista de endpoints:



