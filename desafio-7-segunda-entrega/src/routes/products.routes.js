import { Router } from "express";
import { ProductManager } from "../dao/DB/productsManager.js"



const productRouter = Router()

//1) GET
//Poner esto en la ruta: localhost:4000/api/products
productRouter.get('/', async (req, res) => {
    const { limit, page, category, sort } = req.query;

    try {
        const result = await ProductManager.findAll(limit, page, category, sort);

        const response = {
            status: "success",
            payload: result.docs, //Resultado de los productos solicitados
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.prevPage}&category=${category}&sort=${sort}` : null,
            nextLink: result.hasNextPage ? `http://${req.headers.host}${req.baseUrl}?limit=${limit}&page=${result.nextPage}&category=${category}&sort=${sort}` : null
        };

        res.status(200).send(response);
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

//2) GET(id)
//Poner esto en la ruta: localhost:4000/api/products/650636d0d3c359de670f30a8
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await ProductManager.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error })
    }
})

//3) POST
//Poner esto en la ruta: localhost:4000/api/products
productRouter.post('/', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body
    try {
        const prod = await ProductManager.create({ title, description, stock, code, price, category })
        res.status(200).send({ respuesta: 'OK', mensaje: prod })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear productos', mensaje: error })
    }
})

//4) PUT(code)
//Poner esto en la ruta: localhost:4000/api/products/PROD001
productRouter.put('/:code', async (req, res) => {
    const { code } = req.params;
    console.log(code)
    const {title, description, price, status, stock, category} = req.body
    try {
        const product = await ProductManager.updateByCode({ code: code }, { title, description, price, code,  stock, category, status});
        if (product)
            res.status(200).send({respuesta: 'ok product updated', mensaje: product})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error updating product', mensaje: error})
    }
})

//5) DELETE(id)
//Poner esto en la ruta: localhost:4000/api/products/650636d0d3c359de670f30a8
productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await ProductManager.deleteById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' })
        else
            res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
    }
})



export default productRouter