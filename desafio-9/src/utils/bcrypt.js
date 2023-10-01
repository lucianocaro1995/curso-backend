import bcrypt from 'bcrypt'



export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))
export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)



/*
Poner en el readme:
Aquí vamos a generar 2 funciones:
1) Esta recibe una contraseña (la que me ingrese mi usuario) y la devuelve encriptada. Esto me permite a mí poder ingresar una contraseña desde el usuario
Agregamos SALT = 15 en el .env
SaltRounds o SALT es la cantidad de veces que se encriptó esta contraseña
Como 10 es el valor por defecto, se recomienda ingresar cualquier valor exceptuando el 10. Cualquier hacker va a intentar primero con el valor por defecto
Hay que parsear el valor de SALT ya que en el .env es un string

2) Sirve para hacer el proceso inverso, desencriptar la contraseña
passwordSend: contraseña enviada por el usuario, sin encriptar
passwordBDD: contraseña de la base de datos, la que se guardó encriptada gracias a la primera función
compareSync: es para ver si las contraseñas coinciden. Esto devuelve true si coinciden

Para hacer console.log de las 2 funciones:
1) Importo el .env para tener los datos de las contraseñas:
import 'dotenv/config'
2) Primera función:
console.log(createHash('lucianocoderhouse'))
3) Segunda función: 
const passwordEnc = createHash('lucianocoderhouse')
console.log(validatePassword('lucianocoderhouse', passwordEnc))
4) Ubicados en la carpeta utils, ingresamos en la terminal node bcrypt.js

Para ejecutar de manera local utils:
Nos paramos en la carpeta utils utilizando cd
Ingresamos node bcrypt.js
*/