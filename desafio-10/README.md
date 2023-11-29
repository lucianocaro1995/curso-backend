## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver el localhost:4000 en mi navegador
2. Desafío "Práctica de integración sobre tu ecommerce": <br>
   En este desafío trabajamos tokens, jwt y cookies
3. No estamos trabajando con vistas (handlebars) en este desafío. Todo probado desde Postman
4. Tokens: <br>
   Es una cadena de caracteres que representa la identidad del usuario y su acceso a recursos específicos en una aplicación. Se utilizan para autenticación y autorización
5. JWT: <br>
   Json Web Token permite generar tokens de autenticación seguros basados en la información del usuario y verificar la autenticidad de esos tokens antes de permitir el acceso a ciertos recursos en el servidor <br>
   Se pueden crear tokens sin utilizar JWT. Aquí explico la diferencia: <br>
   Mientras que "tokens" es un término general que puede referirse a cualquier mecanismo de seguridad basado en identificadores únicos, "tokens JWT" se refiere específicamente a tokens que siguen el estándar JSON Web Token, con un formato y una estructura definidos y una forma estandarizada de gestionar y verificar la autenticidad del token <br>
   (Importante: JWT no es una herramienta para generar tokens, sino un estándar definido para generarlos)
6. Cookies: <br>
   Es un pequeño archivo de texto que un servidor web envía al navegador del usuario y que se almacena en el dispositivo del usuario <br>
   Se crean cuando iniciamos sesión. Se utiliza para realizar un seguimiento de la actividad del usuario en un sitio web, contiene información como preferencias o datos de inicio de sesión <br>
   Verificar cookies: <br>
   Para ver la información del usuario utilizando la cookie debo ir a Postman, utilizo el método POST, ingreso el endpoint "localhost:4000/api/sessions/login", ingreso la información del usuario en el body y cuando clickee en "send" me debería aparecer en cookies la llamada "jwtCookie" (así la nombré en el archivo "passport.js")
   Copio el texto de la cookie, voy a la página "jwt.io", lo pego en donde dice "pegar el token aquí" y del otro lado me debería aparecer la información del usuario
7. Diferencias entre cookies y tokens: <br>
   En resumen, mientras que las cookies son archivos de texto que se almacenan en el lado del cliente y son gestionadas por el navegador, los tokens son cadenas de caracteres utilizados para la autenticación y autorización en aplicaciones web y pueden ser transmitidos de diversas maneras, incluyendo a través de cookies (como hago en este desafío)
8. Creé un archivo "jwt.js" en la carpeta "utils" en donde nosotros generamos el token. Luego una vez ya generado el token, hacemos la validación. Si pasamos estos filtros, vamos a generar sesión <br>
   Creé un archivo "messagesError.js" en la carpeta "utils" para manejo de errores en caso de que los haya al iniciar sesión <br>
   Creé un archivo "app.routes.js" en la carpeta "routes" para importar ahí las rutas y dejar más limpio el archivo "app.js" <br>
   Modifiqué el archivo "passport.js" para incluir las cookies. Acá primero capturo la cookie a la que nombro como "jwtCookie" y luego extraigo el token de la cookie para autenticar al usuario <br>
   Modifiqué el archivo "products.routes.js" para que solamente puedan crear, modificar o eliminar productos los usuarios cuyo rol sea admin <br>
   Modifiqué el archivo "users.models.js" para que, cada vez que se cree un nuevo usuario, se cree un nuevo carrito asociado a ese usuario <br>
9. Queda obsoleto desde ahora el método POST en "carts.routes.js", porque lo utilizábamos para practicar creando carritos desde Postman, así que lo elimino. Ahora los carritos se crean una vez que nosotros creamos al usuario



## Dependencias instaladas para este desafío:

1. **passport-jwt**
   - Instalación: `npm i passport-jwt`
   - Instala el middleware Passport-JWT que facilita la autenticación mediante JSON Web Tokens en aplicaciones Node.js, ideal para proteger rutas

2. **jsonwebtoken**
   - Instalación: `npm i jsonwebtoken`
   - Instala la biblioteca JSON Web Token para generar y verificar tokens de autenticación, crucial para implementar sistemas seguros de autenticación y autorización