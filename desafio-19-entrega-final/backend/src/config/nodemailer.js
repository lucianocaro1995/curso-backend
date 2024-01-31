import 'dotenv/config'
import nodemailer from 'nodemailer'

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

//1) Función para reestablecer contraseña
const sendRecoveryMail = (email, recoveryLink) => {
    const mailOptions = {
        from: 'luciano.caro.1995@gmail.com',
        to: email,
        subject: 'Link para reestablecer su contraseña',
        text: `Haga click en el siguiente enlace para reestablecer su contraseña: ${recoveryLink}`
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else
            console.log('Email enviado correctamente')
    })
}

//2) Función para eliminar usuarios inactivos
const sendAccountDeletionMail = async (destinatario) => {
    const mailOptions = {
        from: 'luciano.caro.1995@gmail.com',
        to: destinatario,
        subject: 'Eliminación de cuenta por inactividad',
        text: 'Tu cuenta ha sido eliminada debido a la inactividad en los últimos 2 días.',
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error)
        else
            console.log('Email enviado correctamente')
    })
};

//Exportar todas las funciones juntas
export const nodemailer = {
    sendRecoveryMail,
    sendAccountDeletionMail
}