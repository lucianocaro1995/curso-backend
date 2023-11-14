import { Router } from "express";
import { userModel } from "../models/users.models.js";



const userRouter = Router()

//1) GET
//Poner esto en la ruta: http://localhost:4000/api/users
userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send({respuesta: 'Ok', mensaje: users})
    } catch (error) {
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

//2) GET(id)
//Poner esto en la ruta: http://localhost:4000/api/users/id
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

//3) PUT(id)
//Poner esto en la ruta: http://localhost:4000/api/users/id
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const { first_name, last_name, age, email, password } = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, { first_name, last_name, age, email, password })
        if (user) {
            res.status(200).send({ respuesta: 'OK', mensaje: user })
        } else {
            res.status(404).send({ respuesta: 'Error en actualizar usuario', mensaje: 'User not Found' })
        }
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar usuario', mensaje: error })
    }
})

//4) DELETE(id)
//Poner esto en la ruta: http://localhost:4000/api/users/id
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