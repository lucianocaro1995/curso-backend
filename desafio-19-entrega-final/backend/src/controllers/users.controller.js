import { userModel } from "../models/users.models.js";
import { mailer } from "../config/nodemailer.js"
import crypto from 'crypto';
const recoveryLinks = {};





//1)
const getUsers = async (req, res) => {
    try {
        const user = await userModel.find();

        if (user) {
            return res.status(200).send(user);
        }
        res.status(400).send({ error: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).send({ error: `Error en consultar el usuario ${error}` });
    }
};

//2)
const getUsersNamesAndEmails = async (req, res) => {
    try {
        const users = await userModel.find();

        if (users.length > 0) {
            //Mapear la lista de usuarios para obtener sólo nombre y correo electrónico
            const usersData = users.map(user => ({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }));

            return res.status(200).send(usersData);
        }

        res.status(400).send({ error: "Usuarios no encontrados" });
    } catch (error) {
        res.status(500).send({ error: `Error en consultar los usuarios: ${error}` });
    }
};

//3)
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const userId = await userModel.findById(id);
        if (userId) {
            return res.status(200).send(userId);
        }
        res.status(404).send({ error: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).send({ error: `Error en consultar usuario ${error}` });
    }
};

//4)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age, email, password } = req.body;

    try {
        const actUser = await userModel.findByIdAndUpdate(id, {
            first_name,
            last_name,
            age,
            email,
            password,
        });
        if (actUser) {
            return res.status(200).send(actUser);
        }
        res.status(404).send({ error: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).send({ error: `Error en actualizar el usuario ${error}` });
    }
};

//5)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.status(200).send({ user });
        } else {
            res.status(404).send({ error: "Error en eliminar usuario" });
        }
    } catch (error) {
        res.status(400).send({ error: "Error en eliminar usuario" });
    }
};

//6)
const deleteInactiveUsers = async (req, res) => {
    try {
        //Obtener usuarios inactivos en los últimos 2 días
        const limiteInactividad = new Date();
        limiteInactividad.setDate(limiteInactividad.getDate() - 2);

        /*
        30 minutos de inactividad para probar
        const limiteInactividad = new Date();
        limiteInactividad.setMinutes(limiteInactividad.getMinutes() - 30);
        */

        const usuariosInactivos = await userModel.find({ last_connection: { $lt: limiteInactividad } });

        if (usuariosInactivos.length > 0) {
            //Enviar correos electrónicos de notificación y eliminar usuarios
            for (const usuario of usuariosInactivos) {
                await mailer.sendAccountDeletionMail(usuario.email);
                await userModel.findByIdAndDelete(usuario._id);
            }

            return res.status(200).send({ mensaje: "Usuarios inactivos eliminados y notificados correctamente" });
        }

        res.status(400).send({ error: "No hay usuarios inactivos para eliminar" });
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar usuarios inactivos: ${error}` });
    }
};

//7)
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        //Token único con el fin de que no haya 2 usuarios con el mismo link de recuperación
        const token = crypto.randomBytes(20).toString('hex');
        recoveryLinks[token] = { email: email, timestamp: Date.now() };
        const recoveryLink = `http://localhost:4000/api/users/reset-password/${token}`;
        await mailer.sendRecoveryMail(email, recoveryLink);
        res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        res.status(500).send(`Error al enviar el mail ${error}`);
    }
};

//8)
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    try {
        const linkData = recoveryLinks[token];
        if (linkData && Date.now() - linkData.timestamp <= 3600000) {
            console.log(newPassword, confirmNewPassword);
            const { email } = linkData;
            console.log(email);
            console.log(token);
            if (newPassword == confirmNewPassword) {
                // Modificar usuario con nueva contraseña
                delete recoveryLinks[token];
                res.status(200).send('Contraseña modificada correctamente');
            } else {
                res.status(400).send('Las contraseñas deben ser idénticas');
            }
        } else {
            res.status(400).send('Token inválido o expirado. Pruebe nuevamente');
        }
    } catch (error) {
        res.status(500).send(`Error al modificar contraseña ${error}`);
    }
};

//9)
const uploadUserDocuments = async (req, res) => {
    const userId = req.params.uid;
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send('No se subieron archivos.');
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }
        const updatedDocuments = files.map(file => ({
            name: file.originalname,
            reference: file.path
        }));
        user.documents.push(...updatedDocuments);
        await user.save();
        res.status(200).send('Imagen cargada');
    } catch (error) {
        console.error('Error al subir documentos:', error);
        res.status(500).send('Error al subir documentos');
    }
};

//Exportar todas las funciones juntas
export const userController = {
    getUsers,
    getUsersNamesAndEmails,
    getUserById,
    updateUser,
    deleteUser,
    deleteInactiveUsers,
    requestPasswordReset,
    resetPassword,
    uploadUserDocuments,
}