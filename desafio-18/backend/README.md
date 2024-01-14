## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Cuarta práctica de integración sobre tu ecommerce": <br>
   En este trabajo debemos modificar el modelo de user para que cuente con una nueva propiedad llamada "documents" el cual será un array que contenga los objetos con las siguientes propiedades: <br>
   name: string (nombre del documento) <br>
   reference: string (link al documento) <br>
   Aunque no tiene que hacer referencia a ningún documento real <br>
   Además, agregar una propiedad al usuario llamada "last_connection", la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout <br>
   Debemos crear un endpoint en el router de usuarios "api/users/:uid/documents" con el método POST que permita uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen <br>
   Por último, el middleware de Multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban (si se sube una imagen de un producto, deberá guardarlo en la carpeta products. Si se carga un documento, deberá guardarlo en documents, etc.)



## Dependencias instaladas para este desafío: