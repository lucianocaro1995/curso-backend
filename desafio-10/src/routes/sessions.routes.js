import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";



const sessionRouter = Router()



//1) POST: register
//Poner esto en la ruta: http://localhost:4000/api/sessions/register
//Acá utilizamos passport como middleware, y utilizamos la estrategia register que creamos en "passport.js"
sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ success: false, message: "Usuario ya existente" });
        }
        //res.status(200).send({ mensaje: 'Usuario registrado' })
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
        //res.status(200).send({ payload: req.user })
        res.redirect(301, '/home')
        console.log('Usuario logueado con éxito y redirigido a /home');
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
    //res.status(200).send({ mensaje: 'Usuario deslogueado' })
    res.redirect(301, '/login')
    console.log('Usuario deslogueado con éxito y redirigido a /login');
})

//4) GET: github (para registrarme)
//Poner esto en la ruta: http://localhost:4000/api/sessions/github
//Acá utilizamos passport como middleware, y utilizamos la estrategia github que creamos en "passport.js"
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    //res.status(200).send({ mensaje: 'Usuario registrado' })
    res.redirect(301, '/home')
    console.log('Usuario registrado con éxito utilizando GitHub y redirigido a /home');
})

//5) GET: githubCallback (para logearme)
//Poner esto en la ruta: http://localhost:4000/api/sessions/githubCallback
//Acá utilizamos passport como middleware, y utilizamos la estrategia github que creamos en "passport.js"
sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    //res.status(200).send({ mensaje: 'Usuario registrado' })
    res.redirect(301, '/home')
    console.log('Usuario logueado con éxito utilizando GitHub y redirigido a /home');
})

//6)
//Código necesario para "home.js" así muestro información personalizada para dar la bienvenida en "/home"
sessionRouter.get('/user', (req, res) => {
    if (req.session.user) {
        const user = req.session.user
        res.status(200).send(user)
    }
})

//7)
//Verifica que el token enviado sea valido (misma contraseña de encriptación)
sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req)
    res.send(req.user)
})

//8)
//Poner esto en la ruta: http://localhost:4000/api/sessions/current
sessionRouter.get('/current', passportError('jwt'), authorization('Admin'), (req, res) => {
    res.send(req.user)
})

export default sessionRouter