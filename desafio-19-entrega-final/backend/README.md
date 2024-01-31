## Comentarios:

1. Desafío "Backend de una aplicación ecommerce": <br>
   En este trabajo debemos conseguir una experiencia de compra completa <br>
   Agregar 2 rutas en /api/users: <br>
   GET "/" deberá obtener todos los usuarios. Éste sólo debe devolver los datos principales como nombre, correo, rol (con nombre y correo alcanza)<br>
   DELETE "/" deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días (puedes hacer pruebas con los últimos 30 minutos por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad (el profesor nos dijo que lo hagamos utilizando un time.now o date.now) <br>
   Crear 2 vistas: para poder visualizar usuarios y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce <br>
   Finalizar las vistas pendientes para la realización de flujo completo de compra. No es necesario tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra <br>
   Realizar el despliegue de tu aplicativo en la plataforma de tu elección (preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo
2. Modifiqué "users.controller.js" para agregar 2 funciones: una obtener los nombres y mails de todos los usuarios y otra para eliminar usuarios inactivos
3. Modifiqué "users.routes.js" para agregar los 2 endpoints con las funciones que acabo de crear en controllers
4. Modifiqué "nodemailer.js" para notificar por mail a los usuarios cuyas cuentas sean eliminadas después de 2 días de inactividad
5. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan



## Dependencias instaladas para este desafío:

Ninguna