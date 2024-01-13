## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Documentar API": <br>
   En este desafío debemos realizar la configuración necesaria para tener documentado nuestro proyecto final utilizando Swagger <br>
   Debemos documentar carritos, productos, sesiones y usuario <br>
   No es necesario crear todos los CRUDS que hicimos en la carpeta "routes". En sessions el profesor nos pidió que hagamos solamente el login, con eso ya es suficiente
3. Modifiqué el archivo "app.js" para poder incluir Swagger y utilizarlo en nuestro proyecto
4. Creé el archivo "path.js" nuevamente ya que le volvemos a dar uso. Lo importo en "app.js" <br>
Es recomendado que el archivo path esté en el mismo directorio en donde se encuentra "app.js"
5. Creé la carpeta "docs" en donde voy a documentar lo pedido
6. Importante: para visualizar Swagger voy al endpoint "localhost:4000/apidocs" en el navegador <br>
   Para poder utilizarlo y hacer CRUDS con los usuarios sin tener que loguearme, debo borrar los 2 middlewars en users.routes.js, tanto passportError('jwt') como authorization('admin') <br>
   Si no hago esto, cuando ejecute dentro de Swagger me va a aparecer un error y no me va a funcionar la operación que quiera realizar con los usuarios ya que necesito logearme (obviamente debo hacer lo mismo con carritos, productos y sesiones)
7. Aclaración: el archivo "users.yaml" es el que hizo el profesor en clase. Lo hice lo más parecido a lo que hizo el profesor, luego con el resto (carts y products principalmente) utilicé simplificaciones de código para no repetir tanto



## Dependencias instaladas para este desafío:

1. **swagger-jsdoc**

   - Instalación: `npm i swagger-jsdoc`
   - Instalarlo en backend
   - Permite escribir comentarios en el código fuente utilizando el formato Swagger, facilitando la generación automática de la documentación de la AP

2. **swagger-ui-express**

   - Instalación: `npm i swagger-ui-express`
   - Instalarlo en backend
   - Proporciona una interfaz de usuario (UI) basada en Swagger para visualizar la documentación de la API de una manera interactiva. Ayuda a entender y probar las rutas de la API directamente desde el navegador