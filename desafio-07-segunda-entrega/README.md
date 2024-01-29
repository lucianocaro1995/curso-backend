## Comentarios:

1. Desafío "Profesionalizando la base de datos": <br>
   En este desafío nos pidieron realizar modificaciones tanto en el router de carts como en el de products: debemos agregar varias rutas/endpoints, profesionalizar las consultas de productos con filtros, paginación y ordenamientos, y también profesionalizar la gestión del carrito implementando populate
2. Modifiqué todos los archivos de la carpeta routes: <br>
   Products y carts para cumplir con lo pedido de la consigna <br>
   Messages y users para reemplazar los antiguos managers
3. Modifiqué "products.models.js" y "users.models.js" para agregarle paginate. El paginate en products es pedido por la consigna, el paginate en users lo hicimos en clase para practicar
4. Modifiqué "carts.models.js" para agregarle populate
5. Importante: en este desafío dejo de utilizar los managers (CartManager, MessagesManager y ProductManager) en los archivos de routes. Desde ahora sólo utilizo los modelos que yo creo con Mongoose, por ejemplo cartModel, ya que me permite aprovechar las funciones nativas de Mongoose, simplificando aún más mi código <br>
   Todo lo de dao, excepto la carpeta models, pasa a ser obsoleto
6. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000


## Dependencias instaladas para este desafío:

1. **paginate**

   - Instalación: `npm i mongoose-paginate-v2`
   - Esta dependencia instala el paquete que amplía Mongoose para proporcionar funcionalidad de paginación eficiente al interactuar con bases de datos MongoDB, facilitando la gestión y presentación de grandes conjuntos de datos