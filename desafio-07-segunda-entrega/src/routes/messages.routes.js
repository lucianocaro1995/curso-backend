import { Router } from "express";
import { messageModel } from "../dao/models/messages.models.js";

const messageRouter = Router();

//1) GET
//Ir a esta ruta para poder utilizar el chat: localhost:4000/chat
messageRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const messages = await messageModel.find().limit(limit);
        res.status(200).send({ respuesta: 'ok', mensaje: messages });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error', mensaje: error });
    }
});

//2) POST
//Ir a esta ruta para poder utilizar el chat: localhost:4000/chat
messageRouter.post('/', async (req, res) => {
    const { email, message } = req.body;
    try {
        const newMessage = await messageModel.create({ email, message });
        res.status(200).send({ respuesta: 'OK message send', mensaje: newMessage });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error sending message', mensaje: error });
    }
});

export default messageRouter;