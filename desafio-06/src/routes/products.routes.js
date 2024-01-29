import { Router } from "express";
import { ProductManager } from "../dao/DB/productsManager.js";



const productRouter = Router()

//1) GET
productRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await ProductManager.findAll(limit);
        res.status(200).send({ respuesta: 'ok', mensaje: products });
    } catch (error) {
        console.error(error);
        res.status(400).send({ respuesta: 'Error', mensaje: error.message });
    }
});

//2) GET(id)
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await ProductManager.findById(id);
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod });
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error });
    }
});

//3) POST
productRouter.post('/', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const prod = await ProductManager.create({ title, description, stock, code, price, category });
        res.status(200).send({ respuesta: 'OK', mensaje: prod });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear productos', mensaje: error });
    }
});

//4) PUT(id)
productRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price, status, stock, category } = req.body;
    try {
        const product = await ProductManager.updateById(id, { title, description, price, stock, category, status });
        if (product)
            res.status(200).send({ respuesta: 'OK product updated', mensaje: product });
        else
            res.status(404).send({ respuesta: 'Error', mensaje: 'Product not found' });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error updating product', mensaje: error.message });
    }
});

//5) DELETE(id)
productRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await ProductManager.deleteById(id);
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' });
        else
            res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error });
    }
});



export default productRouter