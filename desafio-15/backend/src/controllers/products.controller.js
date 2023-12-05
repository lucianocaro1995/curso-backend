import { productModel } from "../models/products.models.js";

//1)
const getProducts = async (req, res) => {
    //Incluimos paginate (también debimos agregar paginate a la colección products)
    const { limit, page, filter, sort } = req.query

    const pag = page ? page : 1
    const lim = limit ? limit : 10
    const ord = sort == 'asc' ? 1 : -1

    try {
        const prods = await productModel.paginate({ filter: filter }, { limit: lim, page: pag, sort: { price: ord } })
        if (prods) {
            return res.status(200).send(prods)
        }
        res.status(404).send({ error: "Productos no encontrados" })
    } catch (error) {
        res.status(500).send({ error: `Error en consultar productos ${error}` })
    }
}

//2)
const getProductById = async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        res.status(500).send({ error: `Error en consultar producto ${error}` })
    }
}

//3)
const createProduct = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body

    try {
        const prod = await productModel.create({ title, description, code, price, stock, category })
        if (prod) {
            return res.status(201).send(prod)
        }
        res.status(400).send({ error: `Error en crear producto` })
    } catch (error) {
        if (error.code == 11000) { //error code es de llave duplicada
            return res.status(400).send({ error: "Producto ya creado con llave duplicada" })
        }
        res.status(500).send({ error: `Error en crear producto ${error}` })
    }
}

//4)
const updateProductById = async (req, res) => {
    const { id } = req.params
    const { title, description, code, price, stock, category } = req.body
    try {
        //Agregando { new: true } devuelvo el producto actualizado en lugar de devolver el producto original
        const prod = await productModel.findByIdAndUpdate(id, { title, description, code, price, stock, category }, { new: true })
        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        res.status(500).send({ error: `Error en actualizar producto ${error}` })
    }
}

//5)
const deleteProductById = async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findByIdAndDelete(id)
        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar producto ${error}` })
    }
}

//Exportar todas las funciones juntas
export const productController = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}