import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controller.js";
import upload from "../config/multer.js"

const productRouter = Router()





//Rutas en orden pedidas en el test de Postman:
productRouter.get('/', productController.getProducts)

productRouter.post('/', passportError('jwt'), authorization('admin'), productController.createProduct)

productRouter.put('/:id', passportError('jwt'), authorization('admin'), productController.updateProduct)

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), productController.deleteProduct)





//Rutas no pedidas por el test de Postman:
productRouter.get('/:id', productController.getProductById)

productRouter.post("/:pid/images", upload.array('productImage', 6), productController.uploadProductImages);

export default productRouter