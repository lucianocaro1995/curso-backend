import { promises as fs } from "fs";



class ProductManager {
    constructor() {
        this.path = './src/products.json';
    }

    //1)
    async getProducts() {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForProds = JSON.parse(readJson);
        return arrayForProds;
    }

    //2)
    async getProductById(id) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForProds = JSON.parse(readJson);
        const product = arrayForProds.find(prod => prod.id === id);

        if (product) {
            return product;
        } else {
            console.log("No existe un producto con ese ID");
            return false;
        }
    }

    //3)
    async getProductByCode(code) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForProds = JSON.parse(readJson);
        const product = arrayForProds.find(prod => prod.code === code);

        if (product) {
            return product;
        } else {
            console.log("No existe un producto con ese Código");
            return false;
        }
    }

    //4)
    async addProduct(title, description, category, thumbnail, price, stock, code) {
        try {
            const readJson = await fs.readFile(this.path, 'utf-8');
            let arrayForProds = JSON.parse(readJson);
    
            const requiredFields = [
                title,
                description,
                category,
                thumbnail,
                price,
                stock,
                code,
            ];
    
            const missingField = requiredFields.find(field => !field);
    
            if (missingField) {
                console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
                return false;
            }
    
            const codeExists = arrayForProds.some(prod => prod.code === code);
            if (codeExists) {
                console.log("Ya existe un producto con ese código");
                return false;
            }
    
            const newId = Product.generateId(arrayForProds);
            const newProduct = new Product(title, description, category, thumbnail, price, stock, code, newId);
            arrayForProds.push(newProduct);
    
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto agregado exitosamente");
            return true;
        } catch (error) {
            console.log("Error al agregar el producto");
            return false;
        }
    }

    //5)
    async updateProduct(id, product) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        let arrayForProds = JSON.parse(readJson);

        const requiredFields = [
            title,
            description,
            category,
            thumbnail,
            price,
            stock,
            code,
        ];

        const missingField = requiredFields.find(field => !product[field]);

        if (missingField) {
            console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
            return false;
        }

        const indice = arrayForProds.findIndex(prod => prod.id == id);
        if (indice !== -1) {
            const productId = arrayForProds[indice].id;
            const updatedProduct = { ...product, id: productId };
            arrayForProds[indice] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto actualizado");
            return true;
        } else {
            console.log("No existe un producto con ese ID");
            return false;
        }
    }

    //6)
    async deleteProduct(id) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        let arrayForProds = JSON.parse(readJson);
        const productIndex = arrayForProds.findIndex(prod => prod.id === id);

        if (productIndex !== -1) {
            arrayForProds.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto eliminado exitosamente");
            return true;
        } else {
            console.log("No existe un producto con ese ID");
            return false;
        }
    }
}




class Product {
    constructor(title, description, category, thumbnail, price, stock, code, id) {
        this.status = "disponible";
        this.title = title;
        this.description = description;
        this.category = category;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.code = code;
        this.id = id;
    }

    static generateId(allProducts) {
        let newId = 1;
        const existingIds = new Set(allProducts.map(product => product.id));

        while (existingIds.has(newId)) {
            newId++;
        }
        return newId;
    }
}



export default ProductManager;