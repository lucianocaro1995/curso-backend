import { Router } from "express";
import { productModel } from "../dao/models/products.models.js"
import { passportError, authorization } from "../utils/messagesError.js";



const productRouter = Router()

//1) GET
//Poner esto en la ruta: http://localhost:4000/api/products
productRouter.get('/', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { limit, page, category, sort } = req.query;
    try {
        const prods = await productModel.paginate({ category: category }, { limit: limit, page: page, sort: { price: sort } });

        const response = {
            status: "success",
            payload: prods.docs,
            totalPages: prods.totalPages,
            prevPage: prods.prevPage,
            nextPage: prods.nextPage,
            page: prods.page,
            hasPrevPage: prods.hasPrevPage,
            hasNextPage: prods.hasNextPage,
            prevLink: prods.hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${prods.prevPage}&category=${category}&sort=${sort}` : null,
            nextLink: prods.hasNextPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${prods.nextPage}&category=${category}&sort=${sort}` : null
        };

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ respuesta: 'Error', mensaje: error.message, error: error });
    }
})

//2) GET(id)
//Poner esto en la ruta: http://localhost:4000/api/products/id
productRouter.get('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error })
    }
})

//3) POST
//Poner esto en la ruta: http://localhost:4000/api/products
productRouter.post('/', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { title, description, stock, code, price, category } = req.body
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category })
        res.status(200).send({ respuesta: 'OK', mensaje: prod })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear productos', mensaje: error })
    }
})

//4) PUT(id)
productRouter.put('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { id } = req.params;
    const { title, description, price, status, stock, category } = req.body;
    try {
        const product = await productModel.findByIdAndUpdate(id, { title, description, price, stock, category, status }, { new: true })
        if (product)
            res.status(200).send({ respuesta: 'OK product updated', mensaje: product });
        else
            res.status(404).send({ respuesta: 'Error', mensaje: 'Product not found' });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error updating product', mensaje: error.message });
    }
});

//5) DELETE(id)
//Poner esto en la ruta: http://localhost:4000/api/products/id
productRouter.delete('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.deleteById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' })
        else
            res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
    }
})



export default productRouter