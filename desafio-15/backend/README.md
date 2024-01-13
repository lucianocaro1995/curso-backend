## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Práctica de integración sobre tu ecommerce": <br>
   En este desafío complementario debemos realizar un sistema de reestablecimiento de contraseña, lo cual envíe por medio de un correo un botón que redireccione a una página para lograr reestablecerla (no recuperarla) <br>
   También debemos establecer un nuevo rol para el schema del usuario llamado "premium", el cual recibirá descuentos de productos
3. Explicación de cómo reestablecer la contraseña: <br>
   Debo cumplir 4 pasos: Nodemailer, mail, aplicación y base de datos <br>
   Vamos a utilizar Nodemailer para que, cuando solicitemos en el frontend un reestablecimiento de contraseña, este nos envíe un mail de recuperación a nuestro correo. Desde aquí clickeando en alguna parte nos va a redirigir a la aplicación en donde nos pedirán nuestro usuario y contraseña <br>
   Luego de cumplir estos pasos, procedemos a escribir la nueva contraseña la cual se va a guardar en la base de datos <br>
   Vamos a enviar un token, este nos va a permitir conectarnos con la aplicación y va a trabajar con Nodemailer
4. Creé un archivo "nodemailer.js" dentro de la carpeta config para utilizar nodemailer y crear este mail que nos va a llegar cuando lo solicitemos
5. Creé en "users.controller.js" 2 funciones: <br>
   La primera requestPasswordReset: sirve para solicitar un reestablecimiento de la contraseña. Envía el mail de reestablecimiento a nuestro correo <br>
   La segunda resetPassword: completa el proceso de reestablecimiento. Modifica el valor de la contraseña en la base de datos
6. Modifiqué el archivo "users.routes.js" para incluir los 2 endpoints con las funciones que acabo de crear en los controllers
7. Modifiqué el archivo "users.models.js" para incluir un rol premium que tenga el beneficio de poder comprar productos con descuento


## Dependencias instaladas para este desafío: