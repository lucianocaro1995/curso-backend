## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Módulos de testing para proyecto final": <br>
   En este trabajo debemos realizar 3 supertests: para products, carts y sessions <br>
   En clase vimos tanto test (de users) como supertest (de sessions), pero para el desafío se pide entregar solamente supertests. Todos los supertests también deben implementar mocha y chai <br>
   También es importante agregar los nombres de los test en "package.json" para que funcionen correctamente, en la sección de scripts <br>
   Para `products` debemos realizar distintos métodos, y también tener en consideración realizar la estrategia de login para el usuario admin, debe enviar email y contraseña, y esa cookie que genera se va a poder utilizar en cada una de las rutas <br>
   Para `carts` con realizar un método ya alcanza. Podemos crear un nuevo usuario con su carrito correspondiente, o con un usuario y un carrito previamente creados, implementar un método ya sea para agregar un producto al carrito, marcar stock o finalizar la compra <br>
   El supertest de `sessions` ya lo realizamos en clase <br>
   El test de `users` no es pedido por la consigna, pero como también lo realizamos en clase, yo tomé los mismos métodos y reemplacé parte del código para implementarle supertest, mocha y chai <br>
3. Diferencias entre test y supertest: <br>
   Test: En el contexto de Node.js, "test" no se refiere a una biblioteca específica, sino a la categoría general de bibliotecas de pruebas. Ejemplos incluyen Mocha, Jest, entre otros. Test por sí solo no es una biblioteca reconocida en Node.js <br>
   Supertest: Es una biblioteca específica para realizar pruebas de API HTTP en Node.js. Se utiliza comúnmente con frameworks como Mocha o Jest para realizar solicitudes HTTP y realizar aserciones en las respuestas
4. Creé una carpeta "test" en donde voy a crear los archivos supertests pedidos por la consigna, más el de usuarios <br>
   Los archivos "supertest.test.js", "users.test.js" y "usersChai.test.js" son los que realizó el profesor en clase, no los elimino para poder revisarlos y estudiarlos cuando lo necesite
5. Debo ejecutar `npm run test` para probar el test de usuarios <br>
   Debo ejecutar `npm run testChai` para probar el test de usuarios realizados con Chai. Es básicamente lo mismo pero en vez de utilizar el módulo nativo que tiene Node.js para hacer las comparaciones llamado Assert, utilizamos Chai <br>
   Debo ejecutar `npm run supertest` para probar el test llamado supertest <br>
6. Importante: las dependencias que se necesitan en este desafío deben ser instaladas dentro de nuestras dependencias de desarrollo. Esto se logra agregando -D al ejecutable (en package.json deben estar en devDependencies, no en dependencies) <br>
   La razón para instalarlas de esta manera, es que el testing sólo se debe realizar antes de entrar en un entorno productivo. Cuando nuestro proyecto se encuentre desplegado en la nube, no habrá necesidad de querer correr un test en éste


## Dependencias instaladas para este desafío:

1. **mocha**
   - Instalación: `npm install -D mocha`
   - Instalarlo en backend
   - Es un marco de prueba en JavaScript que se utiliza para realizar pruebas unitarias y de integración en desarrollo web

2. **chai**
   - Instalación: `npm install -D chai`
   - Instalarlo en backend
   - Chai es una biblioteca de aserciones en JavaScript utilizada para escribir pruebas más expresivas y legibles, integrándose comúnmente con el framework de pruebas Mocha para facilitar el desarrollo y la validación del código

3. **supertest**
   - Instalación: `npm install -D supertest`
   - Instalarlo en backend
   - Es una biblioteca de pruebas para Node.js que simula solicitudes HTTP, permitiendo realizar pruebas de integración y verificar respuestas de APIs y aplicaciones web de manera automatizada