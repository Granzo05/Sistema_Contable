### Requisitos

JDK de Java: 19

Visual Studio Code

Live Server(Extensión de Visual Studio)

MySQL Workbench o similar

### Código

Diagrama de Clases:

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
  - Al cargarse un asiento, se utiliza la misma [función](#cargadelmayor) para actualizar los valores en el mayor de esa cuenta.
  - La relación es únicamente con la clase Cuentas


Diagrama de Base de Datos:

  ![image](https://github.com/Granzo05/Sistema_Contable/assets/121827648/0086f911-5b6e-4634-87b5-8a8dd396be8b)


Controladores de la API:

AsientosController:

### Método: crearAsientos <a name="crearasientos"></a>

    @PostMapping("/asientos")
  - crearAsientos(@RequestBody AsientoDTO asientoDTO):
     1) Recibe un body con la fecha, un List<DetallesAsiento> con detalles del debe y un List<DetallesAsiento> con los detalles del haber.
     2) Parsea la fecha para almacenarla.
     3) Guarda el asiento.
     4) Recupera el asiento para obtener el ID que se le asignó a este en la base de datos.
     5) Se crea la List con los detalles del ID del asiento y el detalle de este para obtener la descripción de la cuenta para buscarla en la tabla 'cuentas'.
     6) [Carga el mayor](#cargadelmayor) con los valores de cada detalle y al finalizar carga por separado cada uno de los detalles con el ID del asiento, el ID de la cuenta, los valores que interviene en esa cuenta (Debe o Haber).

### Método: cargaDelMayor <a name="cargadelmayor"></a>

  - cargaDelMayor(List<DetalleAsiento> detallesAsiento):
     1) Recibe todos los detalles del asiento, tanto los del debe como los del haber. Además de la cuenta asociada a cada detalle.
     2) Busca si esa cuenta ya tiene un mayor, en caso de tenerlo lo actualiza y en caso de ser nulo crea un nuevo mayor y lo asocia a esa cuenta.
     3) Verifica que detalle es el que está recorriendo el for, para ello busca el tipo que solo puede ser 'DEBE' o 'HABER'.
     4) Calcula el saldo, trayendo el guardado y sumándole el nuevo.
     6) Guarda el mayor.
     7) Guarda el detalle, al recorrer un for por todos los detalles nos aseguramos que todo esto se realice por cada una de las cuentas involucradas.

### Método: buscarAsientoPorNumeroCuentaYFecha <a name="buscarasientopornumerocuentayfecha"></a>

    @GetMapping("/asientos/busqueda/")
  - buscarAsientoPorNumeroCuentaYFecha(@RequestParam("fecha") String fecha,@RequestParam("nroCuenta") String nroCuenta):
     1) Recibe como parámetros la fecha y la cuenta a buscar.
     2) Separa la fecha por día, mes y año con un split, esta fecha viene con un formato (yyyy-mm-dd).
     3) Si el dia tiene un sólo dígito quiere decir que es entre el día 1 y 9 del mes, pero al utilizar DATE en la base de datos la almacena como 01 por ejemplo, por lo tanto debemos concatenarte un 0 adelante del parámetro recibido.
     4) Busca la cuenta mediante el número recibido como parámetro.
     5) Buscamos todos los detalles en la base de datos que involucren el ID de la cuenta.
     6) Recorremos cada uno y guardamos únicamente los que coincidan con la fecha buscada.
     7) Devolvemos esta lista hacia el cliente.

### Método: buscarAsientoPorNumeroAsiento <a name="buscarasientopornumeroasiento"></a>

    @GetMapping("/asientos/nroAsiento/{nroAsiento}")
  - buscarAsientoPorNumeroAsiento(@PathVariable("nroAsiento") Long nroAsiento):
     1) Recibe como parámetro el número de asiento, el cual manejamos como ID dentro de la tabla asientos.
     2) Buscamos los detalles asientos que contengan el asiento_id que recibimos.
     3) Formateamos la fecha de yyyy-mm-dd a dd/mm/yyyy.
     4) Devolvemos el detalle del asiento.

 ### Método: cargarDetallesAsiento <a name="cargardetallesasiento"></a>
 
  - cargarDetallesAsiento(String tipoCuenta, DetalleAsiento detalle, Asientos asiento):
     1) Recibe como parámetro el asiento, los detalles de la cuenta y el tipo de cuenta(Debe o Haber).
     2) Buscamos la cuenta que tiene asociada ese detalle.
     3) Creamos el detalle completo con el tipo de la cuenta, la cuenta específica, el valor que posee y el asiento al que está asociada.
     4) Con estos detalles podemos cargar a futuro el mayor y finalmente cargar estos datos en la base de datos
 

