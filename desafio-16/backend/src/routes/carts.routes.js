import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { cartController } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/", passportError('jwt'), authorization('admin'), cartController.getCarts);

cartRouter.get("/:cid", passportError('jwt'), authorization('admin'), cartController.getCartById);

cartRouter.put("/:cid", passportError('jwt'), authorization('user'), cartController.updateCart);

cartRouter.delete("/:cid", passportError('jwt'), authorization('user'), cartController.cleanCart);

cartRouter.delete("/:cid/products/:pid", passportError('jwt'), authorization('user'), cartController.deleteProductInCart);

cartRouter.post("/:cid/products/:pid", passportError('jwt'), authorization('user'), cartController.addOrUpdateProductInCart);

cartRouter.post("/:cid/purchase", passportError('jwt'), authorization('user'), cartController.purchaseCart)

export default cartRouter;