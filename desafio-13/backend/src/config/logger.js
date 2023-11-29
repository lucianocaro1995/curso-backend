import winston from "winston";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'cyan',
        info: 'blue',
        debug: 'gray'
    }
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.File({
            filename: './errors.log',
            level: 'fatal',
            format: winston.format.combine(
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

export const addLogger = (req, res, next) => {
    req.logger = logger
    //Esta petición se está guardando en debug, pero puedo guardarla en otros elementos como info
    req.logger.debug(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

/*
Esto hizo en el "index.js":

import express from 'express'
import { addLogger } from './config/logger.js'
const app = express()
app.use(addLogger)

app.get('/fatal', (req, res) => {
    req.logger.fatal("Hola consola")
    res.send("Hola mundo")
})
app.get('/error', (req, res) => {
    req.logger.error("Hola consola")
    res.send("Hola mundo")
})
app.get('/warning', (req, res) => {
    req.logger.warning("Hola consola")
    res.send("Hola mundo")
})
app.get('/info', (req, res) => {
    req.logger.info("Hola consola")
    res.send("Hola mundo")
})
app.get('/debug', (req, res) => {
    req.logger.debug("Hola consola")
    res.send("Hola mundo")
})

app.listen(4000, console.log("Server on port 4000"))
*/