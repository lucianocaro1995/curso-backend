## Comentarios:

1. Desafío "Backend de una aplicación ecommerce": <br>
   En este trabajo debemos conseguir una experiencia de compra completa <br>
   Agregar 2 rutas en /api/users: <br>
   GET "/" deberá obtener todos los usuarios. Éste sólo debe devolver los datos principales como nombre, correo, rol (con nombre y correo alcanza)<br>
   DELETE "/" deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días (puedes hacer pruebas con los últimos 30 minutos por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad (el profesor nos dijo que lo hagamos utilizando un time.now o date.now) <br>





   Crear 2 vistas: para poder visualizar usuarios y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce <br>
   Finalizar las vistas pendientes para la realización de flujo completo de compra. No es necesario tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra <br>
   Realizar el despliegue de tu aplicativo en la plataforma de tu elección (preferentemente Render)





2. Modifiqué "nodemailer.js" para agregar 2 funciones:
   Una función que notifique por mail a los usuarios cuyas cuentas sean eliminadas después de 2 días de inactividad
   Otra función para agradecerle al usuario por su compra

3. Modifiqué "users.controller.js" para agregar 2 funciones: 
   Una para obtener los nombres y mails de todos los usuarios y otra para eliminar usuarios inactivos

4. Modifiqué "carts.controller.js" para agregar la función de nodemailer al comprar un producto

5. Modifiqué "users.routes.js" para agregar los 2 endpoints con las funciones que acabo de crear en los controllers de users

6. Creé el componente "UsersList" en la carpeta de frontend para tener la vista pedida por la consigna, tanto para ver los usuarios como para eliminarlos

7. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan

(Acordarme que modifiqué algunas rutas para agregar el usuario premium)

## Dependencias instaladas para este desafío:

Ninguna