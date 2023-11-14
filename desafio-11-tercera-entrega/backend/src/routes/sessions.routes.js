import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { generateToken } from "../utils/jwt.js";



const sessionRouter = Router()



//1) POST: register
//Poner esto en la ruta: http://localhost:4000/api/sessions/register
//Acá utilizamos passport como middleware, y utilizamos la estrategia register que creamos en "passport.js"
sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ success: false, message: "Usuario ya existente" });
        }
        //res.status(200).send({ mensaje: 'Usuario registrado' }) //Para probar en Postman, en vez de usar redirect ya que no se puede ambas
        res.redirect(301, '/login');
        console.log('Usuario registrado con éxito y redirigido a /login');
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error al registrar usuario ${error}` });
    }
});


//2) POST: login
//Poner esto en la ruta: http://localhost:4000/api/sessions/login
//Acá utilizamos passport como middleware, y utilizamos la estrategia login que creamos en "passport.js"
sessionRouter.post('/login', passport.authenticate('login'), async (req, res) => {
    try {
        //Si no existe el usuario, enviamos un mensaje
        if (!req.user) {
            return res.status(401).send({ mensaje: "Usuario invalido" })
        }

        //Si existe el usuario, creamos una sesión con los datos del usuario
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }

        //Generamos una cookie cuando inicie sesión
        const token = generateToken(req.user)

        res.status(200).send({ token })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }
})

//3) GET: logout
//Poner esto en la ruta: http://localhost:4000/api/sessions/logout
sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }

    //res.status(200).send({ mensaje: 'Usuario deslogueado' }) //Para probar en Postman, en vez de usar redirect ya que no se puede ambas
    res.clearCookie('jwtCookie') //Elimino la cookie cuando me deslogueo
    res.redirect(301, '/login')
    console.log('Usuario deslogueado con éxito y redirigido a /login');
})

//4) GET: github (para registrarme)
//Poner esto en la ruta: http://localhost:4000/api/sessions/github
//Acá utilizamos passport como middleware, y utilizamos la estrategia github que creamos en "passport.js"
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    //res.status(200).send({ mensaje: 'Usuario registrado' }) //Para probar en Postman, en vez de usar redirect ya que no se puede ambas
    res.redirect(301, '/home')
    console.log('Usuario registrado con éxito utilizando GitHub y redirigido a /home');
})

//5) GET: githubCallback (para logearme)
//Poner esto en la ruta: http://localhost:4000/api/sessions/githubCallback
//Acá utilizamos passport como middleware, y utilizamos la estrategia github que creamos en "passport.js"
sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    //res.status(200).send({ mensaje: 'Usuario registrado' }) //Para probar en Postman, en vez de usar redirect ya que no se puede ambas
    res.redirect(301, '/home')
    console.log('Usuario logueado con éxito utilizando GitHub y redirigido a /home');
})

//6) Get
//Poner esto en la ruta: http://localhost:4000/api/sessions/testJWT
//Verifica que el token enviado sea valido (se utiliza la misma contraseña en encriptación)
sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req)
    res.send(req.user)
})

//7) GET
//Poner esto en la ruta: http://localhost:4000/api/sessions/current
//Toma el token de la cookie, y nos devuelve el usuario asociado
//Nos permite manejar un filtro para que, las rutas de products solamente las pueda manejar el admin
sessionRouter.get('/current', passportError('jwt'), authorization('Admin'), (req, res) => {
    res.send(req.user)
})

//8)
//Código necesario para "home.js" así muestro información personalizada para dar la bienvenida en "/home"
sessionRouter.get('/user', (req, res) => {
    if (req.session.user) {
        const user = req.session.user
        res.status(200).send(user)
    }
})

export default sessionRouter