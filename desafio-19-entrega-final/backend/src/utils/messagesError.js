import passport from "passport";

//Función general para retornar errores en las estrategias de passport
export const passportError = (strategy) => { //Voy a enviar local, github o jwt
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error) //Que la función que me llame maneje como va a responder ante mi error
            }
            if (!user) {
                //O me enviás un objeto con el atributo messages, o me enviás un string
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })

            }

            req.user = user
            next()
        })(req, res, next) //Esto es por que me va a llamar un middleware

    }
}

//Authorization para permitir múltiples roles y administradores
export const authorization = (roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: 'Usuario no autorizado' });
        }

        // Verificar si el rol del usuario está en los roles permitidos
        if (!roles.includes(req.user.user.rol) && !(req.user.user.rol === 'admin' && roles.includes('admin'))) {
            return res.status(403).send({ error: 'Usuario no tiene los permisos necesarios' });
        }

        next();
    };
}