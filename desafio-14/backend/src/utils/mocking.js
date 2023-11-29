import { faker } from "@faker-js/faker"



const modelProduct = async () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.binary(),
        category: faker.commerce.productAdjective(),
        status: faker.datatype.boolean(),
        code: faker.location.countryCode(),
        thumbnails: faker.image.avatar(),
    }
}

export const createRandomProducts = async (cantProducts) => {
    const products = []
    for(let i = 0; i < cantProducts; i++) {
        const product = await modelProduct();
        products.push(product);
    }
    return products
}