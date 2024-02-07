import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { cartController } from "../controllers/carts.controller.js";

const cartRouter = Router();





//Rutas en orden pedidas en el test de Postman:
cartRouter.get("/", passportError('jwt'), authorization('admin'), cartController.getCarts);

cartRouter.post("/:cid/product/:pid", passportError('jwt'), authorization(['user','premium']), cartController.addProductCart);

cartRouter.post("/:cid/purchase", passportError('jwt'), authorization(['user','premium']), cartController.createTicket)

cartRouter.put("/:cid", passportError('jwt'), authorization(['user','premium']), cartController.updateCartsProducts);

cartRouter.put("/:cid/product/:pid", passportError('jwt'), authorization(['user','premium']), cartController.updateProductQuantity);

cartRouter.delete("/:cid", passportError('jwt'), authorization(['user','premium']), cartController.deleteCartProducts);

cartRouter.delete("/:cid/product/:pid", passportError('jwt'), authorization(['user','premium']), cartController.deleteCartProduct);





//Rutas no pedidas por el test de Postman:
cartRouter.get("/:cid", passportError('jwt'), authorization(['user','premium','admin']), cartController.getCartById);

export default cartRouter;