CuentasController:

### Método: crearCuenta <a name="crearcuenta"></a>
    @PostMapping("/cuenta")
  - crearCuenta(@RequestBody Cuentas cuentasDetails):
     1) Recibe el numero de cuenta, la descripción y el rubro de la cuenta.
     2) Busca si existe una en la base de datos.
     3) Si ya existe una devuelve un error, si no existe la carga a la base de datos.

### Método: buscarPlanDeCuentasPorNroCuenta <a name="buscarplandecuentaspornrocuenta"></a>

    @GetMapping("/cuenta/nro_cuenta/{nroCuenta}")
  - buscarPlanDeCuentasPorNroCuenta(@PathVariable String nroCuenta):
     1) Recibe el numero de cuenta.
     2) Devuelve todas las cuentas que sean similares a ese nroCuenta utilizando un LIKE %nro%.
     3) Se usa para cargar dinámicamente la tabla a mostrar cuando el usuario comienza a escribir un número de cuenta para ir filtrando los resultados.

### Método: findByNroCuentaEqualsLimit <a name="findbynrocuentaequalslimit"></a>

    @GetMapping("/asientos/cuenta/nro_cuenta/{nroCuenta}")
  - findByNroCuentaEqualsLimit(@PathVariable String nroCuenta):
     1) Recibe el numero de cuenta.
     2) Devuelve todas las cuentas que sean similares a ese nroCuenta utilizando un LIKE %nro% pero con un máximo de 50 resultados.

### Método: buscarPlanDeCuentasPorDescripcion <a name="buscarplandecuentaspordescripcion"></a>

    @GetMapping("/cuenta/descripcion/{descripcion}")
  - buscarPlanDeCuentasPorDescripcion(@PathVariable String descripcion):
     1) Recibe la descripción de la cuenta.
     2) Devuelve todas las cuentas que sean similares a esa descripcion utilizando un LIKE %descripcion%.
     3) Se usa para cargar dinámicamente la tabla a mostrar cuando el usuario comienza a escribir una descripción para ir filtrando los resultados.

### Método: buscarPlanDeCuentasPorRubro <a name="buscarplandecuentasporrubro"></a>

    @GetMapping("/cuenta/{rubro}")
  - buscarPlanDeCuentasPorRubro(@PathVariable String rubro):
     1) Recibe el rubro.
     2) Devuelve todas las cuentas que posean ese rubro.
     3) Esto se utiliza al cambiar el select del lado del cliente, en el cual va a devolver todas las cuentas que pertenezcan a un rubro en específico.

### Método: updatePlanDeCuentas <a name="updateplandecuentas"></a>
 
    @PutMapping("/cuenta/{nroCuenta}/update")
  - updatePlanDeCuentas(@PathVariable String nroCuenta, @RequestBody Map<String, String> requestData):
     1) Recibe el número de cuenta, y si es posible la descripción o el rubro, al ser opcional se usa un Map.
     2) Busca por el número de cuenta.
     3) Si no encuentra una cuenta entonces la busca por la descripción, esto puede servir cuando a una cuenta se le quiere cambiar el número.
        
### Método: borrarPlanDeCuentas <a name="borrarplandecuentas"></a>

    @DeleteMapping("/cuenta/{nroCuenta}/delete")
  - borrarPlanDeCuentas(@PathVariable String nroCuenta):
     1) Recibe el número de cuenta.
     2) Busca la cuenta asociada y en caso de existir la borra.
   
MayorController:

