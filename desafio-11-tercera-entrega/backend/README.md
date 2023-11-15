## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. En este desafío trabajamos delegación de responsabilidades. El objetivo es mantener un flujo con actividades bien delegadas y así poder tener mejor control sobre el código <br>
   Vamos a tener un frontend(vistas hechas con React), un backend(controlador, rutas y modelo) y una base de datos
3. Incluyo un archivo "products.controller.js" en la carpeta "controllers" donde creamos CRUDS <br>
   Con este archivo buscamos dividir las responsabilidades entre controlador, modelo y rutas, y crear un código más limpio
4. Incluyo un archivo "mailer.js" en la carpeta "config" para poder enviar mails a las personas que compren productos en mi página web
5. Modifico el archivo "products.routes.js" borrando la importación de productModel ya que no la vamos a necesitar más, ahora importamos los controladores. Dentro de los archivos controllers importamos productModel <br>
   Realizar lo mismo con todos los archivos dentro de routes (carts, orders, products, sessions y users) y crear sus respectivos controllers
6. Modifico el archivo "products.models.js" agregándole paginate. Si queremos borramos el paginate de "users.models.js" ya que no es necesario, sólo lo hicimos para practicarlo en clase
7. Eliminé las carpetas "dao", "public" y "views" ya que solamente utilizaré models de lo que estaba en la carpeta dao. Y public y views me quedan obsoletas al reemplazar Handlebars por React
8. El archivo "path.js" dejo de importarlo en "app.js" ya que lo necesitaba solamente para Handlebars, pero ahora lo importo en "mailer.js" para poder enviar imágenes en el mail
9. Comentario importante que se aclaró en la clase 14: cuándo utilizar "productManager" y cuándo "productModel" <br>
   Yo los estaba utilizando mal, me convenía implementar productModel en todos los archivos de routes <br>
   Cuando utilizamos clases deberíamos utilizar productManager <br>
   Cuando utilizamos funciones deberíamos utilizar productModel <br>
   Si tengo el modelo de mongoose, debería aplicar el modelo <br>
   Al desfragmentar la app en controlador, modelo y ruta, el productManager ya pierde sentido <br>
   De todas formas, en esta tercera pre-entrega dividimos las responsabilidades y tengo que limpiar los archivos routes e implementar productModel no en los archivos de routes, sino en los archivos de controllers



## Dependencias instaladas para este desafío:

1. **vite**
   - Instalación: `npm install -g create-vite`
   - Instalarlo en frontend
   - Es una herramienta que nos permite crear sitios web desde el lado frontend, de manera más rápida y eficiente. Es similar a "Create React App", la herramienta que utilicé en el curso de React

2. **react-router-dom**
   - Instalación: `npm i react-router-dom`
   - Instalarlo en frontend
   - Es una dependencia que facilita la navegación y gestión de rutas en aplicaciones React, permitiendo crear rutas dinámicas para una experiencia de usuario fluida

3. **cors**
   - Instalación: `npm i cors`
   - Instalarlo en backend
   - El paquete "cors" habilita el intercambio de recursos entre dominios, permitiendo solicitudes HTTP desde un dominio diferente al origen. Así evitamos los errores de cors policy

4. **nodemailer**
   - Instalación: `npm i nodemailer`
   - Instalarlo en backend
   - Esta dependencia sirve para enviar correos electrónicos fácilmente a través de diferentes servicios de correo.

5. **uuid**
   - Instalación: `npm install uuid`
   - Instalarlo en backend
   - Esta dependencia permite generar identificadores únicos