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
   Ruta `/products/:pid` la cual debe recibir por req.params el pid (product Id) y devolver sólo el producto solicitado, en lugar de todos los productos
2. En primer lugar ingresé el comando para configurar mi proyecto Node.js y luego instalé la dependencia express
3. Creé el archivo ".gitignore" para que la carpeta node_modules no se suba a mi repositorio en github
4. Creé la carpeta "src" en donde guardaré las carpetas y archivos principales de mi proyecto
5. Creé el archivo "app.js" dentro de src, en donde desarrollé el servidor express e importé el ProductManager
6. Modifiqué "ProductManager" para incluirle el export y luego poder importarlo en "app.js"
7. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000 <br>
   Ahora ejecuto de manera diferente porque en el package.json le asigné el nombre dev al comando que se va a utilizar para ejecutar al archivo "app.js":
   
   ```json
   "scripts": {
      "dev": "nodemon src/app.js"
   },
   ```



## Configuración inicial de un proyecto Node.js:

- Comando: `npm init --yes`
- Este comando inicializa un nuevo proyecto Node.js, creando un archivo package.json con configuraciones predeterminadas <br>
   En este package.json nosotros vamos a poder ver una descripción de este proyecto (incluyendo cosas como nombre, version de Node, etc.) el cual principalmente vamos a utilizar para ver nuestras dependencias instaladas <br>
   Cuando instalemos la primera dependencia (luego de haber utilizado npm init --yes), se va a agregar el archivo package-lock.json y la carpeta node_modules a nuestro proyecto. Esta carpeta es muy extensa y pesa mucho, es por eso que debemos crear un archivo ".gitignore" en donde escribiremos la carpeta o archivo que deseemos ignorar para que no se suba a nuestro repositorio en github <br>
- Importante: esto no es una dependencia, sino un comando para configurar Node.js y luego poder instalar dependencias



## Dependencias instaladas en este desafío:

1. **express**

   - Instalación: `npm install express`
   - Este comando instala Express, un marco web para Node.js. Facilita la creación de servidores, gestión de rutas y manipulación de solicitudes y respuestas, simplificando el desarrollo rápido y efectivo de aplicaciones web

2. **nodemon**

   - Instalación: `npm install nodemon -D`
   - Nodemon es una herramienta que detecta automáticamente cambios en los archivos sin necesidad de reiniciar el servidor. Esto significa que no hay que reiniciar manualmente el servidor ingresando npm run dev en la terminal cada vez que realice modificaciones en el código
   - Se recomienda instalarlo de manera local y no de manera global
      De manera global: significa que no debo instalarlo nuevamente en el package.json porque lo quiero utilizar en cualquier proyecto
      De manera local: significa que agrego esta dependencia al proyecto actual, limitando su uso solamente a este proyecto. Nodemon no necesariamente lo voy a usar en cualquier proyecto