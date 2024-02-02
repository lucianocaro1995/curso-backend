import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controller.js";

const productRouter = Router()





//Rutas en orden desde la primera hasta la última pedidas en el test de Postman:
productRouter.get('/', productController.getProducts)

productRouter.post('/', passportError('jwt'), authorization('admin'), productController.createProduct)

productRouter.put('/:id', passportError('jwt'), authorization('admin'), productController.updateProduct)

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), productController.deleteProduct)





//Rutas no pedidas por el test de Postman:
productRouter.get('/:id', productController.getProductById)

export default productRouter