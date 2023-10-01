import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import passport from 'passport'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { userModel } from '../dao/models/users.models.js'



//Defino la estregia a utilizar: autenticación de manera local, utilizando email y contraseña
const LocalStrategy = local.Strategy

const initializePassport = () => {

    //1) Estrategia register
    //Registrarse con 4 parámetros: nombre, apellido, email, edad
    passport.use('register', new LocalStrategy(
        //Cuando yo envío mi contraseña, siempre devuelvo como un callback (ya sea en caso de error o éxito, o en caso de que no encuentre el usuario)
        //done es como un return cuando utilizamos passport
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //Registro de usuario
            const { first_name, last_name, email, age } = req.body
            try {
                //Verifico si existe el mail
                const user = await userModel.findOne({ email: email })
                if (user) {
                    //Si el mail existe no se puede registrar, ya que no es posible registrar 2 veces el mismo mail
                    return done(null, false)
                }
                //Crear usuario
                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: email,
                    password: passwordHash
                })
                //ponemos null en caso de que no haya error
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }))

    //2) Estrategia login
    //Loguearse con 2 parámetros: email y contraseña
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            try {
                //Si el usuario/email no existe, o si la contraseña no es válida, no permito iniciar sesión
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    return done(null, false)
                }
                //Primer parámetro: lo que me envió el usuario - Segundo parámetro: datos guardados en la base de datos
                if (validatePassword(password, user.password)) {
                    return done(null, user)
                }
                return done(null, false)
            } catch (error) {
                return done(error)
            }
        }))

    //3) Estrategia github
    //Con esto me logeo utilizando a github, en vez de escribir mi email y contraseña
    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        //Consulto los datos del usuario que se quiere loguear
        try {
            console.log(accessToken)
            console.log(refreshToken)
            console.log(profile._json)
            const user = await userModel.findOne({ email: profile._json.email })
            if (user) {
                done(null, user)
            } else {
                //Elimino los espacios que tengo en el nombre de github: Luciano Caro
                const nombre_github_sin_espacios = profile._json.name.replace(/\s/g, '');

                const userCreated = await userModel.create({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18, //Edad por defecto
                    password: createHash(profile._json.email + nombre_github_sin_espacios) //La contraseña va a ser mi email + mi nombre
                })
                done(null, userCreated)
            }
        } catch (error) {
            done(error)
        }
    }))

    //4) Cuando yo me logueo/accedo, generamos una sesión en la base de datos
    //Cada sesión debe ser única, esto lo hacemos otorgándole un id único
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //5) Eliminar la sesión del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport