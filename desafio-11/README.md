## Comentarios:

1. Desafío "Reestructura de nuestro servidor": <br>
   En este desafío debemos realizar los cambios necesarios en nuestro proyecto para que se base en un modelo de capas <br>
   Nuestra aplicación debe contar con capas de routing, controller y dao. El objetivo es mantener un flujo con actividades bien delegadas y así poder tener mejor control sobre el código <br>
2. Explicación de este desafío: <br>
   Las carpetas routes y dao ya las tenía creadas anteriormente, así que solamente me queda por crear la carpeta controllers y modificar los archivos de routes: <br>
   Antes en nuestros archivos de la carpeta routes se creaban las rutas y los CRUDS (create, read, update, delete). Desde ahora estos CRUDS estarán en los archivos de la carpeta controllers <br>
   Con esto buscamos dividir las responsabilidades entre controlador, modelo(dentro de dao) y rutas, y crear un código más limpio <br>
   También debo modificar los archivos de la carpeta routes borrando la importación de productModel ya que no la vamos a necesitar más, ahora importamos los controladores. Dentro de los archivos controllers importamos productModel
3. Creé la carpeta controllers
4. Modifiqué todos los archivos de la carpeta routes
5. En el próximo desafío eliminaré Handlebars y Socket.io por completo ya que vamos a utilizar React para hacer el frontend <br>
   También eliminaré todo lo relacionado al chat ya que no lo vamos a necesitar más. Solamente lo creamos en clase para practicar Socket.io
6. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000



## Dependencias instaladas para este desafío:

Ninguna