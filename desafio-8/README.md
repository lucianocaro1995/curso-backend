## Dependencias instaladas para este desafío:

1. **dotenv**
Instalación: `npm i dotenv`
Nos permite manejar variables de entorno dentro de nuestra aplicación. Sirve para ocultar contraseñas y no subirlas a github
Copio toda la URL que escribí en la conexión con MongoDB Atlas y la pego en el archivo ".env". Luego donde estaba la URL pongo "process.env.MONGO_URL"
En la versión nueva de node lo tenemos de forma nativa, pero en esta versión tengo que instalando desde la terminal

2. **cookie-parser**
Instalación: `npm i cookie-parser`
Nos permite trabajar con cookies. Cookies: formas de guardar información en el cliente

3. **express-session**
Instalación: `npm i express-session`
Nos permite manejar las sesiones de mi aplicación que se guardan en el servidor, no en la base de datos. No tiene nada que ver con las cookies

4. **connect-mongo**
Instalación: `npm i connect-mongo`
Nos permite trabajar con sesiones guardadas en la base de datos MongoDB (ya que guardarlas en un servidor no es recomendable porque se caen seguido)



## Comentarios sobre la configuración del servidor Express en "app.js"

1. app.use(cookieParser(process.env.SIGNED_COOKIE))
En esta línea de código la cookie está firmada, eso la hace más segura

2. useNewUrlParser: true
Establezco que la conexión sea mediante URL

3. useUnifiedTopology: true
Manejo de clusters de manera dinámica

4. ttl: 60
Duración de la sesión en la base de datos en segundos, no en milisegundos

5. resave: false
Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva
Si se deja en false, la sesión morirá en caso de que exista cierto tiempo de inactividad

6. saveUninitialized: false
SaveUninitialized permite guardar cualquier sesión aún cuando el objeto de sesión no tenga nada por contener
Si se deja en false, la sesión no se guardará si el objeto de sesión está vacío al final de la consulta



**IMPORTANTE:** Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador