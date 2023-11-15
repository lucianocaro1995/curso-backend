import 'dotenv/config'
import nodemailer from 'nodemailer'
import express from 'express'
import { __dirname } from '../path.js'

const app = express()

let transporter = nodemailer.createTransport({
    host: 'smtp@gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'luciano.caro.1995@gmail.com',
        pass: process.env.PASSWORD_EMAIL,
        authMethod: 'LOGIN'
    }
})

app.get('/mail', async (req, res) => {
    const resultado = await transporter.sendMail({
        from: 'TEST MAIL luciano.caro.1995@gmail.com',
        to: 'lucho_lp_1995@hotmail.com',
        subject: 'Hola, buenas tardes',
        html:
            `
                <div>
                    <h1>Buenas tardes</h1>
                </div>
            `
            ,
        attachments: [{
            filename: '1.jpg',
            path: __dirname + '/img/1.jpg',
            cid: '1.jpg'
        }]
    })
    console.log(resultado)
    res.send("Email enviado")
})

app.listen(4000, () => {
    console.log(`Server on Port 4000`)
})