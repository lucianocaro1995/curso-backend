## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver el localhost:4000 en mi navegador
2. En este desafío trabajamos tokens, jwt y cookies
3. No estamos trabajando con vistas (handlebars) en este desafío. Todo probado desde Postman
4. Incluimos un archivo "jwt.js" en la carpeta "utils" en donde nosotros generamos el token. Luego una vez ya generado el token, hacemos la validación. Si pasamos estos filtros, vamos a generar sesión
5. Incluimos un archivo "messagesError.js" en la carpeta "utils" para manejo de errores en caso de que los haya al iniciar sesión
6. Modificamos el archivo "products.routes.js" para que solamente puedan crear, modificar o eliminar productos los usuarios cuyo rol sea admin



## Dependencias instaladas para este desafío:

1. **passport-jwt**
   - Instalación: `npm i passport-jwt`
   - Instala el middleware Passport-JWT que facilita la autenticación mediante JSON Web Tokens en aplicaciones Node.js, ideal para proteger rutas

2. **jsonwebtoken**
   - Instalación: `npm i jsonwebtoken`
   - Instala la biblioteca JSON Web Token para generar y verificar tokens de autenticación, crucial para implementar sistemas seguros de autenticación y autorización