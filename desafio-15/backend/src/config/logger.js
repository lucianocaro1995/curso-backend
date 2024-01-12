import winston from "winston";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'cyan',
        info: 'blue',
        http: 'magenta',
        debug: 'green'
    }
}

/*
//La diferencia de este código que comenté, con el de abajo, es que este lo utilizaba para los archivos log

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.File({
            filename: './errors.log',
            level: 'fatal',
            format: winston.format.combine(
                //El colorize se marca así: [31mfatal[39m:
                //Para el archivo .log conviene dejarlo. Para el archivo .html conviene borrarlo
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.log',
            level: 'warning',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.log',
            level: 'http',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            //El profesor no le hizo filename a este
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})
*/

//Esto lo vimos en el after:
//Código necesario en caso de que quiera guardar los loggers en un archivo html, en vez de un archivo log:

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.File({
            filename: './errors.html',
            level: 'fatal',
            format: winston.format.combine(
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.html',
            level: 'error',
            format: winston.format.combine(
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.html',
            level: 'warning',
            format: winston.format.combine(
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.html',
            level: 'info',
            format: winston.format.combine(
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './loggers.html',
            level: 'http',
            format: winston.format.combine(
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                //Acá sí es necesario el colorize porque sino no se ven los colores en la consola
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})





export const addLogger = (req, res, next) => {
    req.logger = logger
    //Esta petición se está guardando en debug, pero puedo guardarla en otros elementos como http, info, etc
    req.logger.debug(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}