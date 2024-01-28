## Comentarios:

1. Desafío "Websockets + Handlebars": <br>
   En este trabajo debemos configurar nuestro proyecto para que trabaje con Websockets y Handlebars <br>
   Debemos configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de Socket.io al mismo <br>
   Debemos crear una vista "home.handlebars" la cual contenga una lista de todos los productos agregados hasta el momento <br>
   Además, crear una vista "realTimeProducts.handlebars" la cual vivirá en el endpoint "/realtimeproducts" en nuestro views router, esta contendrá la misma lista de productos que la vista anterior, pero debe trabajar con websockets <br>
   Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista <br>
   Ya que la conexión entre una consulta http y websocket no está contemplada dentro de la clase, se recomienda que para la creación y eliminación de un producto, se cree un formulario simple en la vista "realTimeProducts.handlebars" para que el contenido se envíe desde websockets y no http. Si esto se desea hacer con http, hay que buscar la forma de utilizar el servidor de Sockets dentro de la petición POST, es decir, utilizar un socket.emit dentro del POST
2. Creé el archivo "path.js" y lo importo en app.js <br>
   Sirve para que todos puedan ver el trabajo sin importar si la otra persona utiliza Windows, Linux o Mac
3. Creé la carpeta "views" la cual dividiré en 2 subcarpetas: layouts y partials. Las divido así ya que es la estructura convencional para trabajar con Handlebars <br>
   En esta carpeta crearemos las vistas hechas con Handlebars que veremos en nuestro navegador, tanto home como realTimeProducts
4. Modifiqué "app.js" para agregar los endpoints solicitados por la consigna: "/home" y "/realtimeproducts" <br>
   También agregué otro endpoint "/upload" que no es pedido por la consigna, pero lo creamos para ir practicando cómo utilizar Multer <br>
   Estas primeras 2 rutas se van a poder ver desde el navegador, pero la ruta para utilizar con Multer no porque esta utiliza el método POST y solamente se pueden ver las rutas que utilicen GET <br>
   Por último, en este mismo archivo configuré Socket.io para poder utilizarlo en los archivos JS de mis vistas
5. Modifiqué "public" y la dividí en las subcarpetas css, img y js
6. Carpetas creadas que no son pedidas por la consigna del desafío: <br>
   Creamos estas carpetas con el fin de ir conociendo cómo se suele dividir un proyecto backend conectado a una base de datos <br>
   `controllers`: son los controladores de mi código. Va a hacer una conexión entre mi base de datos, o mi modelo en este caso, y mis rutas <br>
   `helpers`: la definición es variada <br>
   Pueden ser las ayudas de mi código, las cuales si no existen mi aplicación se cae <br>
   También pueden ser herramientas que quizás se utilicen en una pequeña parte de mi código, en algo específico <br>
   Ejemplos: crear las funciones para trabajar con sesiones, etc. <br>
   `models`: en esta carpeta defino los atributos de las distintas colecciones (productos, usuarios, etc) de mi base de datos <br>
   `utils`: la definición es variada <br>
   Pueden ser las herramientas de mi código. Si no estuvieran yo lo podría de hacer de otra forma <br>
   Herramientas que se pueden utilizar en todo mi proyecto <br>
   Ejemplos: encriptar contraseñas, hacer cálculos matemáticos, etc. <br>
   No hay una definición clara sobre cuándo utilizar helpers y cuándo utils ya que cada persona/cada equipo de desarrollo/cada empresa le puede dar una definición diferente según la configuración que uno le quiera brindar
7. Diferencias entre Socket.io y Websockets: <br>
   Socket.io es una librería de JavaScript para comunicación bidireccional en tiempo real entre clientes y servidores, utilizando WebSockets y otros métodos de transporte <br>
   WebSockets es un protocolo bidireccional que facilita conexiones persistentes entre clientes y servidores, permitiendo una comunicación eficiente sin la necesidad de múltiples conexiones como en HTTP
8. Cómo subir una imagen a mi carpeta public desde Postman: <br>
   Ingreso el endpoint "localhost:8080/upload" <br>
   Utilizo el método POST <br>
   Voy a la pestaña body y clickeo la opción form-data <br>
   Ingreso el nombre "product" dentro del campo Key, ya que puse esa palabra en "app.js" <br>
   En este mismo campo Key elijo la opción file <br>
   Dentro del campo Value clickeo en select file y busco la imagen que deseo subir <br>
   Clickeo en send <br>
   La consola de Postman me debe decir "Imagen cargada" y esta se va a guardar en la subcarpeta img de la carpeta public
9. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:8080



## Dependencias instaladas para este desafío:

1. **express-handlebars**

   - Instalación: `npm i express-handlebars`
   - Esta dependencia instala el motor de plantillas Handlebars para Express.js. Handlebars simplifica la creación de vistas dinámicas en aplicaciones web, permitiendo la inserción de datos en las plantillas

2. **socket.io**

   - Instalación: `npm i socket.io`
   - Es una biblioteca que facilita la comunicación bidireccional en tiempo real entre el servidor y los clientes en aplicaciones web, utilizando WebSockets o fallbacks

3. **multer**

   - Instalación: `npm i multer`
   - Es un middleware para Express que facilita la gestión de archivos en formularios de carga de archivos. Permite recibir y almacenar archivos en el servidor