## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver el localhost:4000 en mi navegador
2. En este desafío trabajamos autenticación de manera local (ingresar a nuestra aplicación con email y contraseña) y autenticación por terceros (ingresar a nuestra aplicación utilizando github)
3. Incluimos un archivo "bcrypt.js" para generar un hasheo de contraseña. Nos permite encriptar las contraseñas guardadas en la base de datos
4. Incluimos un archivo "passport.js" en donde creamos los códigos necesarios para registrarnos y logearnos



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



## Comentarios sobre el archivo "bcrypt.js"

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
    compareSync: es para ver si las contraseñas coinciden. Esto devuelve true si coinciden

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