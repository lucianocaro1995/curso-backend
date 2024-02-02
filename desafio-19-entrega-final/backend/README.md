## Comentarios:

1. Desafío "Backend de una aplicación ecommerce": <br>
   En este trabajo debemos conseguir una experiencia de compra completa uniendo frontend, backend y base de datos <br>
   Además debemos agregar 2 rutas en /api/users: <br>
   GET "/" deberá obtener todos los usuarios. Éste sólo debe devolver los datos principales como nombre, correo, rol (con nombre y correo alcanza) <br>
   DELETE "/" deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días (puedes hacer pruebas con los últimos 30 minutos por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad (el profesor nos dijo que lo hagamos utilizando un time.now o date.now) <br>
   Debemos hacer un frontend para poder realizar un flujo completo de compra y luego hacer el deploy de nuestra aplicación en Render<br>
   Por último, el profesor nos dio un test para probar varias rutas desde Postman <br>
2. Modifiqué los routers de sessions, products, users y carts para cumplir con todos los endpoints del test de Postman
3. Modifiqué "nodemailer.js" para agregar: <br>
   Una función para reestablecer contraseña <br>
   Una función que notifique por mail a los usuarios cuyas cuentas sean eliminadas después de 2 días de inactividad <br>
   Una función para agradecerle al usuario por su compra <br>
   Las primeras 2 funciones modifican los endpoints y controllers de users y la última modifica a carts
4. Modifiqué "users.controller.js" para agregar 2 funciones pedidas por la consigna: <br>
   Una para obtener los nombres y mails de todos los usuarios y otra para eliminar usuarios inactivos
5. Modifiqué "carts.controller.js" para agregar la función de nodemailer al comprar un producto
6. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan



## Dependencias instaladas para este desafío:

Ninguna