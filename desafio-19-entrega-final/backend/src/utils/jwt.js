import 'dotenv/config'
import jwt from 'jsonwebtoken'

//1) Generar el token y definir expiración
export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '12h' })
    return token
}

//2) Una vez ya generado el token, ahora hacemos la validacion. Si pasamos estos filtros, vamos a generar sesión
export const authToken = (req, res, next) => { //Generalmente next es un middleware
    //Primer filtro: tenes el token?
    //Consultar al header para obtener el Token
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({ error: 'Usuario no autenticado' })
    }

    // Segundo filtro: el token es valido?
    const token = authHeader.split(' ')[1]; // Obtengo el token y descarto el Bearer

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).send({ error: 'Usuario no autorizado, token invalido' });
        }
        // El token es válido, y la información del usuario está en 'decoded'
        req.user = decoded.user;
        next();
    });
};