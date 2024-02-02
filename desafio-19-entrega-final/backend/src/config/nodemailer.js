import 'dotenv/config'
import nodemailer from 'nodemailer'
import { ticketModel } from "../models/ticket.models.js"
import { userModel } from "../models/users.models.js"

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'luciano.caro.1995@gmail.com',
        pass: process.env.PASSWORD_EMAIL,
        authMethod: 'LOGIN'
    }
})

//1) Función para reestablecer contraseña. Se usa en requestPasswordReset de "users.controller.js"
const sendRecoveryMail = async (email, recoveryLink) => {
    try {
        const mailOptions = {
            from: 'luciano.caro.1995@gmail.com',
            to: email,
            subject: 'Link para reestablecer su contraseña',
            text: `Haga click en el siguiente enlace para reestablecer su contraseña: ${recoveryLink}`
        }

        await transport.sendMail(mailOptions);
        console.log('Email de recuperación de contraseña enviado correctamente');
    } catch (error) {
        console.log('Error al enviar el correo de recuperación de contraseña:', error);
    }
}

//2) Función para eliminar usuarios inactivos. Se usa en deleteInactiveUsers de "users.controller.js"
const sendAccountDeletionMail = async (email) => {
    try {
        const mailOptions = {
            from: 'luciano.caro.1995@gmail.com',
            to: email,
            subject: 'Eliminación de cuenta por inactividad',
            text: 'Tu cuenta ha sido eliminada debido a la inactividad en los últimos 2 días.',
        };

        await transport.sendMail(mailOptions);
        console.log('Email de eliminación de cuenta enviado correctamente');
    } catch (error) {
        console.log('Error al enviar el correo de eliminación de cuenta:', error);
    }
};

//3) Función para confirmar la compra. Se usa en purchaseCart de "carts.controller.js"
const sendPurchaseConfirmation = async (email, ticketId) => {
    try {
        // Obtener información del ticket
        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) {
            console.log('Ticket no encontrado');
            return;
        }

        // Obtener información del usuario
        const user = await userModel.findOne({ email: email });
        if (!user) {
            console.log('Usuario no encontrado');
            return;
        }

        const mailOptions = {
            from: 'luciano.caro.1995@gmail.com',
            to: email,
            subject: `Gracias por tu compra, ${user.first_name}`,
            text: `Gracias por tu compra, ${user.first_name}. Aquí está la información de tu compra:\n
                    Número de ticket: ${ticket._id}\n
                    Monto total: ${ticket.amount}\n
                    Fecha de compra: ${ticket.purchase_datetime}\n`
        };

        await transport.sendMail(mailOptions);
        console.log('Email de confirmación de compra enviado correctamente');
    } catch (error) {
        console.log('Error al obtener información del ticket o usuario:', error);
    }
};

//Exportar todas las funciones juntas
export const mailer = {
    sendRecoveryMail,
    sendAccountDeletionMail,
    sendPurchaseConfirmation
}