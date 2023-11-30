## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Implementación de logger": <br>
   En este desafío debemos: <br>
   Definir un sistema de niveles de menor a mayor: debug, http, info, warning, error, fatal <br>
   Implementar un logger para desarrollo y un logger para producción <br>
   El logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola. Mientras que el logger del entorno producto debería loggear sólo a partir del nivel info <br>
   El logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre "errors.log" <br>
   Agregar logs de valor alto en los puntos importantes de nuestro servidor(errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston <br>
   Crear un endpoint "loggerTest" que permitirá probar todos los logs
3. 


## Dependencias instaladas para este desafío:

1. **winston logger**

   - Instalación: `npm i winston`
   - Instalarlo en backend
   - Winston es un logger diseñado para poder trabajar con multitransportes para nuestra apicación, utiliza dos conceptos importantes: <br>
   Transporte: sistema de almacenamiento de nuestros logs <br>
   Nivel: sistema de prioridad que tiene cada alog, para definir si un log tiene autorización para pasar por un transporte