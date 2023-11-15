//Enrutador
import { Router } from "express";
import cartRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./sessions.routes.js";
import ticketRouter from "./ticket.routes.js";
import userRouter from "./users.routes.js";

//Rutas
const router = Router()

router.use('/api/carts', cartRouter)
router.use('/api/products', productRouter)
router.use('/api/sessions', sessionRouter)
router.use('/api/tickets', ticketRouter)
router.use('/api/users', userRouter)

export default router