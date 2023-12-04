import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controller.js";

const productRouter = Router()

//Estos 2 primeros endpoints no llevan autorización porque todos deberían poder ver los productos, incluso los que no se registraron
productRouter.get('/', productController.getProducts)

productRouter.get('/:id', productController.getProductById)

productRouter.post('/', passportError('jwt'), authorization('admin'), productController.createProduct)

productRouter.put('/:id', passportError('jwt'), authorization('admin'), productController.updateProductById)

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), productController.deleteProductById)

export default productRouter