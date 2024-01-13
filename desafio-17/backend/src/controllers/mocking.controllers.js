import { createRandomProducts } from "../utils/mocking.js";

export const getfakerProducts = async (req, res) => {
    try {
        const products = await createRandomProducts(100);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos' });
    }
}