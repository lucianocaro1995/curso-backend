## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Implementación de logger": <br>
   En este desafío debemos crear un logger. Un logger es un componente que se utiliza para registrar (o "loggear") información relevante durante la ejecución de un programa. Los logs son mensajes o registros que contienen detalles sobre eventos, acciones, errores u otra información importante que puede ser útil para entender el comportamiento de una aplicación <br>
   A este logger debemos definirle un sistema de niveles de menor a mayor según el grado de gravedad: debug, http, info, warning, error, fatal. Y también debemos crearle un endpoint en donde se puedan probar todos los niveles <br>
3. Creé el archivo "logger.js" dentro de la carpeta "config" donde creo el sistema de niveles 
4. Creé el archivo "logger.routes.js" dentro de la carpeta "routes" donde creo las rutas de cada uno de los niveles
5. Modifiqué el archivo "app.routes.js" para crear el endpoint "/loggerTest". De esta manera puedo acceder a ese endpoint para probar todos los niveles <br>
   Por ejemplo si quiero probar el nivel fatal, solamente debo escribir "localhost:4000/loggerTest/fatal" sobre el navegador o sobre Postman con el método GET <br>


## Dependencias instaladas para este desafío:

1. **winston logger**

   - Instalación: `npm i winston`
   - Instalarlo en backend
   - Winston es un logger diseñado para poder trabajar con multitransportes para nuestra apicación, utiliza dos conceptos importantes: <br>
   Transporte: sistema de almacenamiento de nuestros logs <br>
   Nivel: sistema de prioridad que tiene cada alog, para definir si un log tiene autorización para pasar por un transporte