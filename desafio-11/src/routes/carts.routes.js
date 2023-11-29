import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/", cartController.getCarrito);

cartRouter.get("/:cid", cartController.getCarritoById);

cartRouter.post("/", cartController.postCarrito);

cartRouter.post("/:cid/products/:pid", cartController.postCarritoByProductId);

cartRouter.delete("/:id", cartController.deleteById);

cartRouter.put("/:cid/products/:pid", cartController.putCarritoByProductId);

cartRouter.delete("/:cid/products/:pid", cartController.deleteProductById);

cartRouter.put("/:cid", cartController.putCarrito);

export default cartRouter;