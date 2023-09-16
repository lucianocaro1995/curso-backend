//Acá creo métodos que voy a utilizar en "routes"



import { productModel } from "./products.models.js";

class ProductDAO {
    async findAll(limit) {
        return await productModel.find().limit(limit);
    }

    async findById(id) {
        return await productModel.findById(id);
    }

    async create(productData) {
        return await productModel.create(productData);
    }

    async updateByCode(code, productData) {
        return await productModel.findOneAndUpdate({ code: code }, productData, { new: true });
    }

    async deleteById(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

export const ProductManager = new ProductDAO();