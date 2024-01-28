## Comentarios:

1. Desafío "Manejo de archivos": <br>
   En este trabajo debemos seguir elaborando el manager del desafío anterior <br>
   Principalmente debemos agregarle filesystem para que el array que creamos, ahora se guarde en un archivo JSON <br>
   Ahora el productManager debe poder agregar, consultar, modificar y eliminar un producto, y manejarlo en persistencia de archivos <br>
   La clase debe contar con una variable "this.path", el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia <br>
   Debe guardar objetos con el siguiente formato: <br>
   id (se debe incrementar automáticamente, no enviarse desde el cuerpo) <br>
   title (nombre del producto) <br>
   description (descripción del producto) <br>
   price (precio) <br>
   thumbnail (ruta de imagen) <br>
   code (código identificador) <br>
   stock (número de piezas disponibles) <br>
   Debe tener un método `addProduct` el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recordar siempre guardarlo como un array en el archivo) <br>
   Debe tener un método `getProducts` el cual debe leer el archivo de productos y devolver todos los productos en formato de array <br>
   Debe tener un método `getProductById` el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con id especificado y devolverlo en formato de objeto <br>
   Debe tener un método `updateProduct` el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una base de datos) y debe actualizar el producto que tenga ese id en el archivo. No debe borrarse su id <br>
   Debe tener un método `deleteProduct` el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo <br>
2. Creé un archivo "package.json" que diga "type": "module" <br>
   Esto me sirve para indicar que el proyecto utiliza módulos ECMAScript (ES6) en lugar de CommonJS, permitiendo la importación/exportación de archivos JavaScript de manera más moderna y consistente <br>
3. Creé un archivo "productos.json" el cual debe tener dentro un array vacío (utilizando 2 corchetes []) en donde voy a guardar los productos creados en el ProductManager.js
4. Modifiqué "ProductManager.js" para incluir los nuevos requerimientos
5. Debo ejecutar `node ProductManager.js` en la terminal para poder ver el resultado del código creado <br>
   En este desafío, el archivo "productos.json" actúa como si fuera una base de datos



## Dependencias instaladas para este desafío:

Ninguna