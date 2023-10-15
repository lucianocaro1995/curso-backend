//En este archivo genero el token

import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    /*
        1° parametro: Objeto asociado al token (Usuario)
        2° parametro: Clave privada para el cifrado
        3° parametro: Tiempo de expiracion
    */

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '12h' })
    console.log(token)

    return token

}

//Esto sirve para generar un token con la información del usuario
//generateToken({ "_id": "650cc75f82d8d6a40adf8ba4", "first_name": "Panchito", "last_name": "Perez", "email": "perez@perez.com", "password": "$2b$15$ycmPZjoPYwD5Pb2hpId4PO6PjnWO7R5iMM8X2Vcxw9kMMbMVtWEIe", "rol": "user", "age": "40" })
//generateToken({ "_id": "6519334576dd676ccdf57dd9", "first_name":"Ignacio", "last_name":"Hernandez", "age":{"$numberInt":"40"}, "email":"ignacio@ignacio.com", "password":"$2b$15$3NtFNCb39VEIp9kXdk7aO.R2PwpJxJKRtSIeCt.rDaL2x2lR7GnQ2", "rol":"user" })



//Una vez ya generado el token, ahora hacemos la validacion
export const authToken = (req, res, next) => {
    //Consultar al header para obtener el Token
    const authHeader = req.headers.Authorization

    if (!authHeader) {
        return res.status(401).send({ error: 'Usuario no autenticado' })
    }

    const token = authHeader.split(' ')[1] //Obtengo el token y descarto el Bearer

    jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
        if (error) {
            return res.status(403).send({ error: 'Usuario no autorizado, token invalido' })
        }
    })

    //Usuario valido
    req.user = credential.user
    next()
}