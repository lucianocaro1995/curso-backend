import { Router } from "express";
import { ticketController } from "../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.post("/:cid/purchase", ticketController.postCompra);

export default ticketRouter;