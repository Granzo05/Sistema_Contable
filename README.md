# Sistema contable

Proyecto que simula un sistema contable básico donde se puede interactuar con un plan de cuentas mediante un sistema CRUD, mediante estas cuentas se pueden cargar asientos que van a ser almacenados por día y van a estar detallados. Una vez cargado el asiento se puede acceder al libro mayor de cada cuenta para verificar cual es el estado de la cuenta en un mes y año específico.

- [Uso](#uso)
- [Tecnologías](#tecnologías)
- [Documentación](documentación.md)
## Tecnologías
    - HTML
    - CSS
    - JS
    - JAVA
    - SPRING

## Uso

1) Descargar .zip del proyecto.
2) Descomprimir el archivo descargado.
3) Abrir con tu IDE preferido para java, en mi caso es Intellij.
4) Navegar hasta src\main\resources\application.properties
   - Reemplazar "puerto" por el puerto que uses para MySQL (spring.datasource.url=jdbc:mysql://localhost:"puerto"/contabilidad), normalmente es el 3306.
   - Colocar tu usuario y contraseña
5) Abrir el archivo "Query SQL" que se encuentra en la carpeta del proyecto y ejecutarlo con tu programa de manejo de base de datos, en mi caso es Workbench. Esto creará la base de datos y cargará un plan de cuentas resumido para que puedas probar que se accede a la base de datos correctamente más adelante.
6) Navegar a src\main\java\com\example\contabilidad\main y ejecutarlo, esto va a encargarse de crear las tablas necesarias para el proyecto.
7) Abrir la carpeta que extrajiste al principio (Sistema_Contable-main) con Visual Studio Code (Es necesario que tengas la extensión de Live Server).
8) Navegar a public\html\main.html y hacerle click derecho, seleccionar donde dice "Open with Live Server".

Listo, ahora podes navegar por las diferentes páginas e interactuar con los datos.


