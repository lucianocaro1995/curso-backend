//Acá creo métodos que voy a utilizar en "routes"



import { productModel } from "./products.models.js";

class ProductDAO {
    //1)
    async findAll(limit, page, category, sort) {
        let query = {};
        if (category) {
            query.category = category;
        }

        let options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1
        };

        if (sort) {
            options.sort = {
                price: sort === 'asc' ? 1 : -1
            };
        }

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