## Comentarios:

1. Desafío "Implementación de login": <br>
    En este trabajo debemos modificar nuestro servidor para que tenga un sistema de login <br>
    Debemos realizar todas las vistas hechas en clase, así también como las rutas de router para procesar el registro y el login <br>
    Debemos crear un usuario cuyo rol sea "admin", todos los demás deben tener rol "user" 
2. En este desafío sí utilizamos las vistas(handlebars) a diferencia de los 2 desafíos anteriores
3. Creé el archivo "sessions.routes.js" en donde voy a manejar la autenticación de usuarios y la desconexión (login y logout)
4. Modifiqué las carpetas "views" y "public" para incluir todas las vistas pedidas en la consigna
5. Modifiqué "app.js" para incluir todas las nuevas vistas y para configurar el servidor express agregando sesiones
6. Cómo funciona mi aplicación agregando sesiones: <br>
    El usuario principal que es admin está por defecto en el formulario de /login, es decir no hay necesidad de que se registre, ya que nosotros debemos crear por una única vez a ese usuario admin <br>
    Solo /signup debe ser una ruta accesible sin tener el /login hecho previamente <br>
    Una vez hecho el login se genera un sesión en MongoDB Atlas <br>
    La ruta /realtimeproducts sólo debe estar disponible para el o los usarios cuyo rol sea admin 
7. Rutas que se van a poder ver desde el navegador: <br>
    `localhost:4000/chat` <br>
    `localhost:4000/home` <br>
    `localhost:4000/login` <br>
    `localhost:4000/logout` <br>
    `localhost:4000/realtimeproducts` <br>
    `localhost:4000/signup` <br>
8. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000



## Comentarios sobre la configuración del servidor Express en "app.js":

1. app.use(cookieParser(process.env.SIGNED_COOKIE)) <br>
    En esta línea de código la cookie está firmada, eso la hace más segura

2. useNewUrlParser: true <br>
    Establezco que la conexión sea mediante URL

3. useUnifiedTopology: true <br>
    Manejo de clusters de manera dinámica

4. ttl: 60 <br>
    Duración de la sesión en la base de datos en segundos, no en milisegundos

5. resave: false <br>
    Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva <br>
    Si se deja en false, la sesión morirá en caso de que exista cierto tiempo de inactividad

6. saveUninitialized: false <br>
    SaveUninitialized permite guardar cualquier sesión aún cuando el objeto de sesión no tenga nada por contener <br>
    Si se deja en false, la sesión no se guardará si el objeto de sesión está vacío al final de la consulta



## Dependencias instaladas para este desafío:

1. **cookie-parser**

    - Instalación: `npm i cookie-parser`
    - Nos permite trabajar con cookies. Cookies: formas de guardar información en el cliente


2. **express-session**

    - Instalación: `npm i express-session`
    - Nos permite manejar las sesiones de mi aplicación que se guardan en el servidor, no en la base de datos. No tiene nada que ver con las cookies

3. **connect-mongo**

    - Instalación: `npm i connect-mongo`
    - Nos permite trabajar con sesiones guardadas en la base de datos MongoDB (ya que guardarlas en un servidor no es recomendable porque se caen seguido)