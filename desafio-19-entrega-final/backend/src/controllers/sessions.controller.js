import { generateToken } from "../utils/jwt.js";
import { userModel } from "../models/users.models.js";

//1)
const loginUsers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Usuario inválido" });
        }
        //Actualizar last_connection al momento del inicio de sesión
        await userModel.findByIdAndUpdate(req.user._id, { last_connection: new Date() });
        const token = generateToken(req.user);
        res.status(200).send({ token });
    } catch (error) {
        console.error("Error en postLogin:", error);
        res.status(500).send({ mensaje: `Error al iniciar sesión ${error.message}` });
    }
}

//2)
const registerUsers = async (req, res) => {
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
const getGithubCallback = async (req, res) => {
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

//6)
const currentSession = (req, res) => {
    res.send(req.user)
}

//Exportar todas las funciones juntas
export const sessionController = {
    loginUsers,
    registerUsers,
    getGithub,
    getGithubCallback,
    getLogout,
    currentSession
}