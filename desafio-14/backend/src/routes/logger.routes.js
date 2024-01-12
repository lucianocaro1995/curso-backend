import { Router } from "express";
import { addLogger } from "../config/logger.js";

const loggerRouter= Router();

loggerRouter.use(addLogger);

/*
//La diferencia de este código que comenté, con el de abajo, es que este lo utilizaba para los archivos log

loggerRouter.get('/fatal', (req, res)=>{
    req.logger.fatal("Hola fatal"),
    res.send("Hola mundo")
});

loggerRouter.get('/error', (req, res)=>{
    req.logger.error("Hola error"),
    res.send("Hola mundo")
});

loggerRouter.get('/warning', (req, res)=>{
    req.logger.warning("Hola warning"),
    res.send("Hola mundo")
});

loggerRouter.get('/info', (req, res)=>{
    req.logger.info("Hola info"),
    res.send("Hola mundo")
});

loggerRouter.get('/http', (req, res)=>{
    req.logger.http("Hola http"),
    res.send("Hola mundo")
});

loggerRouter.get('/debug', (req, res)=>{
    req.logger.debug("Hola debug"),
    res.send("Hola mundo")
});
*/

//Esto lo vimos en el after:
//Código necesario en caso de que quiera mostrar los niveles de los distintos loggers visualizados en el navegador
//En este código escribí un texto html con estilos para visualizarlo en el archivo html
//También habría que modificar el filename de cada nivel en el archivo "logger.js" y ponerle .html en vez de .log

loggerRouter.get('/fatal', (req, res)=>{
    req.logger.fatal('<span style="color:red">Texto de nivel Fatal</span><br/>'),
    res.send("Hola mundo")
});

loggerRouter.get('/error', (req, res)=>{
    req.logger.error('<span style="color:yellow">Texto de nivel Error</span><br/>'),
    res.send("Hola mundo")
});

loggerRouter.get('/warning', (req, res)=>{
    req.logger.warning('<span style="color:cyan">Texto de nivel Warning</span><br/>'),
    res.send("Hola mundo")
});

loggerRouter.get('/info', (req, res)=>{
    req.logger.info('<span style="color:blue">Texto de nivel Info</span><br/>'),
    res.send("Hola mundo")
});

loggerRouter.get('/http', (req, res)=>{
    req.logger.http('<span style="color:magenta">Texto de nivel Http</span><br/>'),
    res.send("Hola mundo")
});

loggerRouter.get('/debug', (req, res)=>{
    req.logger.debug('<span style="color:green">Texto de nivel Debug</span><br/>'),
    res.send("Hola mundo")
});





export default loggerRouter