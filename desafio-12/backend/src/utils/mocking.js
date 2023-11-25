//Este archivo sirve para crear objetos
//"Mocking" se refiere a la creación de objetos simulados que imitan el comportamiento de objetos reales
//Estos objetos simulados llamados "mocks" se utilizan comúnmente en pruebas unitarias para aislar la funcionalidad que estás probando
//Tal vez deba instalar sinon con: npm install sinon










const express = require('express');
const sinon = require('sinon');

const app = express();
const PORT = 3000;

// Mocking productos
const mockProductos = () => {
    const productos = [];
    for (let i = 1; i <= 100; i++) {
        productos.push({
            _id: i,
            nombre: `Producto ${i}`,
            precio: Math.random() * 100,
        });
    }
    return productos;
};

// Endpoint para mocking de productos
app.get('/mockingproductos', (req, res) => {
    const productos = mockProductos();
    res.json(productos);
});

// Otros endpoints de tu aplicación...

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
