## Comentarios:

1. Desafío "Segunda práctica de integración sobre tu ecommerce": <br>
   En este desafío trabajamos tokens, jwt y cookies
2. No estamos trabajando con vistas (handlebars) en este desafío. Todo probado desde Postman
3. Tokens: <br>
   Es una cadena de caracteres que representa la identidad del usuario y su acceso a recursos específicos en una aplicación. Se utilizan para autenticación y autorización
4. JWT: <br>
   Json Web Token permite generar tokens de autenticación seguros basados en la información del usuario y verificar la autenticidad de esos tokens antes de permitir el acceso a ciertos recursos en el servidor <br>
   Se pueden crear tokens sin utilizar JWT. Aquí explico la diferencia: <br>
   Mientras que "tokens" es un término general que puede referirse a cualquier mecanismo de seguridad basado en identificadores únicos, "tokens JWT" se refiere específicamente a tokens que siguen el estándar JSON Web Token, con un formato y una estructura definidos y una forma estandarizada de gestionar y verificar la autenticidad del token <br>
   (Importante: JWT no es una herramienta para generar tokens, sino un estándar definido para generarlos)
5. Cookies: <br>
   Es un pequeño archivo de texto que un servidor web envía al navegador del usuario y que se almacena en el dispositivo del usuario <br>
   Se crean cuando iniciamos sesión. Se utiliza para realizar un seguimiento de la actividad del usuario en un sitio web, contiene información como preferencias o datos de inicio de sesión <br>
   Verificar cookies: <br>
   Para ver la información del usuario utilizando la cookie debo ir a Postman, utilizo el método POST, ingreso el endpoint "localhost:4000/api/sessions/login", ingreso la información del usuario en el body y cuando clickee en "send" me debería aparecer en cookies la llamada "jwtCookie" (así la nombré en el archivo "passport.js")
   Copio el texto de la cookie, voy a la página "jwt.io", lo pego en donde dice "pegar el token aquí" y del otro lado me debería aparecer la información del usuario
6. Diferencias entre cookies y tokens: <br>
   En resumen, mientras que las cookies son archivos de texto que se almacenan en el lado del cliente y son gestionadas por el navegador, los tokens son cadenas de caracteres utilizados para la autenticación y autorización en aplicaciones web y pueden ser transmitidos de diversas maneras, incluyendo a través de cookies (como hago en este desafío)
7. Creé un archivo "jwt.js" en la carpeta "utils" en donde nosotros generamos el token. Luego una vez ya generado el token, hacemos la validación. Si pasamos estos filtros, vamos a generar sesión <br>
   Creé un archivo "messagesError.js" en la carpeta "utils" para manejo de errores en caso de que los haya al iniciar sesión <br>
   Creé un archivo "app.routes.js" en la carpeta "routes" para importar ahí las rutas y dejar más limpio el archivo "app.js" <br>
   Modifiqué el archivo "passport.js" para incluir las cookies. Acá primero capturo la cookie a la que nombro como "jwtCookie" y luego extraigo el token de la cookie para autenticar al usuario <br>
   Modifiqué el archivo "products.routes.js" para que solamente puedan crear, modificar o eliminar productos los usuarios cuyo rol sea admin <br>
   Modifiqué el archivo "users.models.js" para que, cada vez que se cree un nuevo usuario, se cree un nuevo carrito asociado a ese usuario
8. Queda obsoleto desde ahora el método POST en "carts.routes.js", porque lo utilizábamos para practicar creando carritos desde Postman, así que lo elimino. Ahora los carritos se crean una vez que nosotros creamos al usuario
9. Ejemplo de token: <br>
   {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YzM3YzdhZjIzYWM1NTE1ZjJiYjM1MiIsImZpcnN0X25hbWUiOiJMdWNpYW5vIiwibGFzdF9uYW1lIjoiQ2FybyIsImFnZSI6MjksImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmIkMTUkV0ExbklESy5mNXNRSFI2N2xPODNuZXVJUlcuOGxMWW92TDZkSE84YU1sbDc2dXJTOXd4TmEiLCJyb2wiOiJhZG1pbiIsImRpc2NvdW50cyI6MCwibGFzdF9jb25uZWN0aW9uIjoiMjAyNC0wMi0wOFQyMToxMDoxMy4yOTZaIiwiZG9jdW1lbnRzIjpbXSwiY2FydCI6IjY1YzM3YzdhZjIzYWM1NTE1ZjJiYjM1MyIsIl9fdiI6MH0sImlhdCI6MTcwNzQyODYwOSwiZXhwIjoxNzA3NDcxODA5fQ.3Is2Jv4nMfvU3c95ka_7WNGajcT_eFArqdB9_zpb0vI"} <br>
   Ejemplo de token decodificado: <br>
   { <br>
      "user": { <br>
         "_id": "65c37c7af23ac5515f2bb352", <br>
         "first_name": "Luciano", <br>
         "last_name": "Caro", <br>
         "age": 29, <br>
         "email": "admin@admin.com", <br>
         "password": "$2b$15$WA1nIDK.f5sQHR67lO83neuIRW.8lLYovL6dHO8aMll76urS9wxNa", <br>
         "rol": "admin", <br>
         "discounts": 0, <br>
         "last_connection": "2024-02-08T21:10:13.296Z", <br>
         "documents": [], <br>
         "cart": "65c37c7af23ac5515f2bb353", <br>
         "__v": 0 <br>
      }, <br>
      "iat": 1707428609, <br>
      "exp": 1707471809 <br>
   } <br>
   Almacenamiento de tokens en el frontend: <br>
   Se puede almacenar de varias formas, una de las más comunes es mediante cookies <br>
   En este curso trabajé mayormente con esa forma de almacenamiento <br>
   Almacenamiento de tokens en la base de datos: <br>
   Se puede almacenar con una colección "sessions" en la base de datos <br>
10. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000



## Dependencias instaladas para este desafío:

1. **passport-jwt**
   - Instalación: `npm i passport-jwt`
   - Instala el middleware Passport-JWT que facilita la autenticación mediante JSON Web Tokens en aplicaciones Node.js, ideal para proteger rutas

2. **jsonwebtoken**
   - Instalación: `npm i jsonwebtoken`
   - Instala la biblioteca JSON Web Token para generar y verificar tokens de autenticación, crucial para implementar sistemas seguros de autenticación y autorización