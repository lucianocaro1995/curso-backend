//Acá creo métodos que voy a utilizar en "routes"



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