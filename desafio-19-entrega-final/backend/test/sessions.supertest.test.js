import mongoose from 'mongoose'
import supertest from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'

const api = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)

let cookie = {}





describe('Test CRUD de sesiones en la ruta api/sessions', function () {

    //1) Registrar/Crear un nuevo usuario para agregarlo a la base de datos
    it("Ruta: api/sessions/register con metodo POST", async () => {
        const newUser = {
            first_name: "Sandra",
            last_name: "Sanchez",
            email: "sane131we@saewn131223.com",
            password: "sa@sa.com"
        }
        const { _body } = await api.post('/api/sessions/register').send(newUser)
        expect(_body.payload).to.be.ok
    })

    //2) Iniciar sesión
    it("Ruta: api/sessions/login con metodo POST", async () => {
        const user = {
            email: "san@san.com",
            password: "sa@sa.com"
        }
        const resultado = await api.post('/api/sessions/login').send(user)
        const cookieResult = resultado.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok
        //clave = valor
        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1]
        }
        expect(cookie.name).to.be.ok.and.equal('coderCookie')
        expect(cookie.value).to.be.ok
    })

    //3) Verificar que el correo en la respuesta de la API sea igual al proporcionado por el usuario
    it("Ruta: api/sessions/current con metodo GET", async () => {
        const { _body } = await api.get('/api/sessions/current')
            .set('Cookie', [`${cookie.name} = ${cookie.value}`])
        console.log(_body.payload)
        expect(_body.payload.email).to.be.equal('san@san.com')
    })

})