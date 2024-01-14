import mongoose from "mongoose";
import supertest from 'supertest';
import chai from 'chai';
import 'dotenv/config';

const expect = chai.expect;
const api = supertest('http://localhost:4000');

await mongoose.connect(process.env.MONGO_URL);

describe('Test CRUD de Usuarios en la ruta api/users', function () {
    //1)
    it('Obtener todos los usuarios mediante método GET', async () => {
        const response = await api.get('/api/users');
        expect(response.body).to.be.an('array');
    });

    //2)
    it('Obtener un usuario mediante método GET', async () => {
        const response = await api.get('/api/users/65522f69703b5ce26b637e3e');
        expect(response.body._id).to.be.ok;
    });

    //3)
    it('Crear un usuario mediante método POST', async () => {
        const newUser = {
            first_name: "Roger",
            last_name: "Federer",
            email: "roger@roger.com",
            password: "roger1234"
        };
        const response = await api.post('/api/users').send(newUser);
        expect(response.body._id).to.be.ok;
    });

    //4)
    it('Actualizar un usuario mediante método PUT', async () => {
        const updateUser = {
            first_name: "Rafael",
            last_name: "Nadal",
            email: "rafita@rafita.com",
            password: "rafita1233"
        };
        const response = await api.put('/api/users/65a276c0128afe2aa9472c70').send(updateUser);
        expect(response.body._id).to.be.ok;
    });

    //5)
    it('Eliminar un usuario mediante método DELETE', async () => {
        const response = await api.delete('/api/users/65a2749a463b6e861d4f7aa8');
        expect(response.body).to.be.an('object');
    });
});