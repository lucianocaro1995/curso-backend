import { userModel } from "../models/user.models.js";

// controladores del modelo de usuarios
export const getUsers = async (req, res) => {
    const {limit, page} = req.query;
    let query = {};  
    let options = {
        lim: parseInt(limit) || 10,
        pag: parseInt(page) || 1
    };

    try {
        const users = await userModel.paginate(query, options);

        if(users) {
            return res.status(200).send(users)
        }
        res.status(404).send({message: 'No se encontraron usuarios'})
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los usuarios'})
    }
}

export const getUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await userModel.findById(id);

        if(user) {
            return res.status(200).send(user)
        }
        res.status(404).send({message: 'No se encontró el usuario'})
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el usuario'})
    }
}

export const createUser = async (req, res) => {
    const {name, lastName, email, password, role} = req.body;

    try {
        const user = await userModel.create({name, lastName, email, password, role});

        if(user) {
            return res.status(201).send(user)
        }
        res.status(400).send({message: 'No se pudo crear el usuario'})
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).send({message: 'El email ya existe'})
        }
        res.status(500).send({message: 'Error al crear el usuario'})
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, lastName, email, password, role} = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(id, {name, lastName, email, password, role}, {new: true});

        if(user) {
            return res.status(200).send(user)
        }
        res.status(404).send({message: 'No se encontró el usuario'})
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar el usuario'})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await userModel.findByIdAndDelete(id);

        if(user) {
            return res.status(200).send(user)
        }
        res.status(404).send({message: 'No se encontró el usuario'})
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar el usuario'})
    }
}

const userSignup = async (req, res) => {
    try {
        if(!req.user){
            res.status(401).send({ resultado: 'Usuario invalido' });
        }

        res.status(200).send({ resultado: 'Usuario creado exitosamente.' });
    }
    catch (error) {
        console.error('Hubo un error al registrar el usuario:', error);
        res.status(500).send({ mensaje: `Error al registrar ${error}` });
    }
};

const failRegister = (req, res) => {
    console.log('Error al registrar');
    res.status(401).send({ resultado: 'Error al registrar' });
};

const github = (req, res) => {
    res.status(200).send({ resultado: 'Usuario creado exitosamente.' });
};

const githubCallback = (req, res) => {
    res.status(200).send({ resultado: 'Usuario creado exitosamente.' });
};

// Exportar todas las funciones juntas
export const userController = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    userSignup,
    failRegister,
    github,
    githubCallback
}