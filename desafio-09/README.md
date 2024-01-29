## Comentarios:

1. Desafío "Refactor a nuestro login": <br>
    En este desafío trabajamos autenticación de manera local (ingresar a nuestra aplicación con email y contraseña) y autenticación por terceros (ingresar a nuestra aplicación utilizando github)
2. No estamos trabajando con vistas (handlebars) en este desafío. Todo probado desde Postman
3. Creé un archivo "bcrypt.js" para generar un hasheo de contraseña. Nos permite encriptar las contraseñas guardadas en la base de datos
4. Creé un archivo "passport.js" en donde hago los códigos necesarios para registrarnos y loguearnos <br>
    Todo lo creado en este archivo, lo utilizamos como middleware en "sessions.routes.js" <br>
    Es la primera vez que utilizamos middlewares en las rutas/endpoints <br>
    Incluir un middleware en un endpoint permite realizar acciones específicas (como validar autorización, preprocesar datos, etc) antes de la autenticación. En simples palabras, los middlewares son pasos previos que se deben cumplir antes del proceso de autenticación
5. Modifiqué el archivo "session.routes.js". Aquí creo el código para register, login y logout de manera local, y también register y login utilizando github
6. Aclaración: es común tener redirecciones tanto en el servidor ("session.routes.js") como en el cliente ("signup.js", "login.js", "logout.js") <br>
    En el servidor, la redirección se utiliza para indicar al navegador que debe cargar la página de inicio de sesión. Esto es importante para garantizar que el navegador del usuario sepa a dónde debe ir después de realizar la acción de registro <br>
    En el cliente, la redirección se maneja después de recibir la respuesta del servidor. Aquí, la redirección se utiliza para cambiar efectivamente la ubicación del navegador después de completar el registro y mostrar un mensaje de éxito. Es una buena práctica manejar las redirecciones del lado del cliente para proporcionar una experiencia de usuario más fluida
7. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000



## Dependencias instaladas para este desafío:

1. **bcrypt**
   - Instalación: `npm i bcrypt`
   - Nos permite encriptar las contraseñas guardadas en la base de datos

2. **passport** y **passport-local**
   - Instalación: `npm i passport passport-local`
   - Passport sirve para facilitar el uso de varias formas de autenticarse. Agrupa todas las estrategias de autenticación, así sea por email, por contraseña, por redes sociales, etc <br>
    Passport-local es una estrategia que vamos a utilizar, es decir vamos a utilizar email y contraseña para acceder a nuestra aplicación

3. **passport-github2**
   - Instalación: `npm i passport-github2`
   - Esto nos permite poder autenticarnos con github para ingresar a nuestra aplicación, en vez de utilizar una autenticación local ingresando nuestro email y contraseña



## Comentarios sobre el archivo "bcrypt.js":

Aquí vamos a generar 2 funciones:

1. export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT))) <br>
    Esta recibe una contraseña (la que me ingrese mi usuario) y la devuelve encriptada. Esto me permite a mí poder ingresar una contraseña desde el usuario <br>
    Agregamos SALT = 15 en el .env <br>
    SaltRounds o SALT es la cantidad de veces que se encriptó esta contraseña <br>
    Como 10 es el valor por defecto, se recomienda ingresar cualquier valor exceptuando el 10. Cualquier hacker va a intentar primero con el valor por defecto <br>
    Hay que parsear el valor de SALT ya que en el .env es un string <br>

2. export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD) <br>
    Sirve para hacer el proceso inverso, desencriptar la contraseña <br>
    passwordSend: contraseña enviada por el usuario, sin encriptar <br>
    passwordBDD: contraseña de la base de datos, la que se guardó encriptada gracias a la primera función <br>
    compareSync: es para ver si las contraseñas coinciden. Esto devuelve true si coinciden <br><br>

Para hacer console.log de las 2 funciones:

1. Importo el .env para tener los datos de las contraseñas: <br>
    import 'dotenv/config' <br>
2. Primera función: <br>
    console.log(createHash('lucianocoderhouse')) <br>
3. Segunda función: <br>
    const passwordEnc = createHash('lucianocoderhouse') <br>
    console.log(validatePassword('lucianocoderhouse', passwordEnc)) <br>
4. Ubicados en la carpeta utils, ingresamos en la terminal node bcrypt.js <br><br>

Para ejecutar de manera local utils: <br>
Nos paramos en la carpeta utils utilizando cd, e ingresamos node bcrypt.js