import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controller.js";

const productRouter = Router()

productRouter.get('/', productController.getProducts)
productRouter.get('/:id', productController.getProductById)
//Utilizamos 2 filtros o middlewares, el de la token jwt y el de autorización como admin. Luego pasamos al controlador "postProduct"
productRouter.post('/', passportError('jwt'), authorization('Admin'), productController.postProduct)
productRouter.put('/:id', passportError('jwt'), authorization('Admin'), productController.putProductById)
productRouter.delete('/:id', passportError('jwt'), authorization('Admin'), productController.deleteProductById)

export default productRouter