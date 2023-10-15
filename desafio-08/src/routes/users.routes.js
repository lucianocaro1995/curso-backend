import { Router } from "express";
import { userModel } from "../dao/models/users.models.js";



const userRouter = Router()

//1) GET
//Poner esto en la ruta: localhost:4000/api/users
userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send({respuesta: 'Ok', mensaje: users})
    } catch (error) {
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

//2) GET(id)
//Poner esto en la ruta: localhost:4000/api/users/id
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en consultar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar usuario', mensaje: error })
    }
})

//3) POST
//Poner esto en la ruta: localhost:4000/api/users
//Agregar por una única vez el parámetro rol, luego de password, para crear al usuario que va a ser admin
userRouter.post('/', async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body
    try {
        const respuesta = await userModel.create({ first_name, last_name, age, email, password })
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear usuario', mensaje: error })
    }
})

//4) PUT(id)
//Poner esto en la ruta: localhost:4000/api/users/id
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, edad, email, password } = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, { nombre, apellido, edad, email, password })
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar usuario', mensaje: error })
    }
})

//5) DELETE(id)
//Poner esto en la ruta: localhost:4000/api/users/id
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar usuario', mensaje: error })
    }
})



export default userRouter