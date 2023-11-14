//Enrutador
import { Router } from "express";
import cartRouter from "./carts.routes.js";
import messageRouter from "./messages.routes.js"
import productRouter from "./products.routes.js";
import sessionRouter from "./sessions.routes.js";
import userRouter from "./users.routes.js";

//Rutas
const router = Router()

router.use('/api/carts', cartRouter)
router.use('/api/products', productRouter)
router.use('/api/messages', messageRouter)
router.use('/api/sessions', sessionRouter)
router.use('/api/users', userRouter)

export default router