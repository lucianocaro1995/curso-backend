## Comentarios:

1. Desafío "Primera práctica de integración sobre tu ecommerce": <br>
   En este trabajo debemos hacer la conexión de nuestro proyecto con una base de datos: <br>
   Utilizaremos Mongo y mongoose para agregar el modelo de persistencia a nuestro proyecto <br>
   Debemos crear una base de datos llamada "ecommerce" dentro de Mongodb Atlas, crear sus colecciones "carts", "messages", "products" y sus respectivos schemas <br>
   Debemos separar los managers de fileSystem de los managers de Mongodb en una sola carpeta "dao". Dentro de dao, agregar también una carpeta "models" donde vivirán los esquemas de Mongodb
2. Creé la carpeta "dao" con las subcarpetas solicitadas
3. Creé el archivo ".env" para ocultar contraseñas
4. Modifiqué "app.js" para hacer la conexión con la base de datos e incluyo la nueva vista del chat
5. Modifiqué "views" para hacer una vista que contenga un chat
6. Modifiqué "public" para hacer el archivo js de este chat <br>
   Este chat va a ser el encargado de enviar los mensajes que se van a recibir en la colección "messages" de mi base de datos <br>
   Lo hicimos más que nada para practicar Socket.io y ver cómo se modifica la vista en tiempo real <br>
   Para ver el chat debo ingresar esta ruta en el navegador: "localhost:4000/chat"
7. Eliminé todo lo referido a Multer ya que solamente lo hicimos en el desafío anterior para practicar
8. Importante: este va a ser el último desafío en que utilice los managers de la carpeta DB (CartManager, MessagesManager y ProductManager) en los archivos de routes <br>
   Me conviene empezar a utilizar los modelos que yo creo con Mongoose, por ejemplo cartModel, ya que me permite aprovechar las funciones nativas de Mongoose, simplificando aún más mi código
9. Rutas que se van a poder ver desde el navegador: <br>
   `localhost:4000/home` <br>
   `localhost:4000/realtimeproducts` <br>
   `localhost:4000/chat` <br><br>
   Rutas que se van a poder ver desde el navegador (en las que sólo se verá un json): <br>
   `localhost:4000/api/users` <br>
   `localhost:4000/api/products` <br>
   `localhost:4000/api/carts` <br>
   `localhost:4000/api/messages` <br>
10. Debo ejecutar `npm run dev` en la terminal para iniciar el servidor y poder ver la aplicación localmente en mi navegador utilizando el puerto localhost:4000



## Cómo utilizar la base de datos Mongodb Atlas

1. ¿Cómo conectar la base de datos Mongodb Atlas con mi aplicación en visual studio code? <br>
   Debo conseguir 2 cosas para lograr la conexión: <br>
   -  URL de mi base de datos <br>
   -  Contraseña de mi base de datos (no es la misma contraseña que utilizo para entrar a MongoDB Atlas) <br>
   
   En la página web de MongoDB Atlas clickeo la pestaña "database", clickeo "Connect", clickeo "Drivers" y se me va a abrir una ventana con mi URL <br>
   Debo copiar esa URL y pegarla en mi archivo "app.js" para hacer la conexión a la base de datos <br>
   Finalmente, hay una parte de la URL que dice "password", ahí debo borrar esa palabra y reemplazarla por mi contraseña
2. ¿Cómo configuré mi contraseña? <br>
   Al hacer los primeros pasos yo clickié en la pestaña "Quikstart". Aquí es donde configuré mi nombre de usuario y contraseña que voy a utilizar para conectar el backend de mi aplicación con la base de datos (no es el mismo usuario y contraseña que utilizo para entrar a MongoDB Atlas)
   Esta pestaña no nos va a aparecer una vez que tengamos creado al menos un usuario para usar una base de datos
3. ¿Cómo cambio mi contraseña? <br>
   Clickeo la pestaña "Database Access" y clickeo "Edit" sobre el usuario que desee cambiarle la contraseña <br>
4. ¿Cómo accedo a las colecciones de mi base de datos? <br>
   Clickeo "Database" y luego clickeo "browse collections"
5. ¿Cómo se crean las colecciones? <br>
   Cuando inicie la conexión con "npm run dev" me va a aparecer en la pestaña "browseCollections" las colecciones que yo haya creado en la carpeta models. Estas colecciones siempre se crean o modifican al hacer conexión con la base de datos
6. Importante:
   Vamos a tener 2 contraseñas, una para hacer inicio de sesión en MongoDb Atlas y la otra para conectar el backend de mi aplicación con la base de datos:
   La primera se modifica clickeando en "forgot password?" al iniciar sesión
   La segunda lo expliqué en el punto 3
7. Cluster:
   Un cluster es un conjunto de servidores interconectados que colaboran para almacenar y gestionar datos de manera distribuida
   En MongoDB Atlas, "Cluster0" es el nombre predeterminado para el clúster principal creado al configurar una base de datos en la nube


## Cómo utilizar dotenv para ocultar contraseñas

1. Debo instalar la dependencia dotenv utilizando el comando "npm i dotenv"
2. Luego creo el archivo ".env"
3. En este archivo creo el nombre de una variable, le asigno un nombre a la contraseña que deseo ocultar <br>
   Yo asigné el nombre "MONGO_URL" para ocultar mi contraseña que me conecta con mi base de datos, para que nadie pueda manipular mis colecciones de usuarios, productos, etc
4. A este nombre le pongo un igual "=" y le asigno el valor de la contraseña
5. Una vez hecho esto, importo dotenv en el archivo que desee utilizarlo
6. Voy al código y reemplazo en "app.js" utilizando process.env. + (nombre asignado), es decir yo voy a poner en este caso "process.env.MONGO_URL" <br>
   Cómo se veía antes (debo escribir mi contraseña donde dice password): <br>
   `mongoose.connect('mongodb+srv://luciano1995:<password>@cluster0.azwpqmd.mongodb.net/?retryWrites=true&w=majority')` <br>
   Cómo se ve ahora la línea de código reemplazada: <br>
   `mongoose.connect(process.env.MONGO_URL)`
7. Finalmente debo agregar este archivo ".env" al .gitignore para que no se suba al repositorio de github y las personas no puedan ver las contraseñas



## Dependencias instaladas para este desafío:

1. **mongoose**

   - Instalación: `npm i mongoose`
   - Esta dependencia es esencial para trabajar con MongoDB en aplicaciones Node.js. Facilita la creación de modelos de datos, establece conexiones y ofrece funciones para realizar operaciones CRUD de manera eficiente y estructurada

2. **dotenv**
   - Instalación: `npm i dotenv`
   - Nos permite manejar variables de entorno dentro de nuestra aplicación. Sirve para ocultar contraseñas y no subirlas a GitHub <br>
   Copio toda la URL que escribí en la conexión con MongoDB Atlas y la pego en el archivo ".env". Luego donde estaba la URL pongo "process.env.MONGO_URL" <br>
   En la versión nueva de Node lo tenemos de forma nativa, pero en esta versión tengo que instalarlo desde la terminal