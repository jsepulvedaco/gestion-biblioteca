# Aplicación para la gestión de libros en Node.js, Express.js y Angular.

## Utiliza el sistema de archivos para guardar el inventario de libros en un archivo json en lugar de base de datos.

Esta sencilla aplicación permite hacer un inventario y llevar un registro de los libros prestados a cada uno de los usuarios registrados.

En lugar de base de datos, se usa el módulo del sistema de archivos de Node.js para persistir los registros.
Las rutas del API son creadas con Express.js. El front-end funciona con Angular 2+.

### Instalación

Después de clonar el repositorio y haber descargado e instalado [Node.js](https://nodejs.org/es/) hay que ir al directorio **/Server** desde la terminal y ejecutar el comando `npm install`. Para correr el servidor, hay que ejecutar el comando 
`node app.js` Desde este mismo directorio. El servidor va a estar escuchando las peticiones en el puerto 8080. Para acceder a este, 
hay que ir a la URL [http://localhost:8080/](http://localhost:8080/) en el navegador 

Cuando ya esté todo instalado, hay que ir un directorio mas arriba (**../Angular**) y desde ahí a **/Interfaz**. Allí hay que 
hacer de nuevo `npm install` para instalar los módulos y dependencias que Angular requiere. Para correr Angular, hay que ejecutar
en la terminal `ng serve` (pues el proyecto fue desarrollado originalmente con Angular CLI). Para poder hacer esto, hay que
installar la consola de angular por medio del comando `npm install -g @angular/cli`. Angular va a estar corriendo en la siguiente dirección [http://localhost:4200/](http://localhost:4200/).

El front-end de la aplicación está basado en el código del siguiente repo [https://github.com/DeborahK/Angular-GettingStarted](Angular-GettingStarted)
