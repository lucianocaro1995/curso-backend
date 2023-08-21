//IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:8080 en mi navegador



//Importo módulos:
//Por errores de código que no entendí muy bien, para ver el index.html tuve que importar path y { fileURLToPath }
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
//Importo rutas de mi aplicación:
import prodsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';



//Constantes del servidor:
//Por errores de código que no entendí muy bien, para ver el index.html tuve que crear las constantes __filename y _dirname
const PORT = 8080
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Middlewares:
//Para poder trabajar con json. No puedo enviar json desde postman sin esta línea porque express no lo entiende
app.use(express.json())
//Para enviar a la url de mi aplicación varias consultas querys al mismo tiempo, querys extensos. Sin esta línea solamente podría enviar un query pequeño
app.use(express.urlencoded({ extended: true }))



//Rutas:
//Incluyo api porque es una api rest la que quiero generar
//El api/products puedo definirlo acá o en la carpeta routes, pero se recomienda hacerlo acá para hacerlo una sola vez
//En lugar de escribir las rutas en app.js, lo hago en la carpeta routes y lo traigo aquí con prodsRouter
//Necesito SÍ O SÍ el index.html para poder hacer funcionar la ruta "localhost:8080", pero las demás rutas sí funcionan
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))


//Inicializo el servidor:
try {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error al intentar iniciar el servidor:", error);
}