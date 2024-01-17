import mongoose from 'mongoose'
import supertest from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'

const api = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)

let cartId = null
let productId = '650636d0d3c359de670f30a8'





describe('Test CRUD de carritos en la ruta api/carts', function () {

    //1)
    it('Agregar un producto al carrito o actualizar su cantidad mediante método POST', async () => {
        const productToAdd = {
            id: productId,
            quantity: 1,
        };

        //Acá yo estoy creando un nuevo carrito, por eso puse valor null en la variable cartId
        //Creo un nuevo carrito para los tests, así no utilizo el carrito de un usuario
        const response = await api.post('/api/carts').send(productToAdd);

        expect(response.body).to.be.an('object');
        expect(response.body.productId).to.equal(productToAdd.id);
        expect(response.body.quantity).to.equal(productToAdd.quantity);

        //Guardo el ID del carrito para usarlo en los siguientes tests
        cartId = response.body._id;
    });

    //2)
    it('Eliminar un producto del carrito o actualizar su cantidad mediante método DELETE', async () => {
        if (!cartId) {
            throw new Error('No hay un carrito válido para realizar este test');
        }

        const response = await api.delete(`/api/carts/${cartId}/products/${productId}`);

        expect(response.body).to.be.an('object');
        expect(response.body.productId).to.equal(productId);
        expect(response.body.quantity).to.equal(-1);
    });

    //3)
    it('Eliminar todos los productos del carrito mediante método DELETE', async () => {
        if (!cartId) {
            throw new Error('No hay un carrito válido para realizar este test');
        }

        const response = await api.delete(`/api/carts/${cartId}`);

        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Carrito vaciado exitosamente');
    });

    //4)
    it('Comprar todo lo que hay dentro del carrito mediante método POST', async () => {
        if (!cartId) {
            throw new Error('No hay un carrito válido para realizar este test');
        }

        const response = await api.post(`/api/carts/${cartId}/purchase`);

        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Compra realizada con éxito');
    });
    
});