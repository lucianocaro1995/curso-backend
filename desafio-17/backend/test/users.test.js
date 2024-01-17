import mongoose from 'mongoose'
import Assert from 'assert'
import 'dotenv/config'
import { userModel } from '../src/models/users.models.js'

const assert = Assert.strict

await mongoose.connect(process.env.MONGO_URL)





describe('Test CRUD de Usuarios en la ruta api/users', function () {
    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a arrancar cada uno de los test
    beforeEach(() => {
        console.log("Comienza test!")
    })
    
    //1)
    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()
        assert.strictEqual(Array.isArray(users), true)
    })

    //2)
    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('65522f69703b5ce26b637e3e')
        //assert.strictEqual(typeof user, 'object') Se puede de esta forma también, pero es mejor la de abajo
        assert.ok(user._id)
    })

    //3)
    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
            first_name: "Roger",
            last_name: "Federer",
            email: "roger@roger.com",
            password: "roger1234"
        }
        const user = await userModel.create(newUser)
        assert.ok(user._id)
    })
    
    //4)
    it('Actualizar un usuario mediante metodo PUT', async () => {
        const udpateUser = {
            first_name: "Rafael",
            last_name: "Nadal",
            email: "rafita@rafita.com",
            password: "rafita1233"
        }
        const user = await userModel.findByIdAndUpdate("65a276c0128afe2aa9472c70", udpateUser)
        assert.ok(user._id)
    })
    
    //5)
    it('Eliminar un usuario mediante metodo DELETE', async () => {
        const resultado = await userModel.findByIdAndDelete("65a2749a463b6e861d4f7aa8")
        assert.strictEqual(typeof resultado, 'object')
    })
})