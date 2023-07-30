//Creo la clase ProductManager junto a los métodos requeridos: addProduct, getProducts y getProductById
//El id autoincrementable lo logro con ++ en el método addProduct
//El método para validar se realiza para asegurar que no haya campos faltantes y que el código del producto sea único antes de agregarlo a la lista
class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(product) {
        if (!this.validateProduct(product)) {
            console.error("Error: Invalid product data or duplicated code.");
            return;
        }

        product.id = this.productIdCounter++;
        this.products.push(product);
    }

    validateProduct(product) {
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        if (!product || !Object.keys(product).every((field) => requiredFields.includes(field))) {
            return false;
        }

        if (this.products.some((p) => p.code === product.code)) {
            return false;
        }

        return true;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error("Error: Product not found.");
        }
        return product;
    }
}

// Ejemplo de uso:
const productManager = new ProductManager();

const product1 = {
    title: "Product 1",
    description: "This is product 1",
    price: 19.99,
    thumbnail: "ejemploImagen1.jpg",
    code: "PROD001",
    stock: 10,
};

const product2 = {
    title: "Product 2",
    description: "This is product 2",
    price: 29.99,
    thumbnail: "ejemploImagen2.jpg",
    code: "PROD002",
    stock: 5,
};

productManager.addProduct(product1);
productManager.addProduct(product2);

const allProducts = productManager.getProducts();
console.log(allProducts);

const productIdToFind = 2;
const productById = productManager.getProductById(productIdToFind);
console.log(productById);