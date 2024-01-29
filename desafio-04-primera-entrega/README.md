## Comentarios:

1. Desafío "Primera entrega": <br>
   En este trabajo debemos desarrollar un servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de 2 grupos: products y carts <br>
   Dichos grupos estarán implementados con el router de express con las siguientes especificaciones: <br>
   Products deberá tener su router en "/api/products" mientras que Carts deberá tener su router en "/api/carts". Para ambos debemos crear unos endpoints específicos pedidos por la consigna del trabajo <br>
   La persistencia de la información se debe implementar utilizando file system, donde los archivos "products.json" y "carts.json" guarden la información
2. Creé "CartManager.js" para poder tener un manager de los carritos
3. Creé "carts.json" para poder guardar los carritos creados y la cantidad de productos dentro de cada carrito
4. Creé la carpeta "routes" en donde voy a guardar las rutas/endpoints solicitados, tanto para products como para carts
5. Creé la carpeta "public" en donde voy a guardar un pequeño html <br>
   Esto no es pedido por la consigna, pero me sirve como inicio para saber cómo crear un pequeño html y añadirlo a mi configuración del servidor express en "app.js". Si voy a la ruta "localhost:8080/static" voy a poder visualizarlo desde el navegador
5. Modifiqué "app.js" para importar las rutas de mi aplicación
6. Cómo agregar un producto desde Postman: <br>
   Por el momento estos nuevos productos se agregarán al archivo JSON de productos. Cuando conectemos nuestra aplicación con una base de datos en el desafío 6, estos productos se agregarán a la base de datos <br>
   Ingreso el endpoint "localhost:8080/api/products" <br>
   Utilizo el método POST <br>
   Clickeo en body y debajo clickeo la opción raw <br>
   Elijo la opción JSON <br>
   Escribo un objeto con los atributos del nuevo producto a agregar y clickeo en send <br>
   Ejemplo de nuevo producto:

```json
   {
      "title": "Producto 5",
      "description": "Este es el producto 5",
      "price": 10,
      "code": "PROD005",
      "status": true,
      "stock": 10,
      "category": "Reloj de pulsera",
      "thumbnail": "ejemploImagen5.jpg",
      "id": 5
   }
```

7. Rutas que se van a poder ver desde el navegador: <br>
   `localhost:8080/static` <br>
   `localhost:8080/api/products` (se verá un json solamente, mostrando todos los productos) <br>
   `localhost:8080/api/products?limit=2` (se verá un json solamente, mostrando los primeros 2 productos) <br>
   `localhost:8080/api/products/2` (se verá un json solamente, mostrando el producto cuyo id sea 2) <br>
   `localhost:8080/api/carts/2` (se verá un json solamente, mostrando el carrito cuyo id sea 2) <br><br>
   Tener en cuenta que desde el navegador solamente puedo ver las rutas que utilicen el método GET. Para poder trabajar con los demás métodos debo utilizar Postman <br>
8. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:8080



## Dependencias instaladas para este desafío:

Ninguna