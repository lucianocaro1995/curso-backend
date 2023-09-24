## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver el localhost:4000 en mi navegador
2. En este desafío sí utilizamos las vistas(handlebars) a diferencia de los 2 desafíos anteriores
3. El usuario principal que es admin está por defecto en el formulario de /login. Nosotros debemos crear por una única vez a ese usuario admin
4. Solo /signup es una ruta accesible sin tener el /login hecho previamente
5. Una vez hecho el login se genera un sesión en MongoDB Atlas y una cookie de forma local, en cada renderización se evalua la existencia de ambos elementos y que corresponda al mismo usuario
6. La ruta /realTimeProducts sólo está disponible para los usarios cuyo rol es admin, en caso de que no se pueda autenticar se envía a la ruta /home o al /login según el caso



## Dependencias instaladas para este desafío:

1. **dotenv**
   - Instalación: `npm i dotenv`
   - Nos permite manejar variables de entorno dentro de nuestra aplicación. Sirve para ocultar contraseñas y no subirlas a GitHub <br>
    Copio toda la URL que escribí en la conexión con MongoDB Atlas y la pego en el archivo ".env". Luego donde estaba la URL pongo "process.env.MONGO_URL" <br>
    En la versión nueva de Node lo tenemos de forma nativa, pero en esta versión tengo que instalarlo desde la terminal

2. **cookie-parser**
   - Instalación: `npm i cookie-parser`
   - Nos permite trabajar con cookies. Cookies: formas de guardar información en el cliente


3. **express-session**
   - Instalación: `npm i express-session`
   - Nos permite manejar las sesiones de mi aplicación que se guardan en el servidor, no en la base de datos. No tiene nada que ver con las cookies

4. **connect-mongo**
   - Instalación: `npm i connect-mongo`
   - Nos permite trabajar con sesiones guardadas en la base de datos MongoDB (ya que guardarlas en un servidor no es recomendable porque se caen seguido)



## Comentarios sobre la configuración del servidor Express en "app.js"

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