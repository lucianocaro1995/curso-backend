## Comentarios:

1. Desafío "Primera entrega": <br>
   En este trabajo debemos desarrollar un servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de 2 grupos de rutas: "/products" y "/carts". Dichos endpoints estarán implementados con el router de express con las siguientes especificaciones: <br><br>
   Para el manejo de `products`, el cual tendrá su router en "/api/products", configurar las siguientes rutas: <br>
   La ruta raíz GET "/" deberá listar todos los productos de la base <br>
   La ruta GET "/:pid" deberá traer sólo el producto con el id proporcionado <br>
   La ruta raíz POST "/" deberá agregar un nuevo producto con los campos: <br>
   id: number/string (A tu elección. El id no se manda desde el body, se autogenera como lo hemos visto desde los primeros desafíos, asegurando que nunca se repetirán los ids en el archivo) <br>
   title: string <br>
   description: string <br>
   code: string <br>
   price: number <br>
   status: boolean <br>
   stock: number <br>
   category: string <br>
   thumbnails: array de strings (que contengan las rutas donde están almacenadas las imágenes referentes a dicho producto) <br>
   La ruta PUT "/:pid" deberá tomar un producto y actualizarlo por los campos enviados desde el body. Nunca se debe actualizar o eliminar el id al momento de hacer dicha actualización <br>
   La ruta DELETE "/:pid" deberá eliminar el producto con el id proporcionado <br><br>
   Para el manejo de `carts`, el cual tendrá su router en "/api/carts", configurar 2 rutas: <br>
   La ruta raíz POST "/" deberá crear un nuevo carrito con la siguiente estructura: <br>
   id: number/string (A tu elección. De igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere) <br>
   products: array (que contendrá objetos que representen cada producto) <br>
   La ruta GET "/:cid" deberá listar los productos que pertenezcan al carrito con el parámetro id proporcionado <br>
   La ruta POST "/:cid/product/:pid" deberá agregar el producto al array "products" del carrito seleccionado, agregándose como un objeto bajo el siguiente formato: <br>
   product: sólo debe contener el id del producto (es crucial que no agregues el producto completo) <br>
   quantity: debe contener el número de ejemplares de dicho producto. El producto de momento se agregará de uno en uno <br>
   Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto <br>
   La persistencia de la información se implementará utilizando file system, donde los archivos "products.json" y "carts.json" guardarán la información
2. Creé "CartManager.js" para poder tener un manager de los carritos
3. Creé "carts.json" para poder guardar los carritos creados y la cantidad de productos dentro de cada carrito
4. Creé la carpeta "routes" en donde voy a guardar las rutas/endpoints solicitados, tanto para products como para carts
5. Creé la carpeta "public" en donde voy a guardar un pequeño html <br>
   Esto no es pedido por la consigna, pero me sirve como inicio para saber cómo crear un pequeño html y añadirlo a mi configuración del servidor express en "app.js". Si voy a la ruta "localhost:8080/static" voy a poder visualizarlo desde el navegador
5. Modifiqué "app.js" para importar las rutas de mi aplicación
6. Cómo ver las rutas creadas desde el navegador: <br>
   Ingresando "localhost:8080/static" veo el html creado en la carpeta public <br>
   Ingresando "localhost:8080/api/products/2" veo el producto cuyo id sea 2 <br>
   Ingresando "localhost:8080/api/carts/2" veo el carrito cuyo id sea 2 <br>
   Tener en cuenta que desde el navegador solamente puedo ver las rutas que utilicen el método GET. Para poder trabajar con los demás métodos debo utilizar Postman <br>
7. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:8080



## Dependencias instaladas para este desafío:

Ninguna