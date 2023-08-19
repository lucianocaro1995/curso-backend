//Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador



//Importo módulos
import express from "express"
//Importo rutas de mi aplicación
import prodsRouter from "./routes/products.routes.js";



//Middlewares:
//Para poder trabajar con json. No puedo enviar json desde postman sin esta línea porque express no lo entiende
app.use(express.json())
//Para enviar a la url de mi aplicación varias consultas querys al mismo tiempo, querys extensos. Sin esta línea solamente podría enviar un query pequeño
app.use(express.urlencoded({ extended: true }))



//Constantes
const PORT = 4000
const app = express()



//Rutas:
//Incluyo api porque es una api rest la que quiero generar
//El api/products puedo definirlo acá o en la carpeta routes, pero se recomienda hacerlo acá para hacerlo una sola vez
//En lugar de escribir las rutas en app.js, lo hago en la carpeta routes y lo traigo aquí con prodsRouter
app.use("/api/products", prodsRouter)



//Inicializo el servidor
try {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error al intentar iniciar el servidor:", error);
}