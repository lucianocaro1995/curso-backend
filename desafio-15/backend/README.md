## Comentarios:

1. Desafío "Tercera práctica de integración sobre tu ecommerce": <br>
   En este desafío debemos realizar un sistema de reestablecimiento de contraseña, lo cual envíe por medio de un correo un botón que redireccione a una página para lograr reestablecerla (no recuperarla) <br>
   También debemos establecer un nuevo rol para el schema del usuario llamado "premium", el cual recibirá descuentos de productos
2. Explicación de cómo reestablecer la contraseña: <br>
   Debo cumplir 4 pasos: Nodemailer, mail, aplicación y base de datos <br>
   Vamos a utilizar Nodemailer para que, cuando solicitemos en el frontend un reestablecimiento de contraseña, este nos envíe un mail de recuperación a nuestro correo. Desde aquí clickeando en alguna parte nos va a redirigir a la aplicación en donde nos pedirán nuestro usuario y contraseña <br>
   Luego de cumplir estos pasos, procedemos a escribir la nueva contraseña la cual se va a guardar en la base de datos <br>
   Vamos a enviar un token, este nos va a permitir conectarnos con la aplicación y va a trabajar con Nodemailer
3. Creé un archivo "nodemailer.js" dentro de la carpeta config para utilizar nodemailer y crear este mail que nos va a llegar cuando lo solicitemos
4. Creé en "users.controller.js" 2 funciones: <br>
   La primera requestPasswordReset: sirve para solicitar un reestablecimiento de la contraseña. Envía el mail de reestablecimiento a nuestro correo <br>
   La segunda resetPassword: completa el proceso de reestablecimiento. Modifica el valor de la contraseña en la base de datos
5. Modifiqué el archivo "users.routes.js" para incluir los 2 endpoints con las funciones que acabo de crear en los controllers
6. Modifiqué el archivo "users.models.js" para incluir un rol premium que tenga el beneficio de poder comprar productos con descuento
7. Probar la primera función creada: <br><br>
   `requestPasswordReset` <br>
   Elimino los 2 middlewares en "users.routes.js" así me ahorro el paso de logearme <br>
   Luego ingreso "localhost:4000/api/users/password-recovery" en Postman utilizando el método POST, y en el body escribo un email <br>
   Al clickear send me debería aparecer el mensaje "Correo de recuperación enviado" en la consola de Postman <br>
   Ejemplo de mail para ingresar:

```json
   {
      "email": "lucho_lp_1995@hotmail.com"
   }
```

8. Probar la segunda función creada: <br><br>
   `resetPassword` <br>
   Elimino los 2 middlewares en "users.routes.js" así me ahorro el paso de logearme <br>
   Copio el link que recibí en el mail, que es esta ruta junto al string del token: "localhost:4000/api/users/reset-password/:token", lo ingreso en Postman utilizando el método POST y luego en el body ingreso un array con la nueva contraseña <br>
   Al clickear send me debería aparecer el mensaje "Contraseña modificada correctamente" en la consola de Postman <br>
   Tener en cuenta que el token expira luego de un tiempo, y también expira cuando se cierra el servidor. Es decir cuando ejecute de nuevo con "npm run dev" debo volver a proceder con la primera función, si quiero poder realizar la segunda función <br>
   Ejemplo de nueva contraseña para ingresar:

```json
   {
      "newPassword": "1234",
      "confirmNewPassword": "1234"
   }
```

9. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000 <br>
   Es necesario abrir las 2 carpetas de backend y frontend y ejecutar el comando en ambas carpetas. Si lo ejecuto en la carpeta del desafío, me va a aparecer un error



## Dependencias instaladas para este desafío:

Se utiliza Nodemailer para este desafío, aunque ya la teníamos instalada anteriormente