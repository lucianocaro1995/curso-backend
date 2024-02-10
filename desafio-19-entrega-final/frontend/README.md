## Usuarios creados

Creé estos usuarios para poder iniciar sesión y ver las vistas creadas tanto para un usuario de rol "user" o "premium" como para el usuario "admin":
Usuario admin:
Email: admin@admin.com - Password: 1234
Usuario user o premium:
Email user@user.com - Password: 1234



## Cómo hacer el deploy:

1. Voy a utilizar Render para hacer el despliegue de mi aplicación
2. Para empezar, debo asegurarme de tener los localhost declarados en una variable: <br>
   Para lograr esto podría utilizar un archivo ".env". Fijarme de tener dotenv instalado en el package.json, si no lo tengo debo instalarlo con "npm i dotev" <br><br>
   Archivo .env del backend: <br>
   Guardar el URL del frontend en el backend no es necesario, pero ya que es necesario hacerlo en el frontend, es una buena práctica para tener las 2 URL guardadas <br>
   Creo la variable de esta manera: <br>
   FRONTEND_URL= `http://127.0.0.1:5173,http://localhost:5173` <br>
   Luego en "app.js" donde está la sección de cors, en la constante whitelist, reemplazo por el nombre de la variable <br><br>
   Archivo .env del frontend: <br>
   Creo la variable de esta manera: 
   VITE_BACKEND_URL= `http://localhost:3000` <br>
   Luego en todos los archivos donde haya links que utilicen el localhost del backend (principalmente para imágenes y fetchs), reemplazo por el nombre de la variable <br><br>
   ¿Por qué debo guardar en variables los localhost? <br>
   Como dije anteriormente, guardar el localhost en el backend no es necesario, pero es buena práctica <br>
   Sin embargo, es importante que la variable en el frontend exista, porque luego en la página de Render debo ingresar esta variable, asignándole otro valor <br>
   El valor asignado en el ".env", sirve para ver la aplicación localmente. El valor asignado desde la página de Render, sirve para ver la aplicación desplegada en la nube
   ¿Es necesario ocultar los localhost que utilizo? <br>
   No, no es necesario ocultarlos ya que no es información sensible. Tranquilamente podría crearlas en un archivo "config.js" en vez de crearlas en ".env" <br>
3. Modifiqué el archivo "package.json" de la carpeta backend: <br>
   Debo asegurarme de tener un script "start" ya que lo pide la página de Render, así que agregué este script: <br>
   "start": "node src/app.js" <br>
4. Ejecuté el comando "npm run build" en la carpeta frontend: <br>
   Debo ejecutar el comando build para que se me cree la carpeta dist, ya que lo pide la página de Render
5. Crée un repositorio nuevo llamado "curso-backend-deploy", el cual voy a utilizar para hacer el deploy
6. Voy a la página de Render y e ingreso con mi cuenta de Github
7. Primero debo desplegar el backend:
   Clickeo en "New" y luego en "Web services"
   Clickeo en "Build and deploy from a git repository"
   En esta ventana debemos elegir el repositorio a desplegar. Clickeo en "Connect account", selecciono mi cuenta, selecciono la opción "Only select repositories" y elijo el repositorio a desplegar. Finalmente clickeo en "Install"
   Me va a aparecer una nueva ventana con repositorios ya desplegados, clickeo en "Connect" en el repositorio que deseo desplegar ahora
   Me va a aparecer una lista con varios inputs a completar:
   Nombre del servicio web: debo elegir un nombre para mi página desplegada, yo le puse curso-backend-server-deploy
   Región: Oregon (US West)
   Branch: main
   Root directory: backend
   Runtime: Node
   Build command: npm install
   Start command: npm start
   Elijo la opción gratis
   Para finalizar debo completar una tabla con todas las variables que declaré en el archivo ".env", sin incluir la variable FRONTEND_URL
   Clickeo en "Create web service"
   Me va a aparecer una ventana en donde va a cargar el despliegue y me va a mostrar varios logs en donde me va a saltar si hay algún error en caso de que lo haya
   Arriba va a estar la URL que yo puedo copiar y buscarla en el navegador para ver el deploy
   Render de mi backend:
   `https://curso-backend-server-deploy.onrender.com`
8. Ahora debo desplegar el frontend:
   Render de mi frontend:
   `https://curso-backend-client-deploy.onrender.com`


## Cómo actualizar el deploy