### Método: buscarMayor <a name="buscarmayor"></a>

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

  HTML
  
  ### main.html
      Es el que provee de navegabilidad a toda la aplicación. Se vuelve a este presionando en el label de 'Contabilidad'.
    
  ### cuentas.html
      Posee un sistema CRUD para poder manejar la información del plan de cuentas, a su vez en los inputs posee una funcionabilidad en la que al escribir se autocompleta con posibles resultados. 
      En el espacio de BUSCAR la tabla se actualiza dinámicamente al escribir sobre el input de número de cuenta o de la descripción.
    
  ### asientos.html  
      Permite la carga de asientos brindando la fecha, una cuenta del debe y otra del haber obligatoriamente que se cancelen entre si en los valores. A su vez, permite añadir nuevos campos de ser necesario para cargar mas cuentas al asiento.
      A la hora de buscar se puede hacer de dos maneras:
        - Sabiendo el número de asiento, el cual está compuesto por el ID de la tabla asientos en la base de datos. Al ingresar el ID va a recuperar todo el asiento completo con la fecha, las cuentas involucradas y los valores de cada una.
        - Sin saber el número de asiento pero sabiendo la fecha se puede buscar por el número de cuenta y la fecha específica, con la cual va a traer todos los asientos del dia que contengan solo esa cuenta y el ID de cada asiento. Con el cual, de ser     
          necesario, se puede buscar con ese ID todo el asiento completo para verlo más en detalle. Ya que solo buscando de esta forma, el asiento que se va a ver es parcial, solo es visible la cuenta y el valor de esta pero no el asiento completo.
    
  ### mayor.html  
      Permite la busqueda del valor de una cuenta específica en un determinado mes de un año, esta trae los datos de la cuenta, los valores del debe y haber y su saldo en ese período.

  JAVASCRIPT    
  
  ### scriptCuenta.js
  
    En el inicio del archivo se contienen los mensajes que se van a mostrar dependiendo del resultado de lo que realice el usuario en la aplicación.

  - función buscarCuentasPorRubro(): esta interactúa con el SELECT ya que al cambiar la opción trae de la base de datos todas las cuentas que pertenezcan a cada rubro(Activo, pasivo, patrimonio neto, ingreso o egreso), más que nada para no mostrar una tabla tan amplia, filtrando por cada rubro. [Accede a esta ruta de la API](#buscarplandecuentasporrubro) y [completa la lista de resultados con esta función](#llenardatalist). 
  - función buscarCuentaEliminar(): esta da el posible resultado a ingresar cuando se comienza a escribir el número de la cuenta a eliminar, realizando un SELECT a la base de datos con un límite de resultados para no generar una lista tan extensa. [Accede a esta ruta de la API](#findbynrocuentaequalslimit). 
  - función buscarCuentaModificar(): mismo funcionamiento que el anterior, pero al acceder a otros elementos HTML preferí dejarlos por separados para no agregar varios condicionales dependiendo del elemento que quiero buscar, me parece que permite entender       el código de forma más sencilla, y son pocas líneas que podría ahorrar. [Accede a esta ruta de la API](#findbynrocuentaequalslimit). 
  - función llenarDataList(): esta recibe las cuentas desde la API y rellena la lista de posibles resultados a ingresar en el input. <a name="llenardatalist"></a>
  - función buscarCuentasPorNroCuenta(): esta solo interactúa para filtrar dinámicamente la tabla a medida que el usuario ingresa un número de cuenta en el input 'numeroCuentaBuscar' a buscar para ir reduciendo la búsqueda a medida que escribe.
  - función buscarCuentasPorDescripcion(): exactamente igual que el anterior pero interactuando con el elemento html de la descripción de la cuenta en el input 'descripcionBuscar'.
  - función AñadirCuenta(): recupera el rubro 'rubroAñadir', el número de cuenta 'numeroCuentaAñadir' y la descripción 'descripcionAñadir', verifica que no estén vacíos y luego los envía a la API. [Accede a esta ruta de la API](#crearcuenta).
  - función actualizarCuenta(): recupera el rubro 'rubroModificar', el número de cuenta 'numeroCuentaModificar' y la descripción 'descripcionModificar', verifica que no estén vacíos y luego los envía a la API para actualizar los datos de la cuenta. [Accede a     esta ruta de la API](#updateplandecuentas).
  - función eliminarCuenta(): recupera el número de cuenta 'numeroCuentaModificar' verifica que no esté vacío y luego los envía a la API para eliminar la cuenta. [Accede a esta ruta de la API](#borrarplandecuentas).
  - función verificarRubroYNroCuenta(): verifica que el primer dígito del número de cuenta sea igual al del asignado en el principio del archivo al rubro, de forma predeterminada es Activo = 1, Pasivo = 2, PN = 3, Ingreso = 4 y Egreso = 5, si el número de        cuenta en un rubro, por ejemplo, 'Activo' no comienza con '1' lanza un error.
  - función cargarTabla(): accede a la tabla 'tablaCuentas' y va creando dinámicamente una fila y columna por cada dato recuperado desde la API, esta se encarga de mostrar todas las cuentas de un rubro.
  - función limpiarCampos(): deja todos los inputs vacíos después de alguna carga de datos en la aplicación. [Trabaja en conjunto con este script](#scriptlimpiarcampos).
  // Navegabilidad: escucha a cada botón (Añadir, buscar, modificar y eliminar) que al hacerle click muestra solo los elementos asignados a ese botón y oculta el resto.

  ### scriptAsientos.js

    En el inicio del archivo se contienen los mensajes que se van a mostrar dependiendo del resultado de lo que realice el usuario en la aplicación.

  - función buscarAsiento(): obtiene los datos del número de asiento 'numeroAsientoBuscar', del número de la cuenta 'numeroCuentaBuscarAsiento' y de la fecha 'fechaAsientoBuscar', valida la opción de que el usuario ingrese solo el número de asiento o el          número de cuenta y la fecha para buscar por esas dos opciones:
  -  función busquedaPorCuentaYfecha(): si el usuario ingresó estos dos datos y dejó en blanco el número de asiento, entonces a la API se va a enviar una Query con estos dos datos para devolver el o los asientos que involucren a esa cuenta ese día dado.          [Accede a esta ruta de la API](#buscarasientopornumerocuentayfecha). 
  -  función busquedaPorAsiento(): si el usuario solo ingresa el número de asiento se envía este hacia la API el cual devuelve ese asiento específico con todos los datos. [Accede a esta ruta de la API](#buscarasientopornumeroasiento).
  - función cargarAsiento(): obtiene la fecha y cada una de las cuentas y sus respectivos valores, para ello verifica que exista una cuenta en ambos lados y que se cancelen entre si. [Accede a esta ruta de la API](#crearasientos).
  - función buscarCuentasPorNroCuenta(): actúa como una vista previa de los posibles resultados a ingresar en la cuenta, trayendo todos las cuentas similares a ese número ingresado. [Accede a esta ruta de la API](#findbynrocuentaequalslimit).
  - función agregarInputsAsientoHaber() y agregarInputsAsientoDebe(): busca el div que contiene la cuenta y genera un nuevo input tanto para la cuenta como para el valor dependiendo el que se quiera añadir.
  - función agregarInputsAsientos(): usando ambas funciones del punto anterior, agrega los 4 inputs respectivos (Cuenta debe, valor debe, cuenta haber y valor haber).

  ### scriptMayor.js

  En el inicio del archivo se contienen los mensajes que se van a mostrar dependiendo del resultado de lo que realice el usuario en la aplicación.

  - función buscarMayor(): obtiene el número de cuenta, el mes y el año para validarlos y luego enviarlos hacia la API como una query ya que al ser una solicitud GET no hay otra opción para enviar los datos. [Accede a esta ruta de la API](#buscarmayor).
  - función buscarCuentasPorNroCuenta(): genera la lista con posibles resultados al ingresar el número de cuenta. [Accede a esta ruta de la API](#findbynrocuentaequalslimit).

  ### scriptModal.js

  Es el encargado de mostrar los mensajes de error o de éxito.

  - función abrirModalResultadoMayor(): obtiene todos los datos del mayor de la cuenta y muestra el año, el mes parseado de número a mes y los demás datos del saldo. [Depende de esta función](#buscarmayor).
  - función crearModalAsiento(): obtiene todos los datos del asiento, ya sea del obtenido por el número de la cuenta y fecha o por el de número de asiento, muestra la fecha, el número de asiento, la o las cuentas que intervengan con sus respectivos valores. [Depende de esta función](#buscarasiento).
    
Lista de endpoints:



