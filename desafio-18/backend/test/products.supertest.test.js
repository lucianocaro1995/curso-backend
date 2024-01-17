import mongoose from 'mongoose'
import supertest from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'

const api = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)

let productId = '650636d0d3c359de670f30a8'





//Estrategia para el usuario admin
const adminCredentials = {
    email: 'admin@admin.com',
    password: '1234'
};
let adminCookie = '';

//Iniciar sesión como usuario admin antes de ejecutar las pruebas
before(async () => {
    const response = await api.post('/api/sessions/login').send(adminCredentials);
    const cookieResult = response.headers['set-cookie'][0];
    adminCookie = `${cookieResult.split('=')[0]}=${cookieResult.split('=')[1]}`;
});

describe('Test CRUD de productos en la ruta api/products', function () {
    
    //1)
    it('Obtener todos los productos mediante método GET', async () => {
        const response = await api.get('/api/products').set('Cookie', [adminCookie]);
        expect(response.body).to.be.an('array');
    });

    //2)
    it('Obtener un producto mediante método GET ingresando su ID', async () => {
        const response = await api.get(`/api/products/${productId}`).set('Cookie', [adminCookie]);
        expect(response.body._id).to.be.ok;
    });

    //3)
    it('Crear un producto mediante método POST', async () => {
        const newProduct = {
            title: 'Producto de prueba',
            description: 'Descripcion de producto de prueba',
            category: 'Destilados',
            price: 100,
            stock: 10,
            code: 'zxx1234',
            thumbnail: []
        };

        const response = await api.post('/api/products').set('Cookie', [adminCookie]).send(newProduct);
        expect(response.body._id).to.be.ok;
        expect(response.body.status).to.be.true; //Verificar que el status sea true por defecto
    });

    //4)
    it('Actualizar un producto mediante método PUT ingresando su ID', async () => {
        const updatedProduct = {
            title: 'Producto actualizado',
            description: 'Nueva descripción',
            category: 'Actualizados',
            price: 150,
            stock: 15,
            code: 'updated123',
            thumbnail: []
        };

        const response = await api.put(`/api/products/${productId}`).set('Cookie', [adminCookie]).send(updatedProduct);
        expect(response.body._id).to.be.ok;
        expect(response.body.title).to.equal('Producto actualizado');
    });

    //5)
    it('Eliminar un producto mediante método DELETE ingresando su ID', async () => {
        const response = await api.delete(`/api/products/${productId}`).set('Cookie', [adminCookie]);
        expect(response.body).to.be.an('object');
    });

});
