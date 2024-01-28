## Comentarios:

1. Desafío "Primera práctica de integración sobre tu ecommerce": <br>
   En este trabajo debemos hacer la conexión de nuestro proyecto con una base de datos: <br>
   Utilizaremos Mongo y mongoose para agregar el modelo de persistencia a nuestro proyecto <br>
   Debemos crear una base de datos llamada "ecommerce" dentro de Mongodb Atlas, crear sus colecciones "carts", "messages", "products" y sus respectivos schemas <br>
   Debemos separar los managers de fileSystem de los managers de Mongodb en una sola carpeta "dao". Dentro de dao, agregar también una carpeta "models" donde vivirán los esquemas de Mongodb. La estructura deberá ser igual a la vista en clase. En resumen, debemos contener todos los managers (fileSystem y DB) en una carpeta llamada "dao" <br>
   Debemos reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de fileSystem <br>
   A pesar de que ya no utilizaremos fileSystem, por el momento no lo borremos
2. Creé la carpeta "dao" con las subcarpetas solicitadas
3. Creé el archivo ".env" para ocultar contraseñas
4. Modifiqué "app.js" para hacer la conexión con la base de datos e incluyo la nueva vista <br>
   En total las rutas que se van a poder ver desde el navegador son 3: <br>
   localhost:4000/home <br>
   localhost:4000/realtimeproducts <br>
   localhost:4000/chat <br>
   La ruta localhost:4000/upload que utiliza multer no se va a poder ver porque se emplea con el método POST, no con el GET. Además no tiene asignado ningún archivo html, js o css
   En el próximo desafío voy a eliminar esta ruta y la configuración de multer ya que solamente lo hicimos para practicar
5. Modifiqué "views" para hacer una vista que contenga un chat <br>
   Modifiqué "public" para hacer el archivo js de este chat <br>
   Esta vista que contiene un chat va a ser el encargado de enviar los mensajes que se van a recibir en la colección "messages" de mi base de datos <br>
   Lo hicimos más que nada para practicar Socket.io y ver cómo se modifica la vista en tiempo real <br>
   Para ver el chat debo ingresar esta ruta en el navegador: "localhost:4000/chat"
6. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000



## Cómo utilizar la base de datos Mongodb Atlas

1. ¿Cómo conectar la base de datos Mongodb Atlas con mi aplicación en visual studio code? <br>
   Debo conseguir 2 cosas para lograr la conexión: <br>
   -  URL de mi base de datos <br>
   -  Contraseña de mi base de datos (no es la misma contraseña que utilizo para entrar a MongoDB Atlas) <br>
   
   En la página web de MongoDB Atlas clickeo la pestaña "database", clickeo "Connect", clickeo "Drivers" y se me va a abrir una ventana con mi URL <br>
   Debo modificar esa URL, pongo mi contraseña donde dice "password". Luego de entregar este desafío cambio la contraseña <br>
   En la línea 52 de mi archivo "app.js" pego mi URL y contraseña
2. ¿Cómo cambio mi contraseña? <br>
   Clickeo la pestaña "Database Access" y clickeo "Edit" sobre el usuario que desea cambiarle la contraseña <br>
   Cuando inicie la conexión con "npm run dev" me va a aparecer en la pestaña "browseCollections" la colección "users" que yo creé
3. ¿Cómo accedo a las colecciones de mi base de datos? <br>
   Clickeo "database" y luego clickeo "browse collections"



## Cómo utilizar dotenv para ocultar contraseñas

1. Una vez que finalice la instalación utilizando "npm i dotenv", creo el archivo ".env"
2. En este archivo creo el nombre de una variable, le asigno un nombre a la contraseña que deseo ocultar <br>
   Yo asigné el nombre "MONGO_URL" para ocultar mi contraseña que me conecta con mi base de datos, para que nadie pueda manipular mis colecciones de usuarios, productos, etc
3. A este nombre le pongo un igual "=" y le asigno el valor de la contraseña
4. Una vez hecho esto, importo dotenv en el archivo que desee utilizarlo
5. Voy al código y reemplazo en "app.js" utilizando process.env. + (nombre asignado), es decir yo voy a poner en este caso "process.env.MONGO_URL" <br>
   Cómo se veía antes: <br>
   `mongoose.connect('mongodb+srv://luciano1995:<password>@cluster0.azwpqmd.mongodb.net/?retryWrites=true&w=majority')` <br>
   Cómo se ve ahora la línea de código reemplazada: <br>
   `mongoose.connect(process.env.MONGO_URL)`
6. Finalmente debo agregar este archivo ".env" al .gitignore para que no se suba al repositorio de github y las personas no puedan ver las contraseñas



## Dependencias instaladas para este desafío:

1. **mongoose**

   - Instalación: `npm i mongoose`
   - Esta dependencia es esencial para trabajar con MongoDB en aplicaciones Node.js. Facilita la creación de modelos de datos, establece conexiones y ofrece funciones para realizar operaciones CRUD de manera eficiente y estructurada

2. **dotenv**
   - Instalación: `npm i dotenv`
   - Nos permite manejar variables de entorno dentro de nuestra aplicación. Sirve para ocultar contraseñas y no subirlas a GitHub <br>
   Copio toda la URL que escribí en la conexión con MongoDB Atlas y la pego en el archivo ".env". Luego donde estaba la URL pongo "process.env.MONGO_URL" <br>
   En la versión nueva de Node lo tenemos de forma nativa, pero en esta versión tengo que instalarlo desde la terminal