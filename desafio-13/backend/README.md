## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. En este desafío trabajamos mocking y manejo de errores
3. Mocking: <br>
   Debemos generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto sólo debe ocurrir en un endpoint determinado ("/mockingproducts") <br>
   Mocks son imitaciones de un dato real. Es altamente útil para poder crear datos "supuestos" con el fin de probar la funcionalidad de alguna función <br>
   Un dato mock no debe comprometer jamás una estructura productiva, por lo que sólo se usa en entornos de desarrollo. La mejor forma de encarar esto es tener una base de datos para desarrollo y otra base de datos para producción <br>
   En resumen, es útil utilizar mocks cuando yo no quiero tocar o modificar una aplicación, pero sí quiero generar datos de prueba, pero siempre debe ser en una base de datos para desarrollo <br>
   Faker.js es la herramienta que vamos a utilizar para poder hacer datos de prueba <br>
   Creo un archivo "mocking.js" en la carpeta utils para hacer la lógica y crear estos datos. Luego, creo un archivo "mocking.controllers.js" en la carpeta controllers para que una función me traiga los datos, o me avise de error en caso de que lo haya. Y también debo crear el archivo "mocking.routes.js" en la carpeta routes para crear el endpoint pedido por la consigna del desafío, e incluir la función del controlador (delego las responsabilidades como vimos en el anterior desafío). Finalmente agrego este endpoint a "app.routes.js" <br>
   Ya que sólo hacemos esto desde el backend, para revisar que el Mocking funciona debo ir a Postman, utilizo el método GET, ingreso el endpoint que en este caso es "localhost:4000/api/mockingproducts" y cuando clickee "send" me deberían aparecer los 100 productos
4. Manejo de errores: <br>
   El profesor nos pidió que hagamos un listado de posibles errores relacionados al carrito de una aplicación. Simplemente que los escribamos (lo haré en este mismo archivo) <br>
   Este listado nos va a servir en futuras aplicaciones para hacer un TDD (Test Driven Development)
5. Eliminé el archivo "mailer.js" de la carpeta config ya que por ahora no lo estamos utilizando en nuestro proyecto (ni tampoco lo estaba vinculando a la aplicación, solamente había creado el archivo). Seguramente lo utilicemos más adelante cuando tenga terminada la aplicación y el cliente finalice la compra de algún producto. También eliminé la carpeta "img" y el archivo "path.js" que solamente los estaba utilizando para el "mailer.js"



## Dependencias instaladas para este desafío:

1. **winston logger**

   - Instalación: `npm i winston`
   - Instalarlo en backend
   - Winston es un logger diseñado para poder trabajar con multitransportes para nuestra apicación, utiliza dos conceptos importantes: <br>
   Transporte: sistema de almacenamiento de nuestros logs <br>
   Nivel: sistema de prioridad que tiene cada alog, para definir si un log tiene autorización para pasar por un transporte