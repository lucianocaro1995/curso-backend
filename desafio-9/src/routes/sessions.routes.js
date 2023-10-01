import { Router } from "express";
import passport from "passport";



const sessionRouter = Router()

//1) POST: register
//Poner esto en la ruta: http://localhost:4000/api/sessions/register
sessionRouter.post('/register', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario ya existente" })
        }

        res.status(200).send({ mensaje: 'Usuario registrado' })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` })
    }
})

//2) POST: login
//Poner esto en la ruta: http://localhost:4000/api/sessions/login
//Acá utilizamos passport como middleware. Los middleware trabajan de esta forma: si resulta exitoso, sigo con el resto del código
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

        res.status(200).send({ payload: req.user })
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
    //res.status(200).send({ resultado: 'Usuario deslogueado' })
    res.redirect('rutaLogin', 200, { resultado: 'Usuario deslogueado' }) //Redirección. Hace que automáticamente se pase de una ruta a otra
})

//4) GET: github (para registrarme)
//Poner esto en la ruta: http://localhost:4000/api/sessions/github
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.status(200).send({ mensaje: 'Usuario registrado' })
})

//5) GET: githubCallback (para logearme)
//Poner esto en la ruta: http://localhost:4000/api/sessions/githubCallback
sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.status(200).send({ mensaje: 'Usuario logueado' })
})



export default sessionRouter