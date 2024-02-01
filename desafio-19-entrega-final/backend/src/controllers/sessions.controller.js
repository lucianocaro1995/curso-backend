import { generateToken } from "../utils/jwt.js";

//1)
const postLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Usuario invalido" })
        }
        /*
        Si siguen con sesiones en BDD, esto no se bora. Si usan JWT si
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
            res.status(200).send({mensaje: "Usuario logueado"})
        }*/

        const token = generateToken(req.user)

        res.status(200).send({ token })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }

}

//2)
const postRegister = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: "Usuario ya existente" });
        }
        res.status(200).send({ mensaje: "Usuario registrado" });
    } catch (error) {
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
    }
};

//3)
const getGithub = async (req, res) => {
    res.status(200).send({ mensaje: "Usuario registrado" });
};

//4)
const getGihubCallback = async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Usuario logueado" });
};

//5)
const getLogout = async (req, res) => {
    /*Si manejo sesiones en base de datos debería usar este código:
    if (req.session.login) {
        req.session.destroy()
    }*/
    res.clearCookie("jwtCookie");
    res.status(200).send({ resultado: "Usuario deslogueado" });
};

//Exportar todas las funciones juntas
export const sessionController = {
    postLogin,
    postRegister,
    getGithub,
    getGihubCallback,
    getLogout
}