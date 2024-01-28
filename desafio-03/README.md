## Comentarios:

1. Desafío "Servidor con express": <br>
   En este trabajo debemos desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos <br>
   Se debe utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos <br>
   Debemos crear un archivo "app.js" en donde desarrollemos a este servidor express, y también debemos importarle al archivo de ProductManager que actualmente tenemos <br>
   El servidor debe contar con los siguientes endpoints o rutas: <br>
   Ruta `/products` la cual debe leer el archivo de productos y devolverlos dentro de un objeto <br>
   Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados <br>
   Si no se recibe query de límite, se devolverán todos los productos <br>
   Si se recibe un límite, sólo devolver el número de productos solicitados <br>
   Ruta `/products/:pid` la cual debe recibir por req.params el pid (product Id) y devolver sólo el producto solicitado, en lugar de todos los productos <br>
5. Debo ejecutar `node ProductManager.js` en la terminal para poder ver el resultado del código creado <br>
   En este desafío, el archivo "productos.json" actúa como si fuera una base de datos



## Configuración inicial de un proyecto Node.js:

- Comando: `npm init --yes`
- Este comando inicializa un nuevo proyecto Node.js, creando un archivo package.json con configuraciones predeterminadas <br>
   En este package.json nosotros vamos a poder ver una descripción de este proyecto (incluyendo cosas como nombre, version de Node, etc.) el cual principalmente vamos a utilizar para ver nuestras dependencias instaladas <br>
   Cuando instalemos la primera dependencia (luego de haber utilizado npm init --yes), se va a agregar la carpeta node_modules a nuestro proyecto. Esta carpeta es muy extensa y pesa mucho, es por eso que debemos crear un archivo ".gitignore" en donde escribiremos la carpeta o archivo que deseemos ignorar para que no se suba a nuestro repositorio en github <br>
- Importante: esto no es una dependencia, sino un comando para configurar Node.js y luego poder instalar dependencias



## Dependencias instaladas en este desafío:

1. **express**
   - Instalación: `npm install express`
   - Este comando instala Express, un marco web para Node.js. Facilita la creación de servidores, gestión de rutas y manipulación de solicitudes y respuestas, simplificando el desarrollo rápido y efectivo de aplicaciones web