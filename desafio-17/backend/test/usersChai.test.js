import mongoose from 'mongoose'
import { expect } from 'chai'
import { userModel } from '../src/models/users.models.js'

await mongoose.connect(process.env.MONGO_URL)





describe('Test CRUD Users con chai en api/users', function () {

    //1)
    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()
        //expect(users).equal([]) //Si espero array vacio
        //expect(Array.isArray(users)).to.be.ok //Verdadero es Ok y falso no
        expect(users).not.to.be.deep.equal([]) //Solamente pasa si el array contiene datos
    })

    //2)
    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('65522f69703b5ce26b637e3e')
        expect(user).to.have.property('_id')
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
        expect(user).to.have.property('_id')
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
        expect(user).to.have.property('_id')
    })

    //5)
    it('Eliminar un usuario mediante metodo DELETE', async () => {
        const resultado = await userModel.findByIdAndDelete("65a2749a463b6e861d4f7aa8")
        expect(resultado).to.be.ok
    })
})