## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Documentar API": <br>
   En este desafío debemos realizar la configuración necesaria para tener documentado nuestro proyecto final utilizando Swagger <br>
   Debemos documentar el módulo de carrito y el módulo de productos. No es necesario hacer la documentación de sesiones
3. Modifiqué el archivo "app.js" para poder incluir Swagger y utilizarlo en nuestro proyecto
4. Creé el archivo "path.js" nuevamente ya que le volvemos a dar uso <br>
Es recomendado que el archivo path esté en el mismo directorio en donde se encuentra "app.js"
5. Creé la carpeta "docs" en donde voy a documentar carritos y productos



## Dependencias instaladas para este desafío:

1. **swagger-jsdoc**

   - Instalación: `npm i swagger-jsdoc`
   - Instalarlo en backend
   - Permite escribir comentarios en el código fuente utilizando el formato Swagger, facilitando la generación automática de la documentación de la AP

2. **swagger-ui-express**

   - Instalación: `npm i swagger-ui-express`
   - Instalarlo en backend
   - Proporciona una interfaz de usuario (UI) basada en Swagger para visualizar la documentación de la API de una manera interactiva. Ayuda a entender y probar las rutas de la API directamente desde el navegador