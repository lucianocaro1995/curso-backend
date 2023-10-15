//Acá creo métodos que voy a utilizar en "routes"
//Importante a saber: yo acá utilizo algunos métodos ya creados por Mongoose. Puedo ver todos los métodos que crearon en la página web de Mongoose



import { messageModel } from "../models/messages.models.js"

class MessageDAO {
    async findAll(limit) {
        return await messageModel.find().limit(limit);
    }

    async create(messageData) {
        return await messageModel.create(messageData);
    }
}

export const MessagesManager = new MessageDAO();