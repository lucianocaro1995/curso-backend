import passport from "passport";

// Función general para retornar errores en las estrategias de passport
export const passportError = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error);
            }
            if (!user) { // Cambiado de !req.user a !user
                // Cambiado de info.messages a info.message (con el cambio se espera un único mensaje de error)
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }

            req.user = user; // Establecer req.user correctamente
            next();
        })(req, res, next);
    };
};

// Recibo un rol y establezco la capacidad del usuario
export const authorization = (roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: 'unathorized user: No existe sesión activa' });
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(401).send({ error: 'do not have permissions', user: req.user });
        }

        next();
    };
}

