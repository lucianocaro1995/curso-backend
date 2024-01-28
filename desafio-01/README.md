## Comentarios:

1. Desafío "Clases con ECMAScript y ECMAScript avanzado": <br>
   En este trabajo debemos realizar una clase "ProductManager" que gestione un conjunto de productos <br>
   Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío <br>
   Cada producto que gestione debe contar con las siguientes propiedades: <br>
   title (nombre del producto) <br>
   description (descripción del producto) <br>
   price (precio) <br>
   thumbnail (ruta de la imagen) <br>
   code (código identificador) <br>
   stock (número de piezas disponibles) <br>
   Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial. Validar que no se repita el campo "code" y que todos los campos sean obligatorios. Al agregarlo, debe crearse con un id autoincrementable <br>
   Debe contar con un método "getProducts" el cual debe devolver el arreglo con todos los productos creados hasta ese momento <br>
   Debe contar con un método "getProductById" el cual debe buscar en el arreglo el producto que coincida con el id. En caso de no coincidir con ningún id, mostrar en consola un error que diga "not found" <br>
2. Creé el archivo "ProductManager.js" para elaborar esta clase que gestione productos según lo pedido por la consigna <br>
3. Debo ejecutar `node ProductManager.js` en la terminal para poder ver el resultado del código creado <br>



## Dependencias instaladas para este desafío:

Ninguna