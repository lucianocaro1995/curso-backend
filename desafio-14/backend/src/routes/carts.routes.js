import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { cartController } from "../controllers/carts.controller.js";

const cartRouter = Router();

//Utilizamos 2 filtros o middlewares en estos endpoints, el de la token jwt y el de autorización como admin
//Una vez superados los filtros, pasamos al controlador "cartController"
cartRouter.get("/", passportError('jwt'), authorization('admin'), cartController.getCarts);

cartRouter.get("/:cid", passportError('jwt'), authorization('admin'), cartController.getCartById);

cartRouter.delete("/:id", passportError('jwt'), authorization('user'), cartController.cleanCart);

cartRouter.delete("/:cid/products/:pid", passportError('jwt'), authorization('user'), cartController.deleteProductInCart);

cartRouter.put("/:cid", passportError('jwt'), authorization('user'), cartController.updateCart);

//No le veo mucho sentido a este endpoint. Para qué me sirve actualizar la cantidad de un sólo producto y no actualizar el carrito entero?
//Además el post "/:cid/products/:pid" hace casi lo mismo
cartRouter.put("/:cid/products/:pid", passportError('jwt'), authorization('user'), cartController.updateProductQuantity);

//No tiene sentido crear un carrito ya que al crearse un usuario, éste se crea con su propio carrito
//Solamente me serviría para crear un carrito en Postman y probar códigos en él, así no pruebo código sobre el carrito de un usuario
cartRouter.post("/", passportError('jwt'), authorization('admin'), cartController.createCart);

cartRouter.post("/:cid/products/:pid", passportError('jwt'), authorization('user'), cartController.addOrUpdateProductInCart);

cartRouter.post("/:cid/purchase", passportError('jwt'), authorization('user'), cartController.purchaseCart)

export default cartRouter;