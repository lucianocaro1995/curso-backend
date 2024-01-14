## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Módulos de testing para proyecto final": <br>
   En este trabajo debemos realizar 3 supertests: para products, carts y sessions <br>
   En clase vimos tanto test (de users) como supertest (de sessions), pero para el desafío se pide entregar solamente supertests. Todos los supertests también deben implementar mocha y chai <br>
   También es importante agregar los nombres de los test en "package.json" para que funcionen correctamente, en la sección de scripts <br>
   Para `products` debemos tener en consideración realizar la estrategia de login para el usuario admin, debe enviar email y contraseña, y esa cookie que genera se va a poder utilizar en cada una de las rutas <br>
   Para `carts` con realizar un método ya alcanza. Podemos crear un nuevo usuario con su carrito correspondiente, o con un usuario y un carrito previamente creados, implementar un método ya sea para agregar un producto al carrito, marcar stock o finalizar la compra <br>
   El supertest de `sessions` ya lo realizamos en clase en el archivo "supertest.test.js" <br>
   El supertest de `users` no es pedido por la consigna, pero como realizamos un test de users en clase, yo tomé los mismos métodos y reemplacé parte del código para implementarle supertest, mocha y chai <br>
3. Diferencias entre test y supertest: <br>
   Test: En el contexto de Node.js, "test" no se refiere a una biblioteca específica, sino a la categoría general de bibliotecas de pruebas. Ejemplos incluyen Mocha, Jest, entre otros. Test por sí solo no es una biblioteca reconocida en Node.js <br>
   Supertest: Es una biblioteca específica para realizar pruebas de API HTTP en Node.js. Se utiliza comúnmente con frameworks como Mocha o Jest para realizar solicitudes HTTP y realizar aserciones en las respuestas
4. Creé una carpeta "test" en donde voy a crear los archivos supertests pedidos por la consigna, más el de usuarios <br>
   Los archivos "supertest.test.js", "users.test.js" y "usersChai.test.js" son los que realizó el profesor en clase, no los elimino para poder revisarlos y estudiarlos cuando lo necesite
6. Importante: las dependencias que se necesitan en este desafío deben ser instaladas dentro de nuestras dependencias de desarrollo. Esto se logra agregando -D al ejecutable (en package.json deben estar en devDependencies, no en dependencies) <br>
   La razón para instalarlas de esta manera, es que el testing sólo se debe realizar antes de entrar en un entorno productivo. Cuando nuestro proyecto se encuentre desplegado en la nube, no habrá necesidad de querer correr un test en éste
7. Importante: tanto Swagger utilizado en el desafío anterior para documentar, como estos tests, realizan cambios en nuestra base de datos cuando ejecutamos los métodos creados ya que no tenemos una base de datos de prueba
8. Para ejecutar cada uno de los test creados, debo verificar los nombres asignados en el package.json para ese archivo en particular e introducir en la terminal npm run + (nombre), por ejemplo si quiero ejecutar el supertest de carts debo ejecutar "npm run cartssupertest" <br>
   Estos son los nombres que asigné:
<pre>
   <code class="language-json">
      {
         "scripts": {
            "dev": "nodemon src/app.js",
            "test": "mocha test/users.test.js",
            "testChai": "mocha test/usersChai.test.js",
            "supertest": "mocha test/supertest.test.js",
            "userssupertest": "mocha test/users.supertest.test.js",
            "productssupertest": "mocha test/products.supertest.test.js",
            "cartssupertest": "mocha test/carts.supertest.test.js",
            "sessionssupertest": "mocha test/sessions.supertest.test.js"
         }
      }
   </code>
</pre>



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