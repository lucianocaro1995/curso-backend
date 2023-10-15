//Acá creo métodos que voy a utilizar en "routes"
//Importante a saber: yo acá utilizo algunos métodos ya creados por Mongoose. Puedo ver todos los métodos que crearon en la página web de Mongoose



import { productModel } from "../models/products.models.js";

class ProductDAO {
    //1)
    //Utilizo 4 parámetros en este método: limit, page, category y sort
    async findAll(limit, page, category, sort) {
        let query = {};
        //Limit y page: devuelvo 10 productos por cada página
        let options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1
        };
        //Category: si se indica una categoría, devuelvo los productos que pertenezcan a esa categoría
        if (category) {
            query.category = category;
        }
        //Sort: es ascendente, así que se ordenan los productos de menor a mayor precio
        if (sort) {
            options.sort = {
                price: sort === 'asc' ? 1 : -1
            };
        }
        //Paginate: lo utilizo para buscar productos con filtros, paginación y ordenamiento personalizado según los parámetros proporcionados
        return await productModel.paginate(query, options);
    }

    //2)
    async findById(id) {
        return await productModel.findById(id);
    }

    //3)
    async create(productData) {
        return await productModel.create(productData);
    }

    //4)
    async updateByCode(code, productData) {
        return await productModel.findOneAndUpdate({ code: code }, productData, { new: true });
    }

    //5)
    async deleteById(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

export const ProductManager = new ProductDAO();