import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controller.js";

const productRouter = Router()

productRouter.get('/', productController.getProducts)

productRouter.get('/:pid', productController.getProductById)

productRouter.post('/', passportError('jwt'), authorization('admin'), productController.createProduct)

productRouter.put('/:pid', passportError('jwt'), authorization('admin'), productController.updateProductById)

productRouter.delete('/:pid', passportError('jwt'), authorization('admin'), productController.deleteProductById)

export default productRouter