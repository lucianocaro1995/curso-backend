import { Router } from "express";
import { messagesController } from "../controllers/messages.controller.js";

const messageRouter= Router();

messageRouter.get('/', messagesController.getMess)

messageRouter.post('/', messagesController.postMess)

export default messageRouter;