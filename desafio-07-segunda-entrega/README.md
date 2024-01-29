## Comentarios:

1. Desafío "Profesionalizando la base de datos": <br>
   En este trabajo debemos profesionalizar las consultas de productos con filtros, paginación y ordenamientos <br>
   También profesionalizar la gestión del carrito para implementar los últimos conceptos vistos <br><br>
   Para el router de `products`: <br>
   Modificar el método GET para que cumpla con los siguientes puntos: <br>
   Deberá poder recibir por query params un limit, una page, un sort y un query: <br>
   Limit permitirá devolver sólo el número de elementos solicitamos al momento de la petición. En caso de no recibir limit, éste será de 10 <br>
   Page permitirá devolver la página que queremos buscar. En caso de no recibir page, ésta será de 1 <br>
   Query, el tipo de elemento que quiero buscar, es decir qué filtro aplicar. En caso de no recibir query, realizar la búsqueda general <br>
   Sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio. En caso de no recibir sort, no realizar ningún ordenamiento <br>
   El método GET deberá devolver un objeto con el siguiente formato: <br>
   { <br>
      status: success/error <br>
      payload: Resultado de los productos solicitados <br>
      totalPages: Total de páginas <br>
      prevPage: Página anterior <br>
      nextPage: Página siguiente <br>
      page: Página actual <br>
      hasPrevPage: Indicador para saber si la página previa existe <br>
      hasNextPage: Indicador para saber si la página siguiente existe <br>
      prevLink: Link directo a la página previa (null si hasPrevPage = false) <br>
      nextLink: Link directo a la página siguiente (null si hasNextPage = false) <br>
   } <br>
   Se deberá poder buscar productos por categoría o disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio <br><br>
   Para el router de `carts` agregar las siguientes rutas: <br>
   DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado <br>
   PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba <br>
   PUT api/carts/:cid/products/:pid deberá poder actualizar sólo la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body <br>
   DELETE api/carts/:cid deberá eliminar todos los productos del carrito <br>
   Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un "populate". De esta manera almacenamos sólo el id, pero al solicitarlo podemos desglosar los productos asociados <br>
2. Importante: en este desafío dejo de utilizar los managers (CartManager, MessagesManager y ProductManager) en los archivos de routes. Desde ahora sólo utilizo los modelos que yo creo con Mongoose, por ejemplo cartModel, ya que me permite aprovechar las funciones nativas de Mongoose, simplificando aún más mi código <br>
   Todo lo de dao, excepto la carpeta models, pasa a ser obsoleto
3. Modifiqué todos los archivos de la carpeta routes para cumplir con lo solicitado por la consigna
4. Modifiqué "products.models.js" y "users.models.js" para agregarle paginate. El paginate en products es pedido por la consigna, el paginate en users lo hicimos en clase para practicar
5. Modifiqué "carts.models.js" para agregarle populate


## Dependencias instaladas para este desafío:

1. **paginate**

   - Instalación: `npm i mongoose-paginate-v2`
   - Esta dependencia instala el paquete que amplía Mongoose para proporcionar funcionalidad de paginación eficiente al interactuar con bases de datos MongoDB, facilitando la gestión y presentación de grandes conjuntos de datos