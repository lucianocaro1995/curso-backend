import { Router } from "express";
import { getProducts, getProductById, postProduct, putProductById, deleteProductById } from "../controllers/products.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById)
//Utilizamos 2 filtros o middlewares, el de la token jwt y el de autorización como admin. Luego pasamos al controlador "postProduct"
productRouter.post('/', passportError('jwt'), authorization('Admin'), postProduct)
productRouter.put('/:id', passportError('jwt'), authorization('Admin'), putProductById)
productRouter.delete('/:id', passportError('jwt'), authorization('Admin'), deleteProductById)

export default productRouter