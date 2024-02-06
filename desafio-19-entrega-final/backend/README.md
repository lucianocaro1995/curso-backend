## Comentarios:

1. Desafío "Backend de una aplicación ecommerce": <br>
   En este trabajo debemos conseguir una experiencia de compra completa uniendo frontend, backend y base de datos <br>
   Además debemos agregar 2 rutas en /api/users: <br>
   GET "/" deberá obtener todos los usuarios. Éste sólo debe devolver los datos principales como nombre, correo, rol (con nombre y correo alcanza) <br>
   DELETE "/" deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días (puedes hacer pruebas con los últimos 30 minutos por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad <br>
   Debemos hacer un frontend para poder realizar un flujo completo de compra y luego hacer el deploy de nuestra aplicación en Render<br>
   Por último, el profesor nos dio un test para probar varias rutas desde Postman
2. Test de Postman: <br>
   Modifiqué tanto controllers como routes para que me diera bien todas las rutas/endpoints del test de Postman <br>
   Modifiqué "passport.js", "jwt.js" y "messagesError.js" también para cumplir con el test de Postman
   Modifiqué "app.js" para utilizar el puerto 3000 como me pide el test
3. Multer: <br>
   Modifiqué el controller y route de products para crear un endpoint que me permita subir imágenes de los productos a la base de datos <br>
   Modifiqué "app.js" para agregar el middleware de multer. Esto no es necesario para subir la imagen a la base de datos, pero sí para que se vea la imagen en el frontend <br>
   El archivo "multer.js" no necesitó modificaciones
4. Nodemailer: <br>
   Agregué 2 funciones, así que en total voy a tener 3 funciones en "nodemailer.js": <br>
   Una función para reestablecer contraseña <br>
   Una función que notifique a los usuarios cuyas cuentas sean eliminadas después de 2 días de inactividad <br>
   Una función para agradecerle al usuario por su compra <br>
   Las primeras 2 funciones modifican los controllers y routes de users, la última modifica a carts
5. Frontend: <br>
   Modifiqué la carpeta frontend poder realizar un flujo completo de compra, es decir crear un ecommerce 
6. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:3000 <br>
   Es necesario abrir las 2 carpetas de backend y frontend y ejecutar el comando en ambas carpetas. Si lo ejecuto en la carpeta del desafío, me va a aparecer un error



## Cómo utilizar correctamente Postman:

1. Explicación de la ruta login: <br>
   Tener en cuenta que para poder loguearme ya debo estar registrado en la base de datos <br>
   Al loguearme recibo un token, el cual voy a poder utilizar para poder ejecutar las rutas que necesiten autorización <br>
   Para las rutas que sean de uso exclusivo del admin, voy a necesitar loguearme como el admin <br>
   Para las rutas que sean de uso de los usuarios "user" y "premium", voy a necesitar loguearme como usuario
2. Cómo utilizar las rutas que requieren autorización: <br>
   Cuando intente usar una ruta que requiere autorización y yo no provea ningún token me va a aparecer un mensaje como este: <br>
   {"error":"jwt malformed"} <br>
   Para que esto no me pase, debo clickear la opción "Authorization", luego en "Type" despliego una miniventana con opciones y clickeo "Bearer token". Me va a aparecer la palabra token con un input a su lado, en ese input debo poner el token entero ya sea del admin o de un usuario
3. Cómo utilizar la ruta current: <br>
   Sirve para introducir un token y que me devuelva la información del usuario asociada a ese token <br>
   Primero debo introducir un token de autorización como expliqué en el punto 2  <br>
   Luego debo clickear la opción "Headers" y me va a aparecer una tabla con varias Keys. Busco la key que dice "Authorization" y en el value que por defecto en nuestro test de Postman dice "Bearer {{jwt_token}}" debo introducir el token del usuario para buscar su información <br>
   Importante: sólo vamos a poder buscar la información nuestra. Si primero pongo un token de autorización de un usuario Luciano, y luego pongo el token a buscar sobre el usuario Matías, al clickear send voy a ver en la consola la información del usuario Luciano <br>
   Para ver sin problemas la información de un usuario, debo ingresar el mismo token tanto en Authorization como en Headers
4. Cómo utilizar todas las rutas: <br>
   Verifico si la ruta necesita autorización. Si lo necesita me logueo e ingreso el token que me pida, ya sea de user, premium o admin <br>
   Verifico el método: GET, POST, PUT, DELETE <br>
   Verifico la ruta, reemplazo los id en caso de ser necesario con algún id existente en mi base de datos <br>
   Verifico si la ruta necesita que complete escribiendo en el body, por ejemplo para crear un producto voy a tener que escribir en el body un objeto con los atributos title, description, price, stock, code, category



## Dependencias instaladas para este desafío:

Ninguna