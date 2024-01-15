## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Cuarta práctica de integración sobre tu ecommerce": <br>
   En este trabajo debemos modificar el modelo de user para que cuente con una nueva propiedad llamada "documents" el cual será un array que contenga los objetos con las siguientes propiedades: <br>
   name: String (nombre del documento) <br>
   reference: String (link al documento) <br>
   Aunque no tiene que hacer referencia a ningún documento real <br>
   Además, agregar una propiedad al usuario llamada "last_connection", la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout <br>
   Debemos crear un endpoint en el router de usuarios "api/users/:uid/documents" con el método POST que permita uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen <br>
   Por último, el middleware de Multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban: <br>
   Si se sube una imagen de perfil, deberá guardarse en la carpeta profiles <br>
   Si se sube la imagen de un producto, deberá guardarse en la carpeta products <br>
   Si se carga un documento, deberá guardarse en documents <br>
3. Creé el archivo "multer.js" en la carpeta config justamente para configurar Multer según lo pedido por la consigna
4. Creé la carpeta "uploads" en donde voy a guardar las imágenes y separarlas en categorías
5. Modifiqué "users.controller.js" para agregar la función que me permita subir documentos
6. Modifiqué "users.routes.js" para agregar el endpoint solicitado
7. Modifiqué "users.models.js" para agregarle las propiedades documents y last_connection
8. Cómo subir una imagen desde Postman: <br>
   Ingreso el endpoint "localhost:4000/api/users/651a2ea1e59e5ab04fe5d4d4/documents" utilizando el id de alguno de los usuarios de mi base de datos <br>
   Utilizo el método POST <br>
   Voy a la pestaña body y clickeo la opción form-data <br>
   Ingreso el nombre "document" dentro del campo Key, ya que puse document en el middleware en "users.routes.js" <br>
   En este mismo campo Key elijo la opción file <br>
   Dentro del campo Value clickeo en select file y busco la imagen que deseo subir. Debe estar en la carpeta uploads porque así lo configuré en "multer.js". Si la imagen está en otro lado, no va a funcionar <br>
   Clickeo en send <br>



## Dependencias instaladas para este desafío: