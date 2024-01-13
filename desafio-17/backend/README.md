## Comentarios:

1. Debo ejecutar `npm run dev` en la terminal de ambas carpetas (backend y frontend) para poder ver mi app en el navegador y que funcione correctamente <br>
   Es recomendable abrir las 2 terminales, tanto para backend como frontend, así reconozco los errores de cada uno en caso de que aparezcan
2. Desafío "Módulos de testing para proyecto final": <br>
   En este trabajo debemos
3. Creé una carpeta "test"
4. Debo ejecutar `npm run test` para probar el test de usuarios
5. Debo ejecutar `npm run testChai` para probar el test de usuarios realizados con Chai, en vez de utilizar el módulo nativo Assert que tiene Node.js para hacer las comparaciones


## Dependencias instaladas para este desafío:

1. **mocha**
   - Instalación: `npm install -D mocha`
   - Instalarlo en backend
   - Es un marco de prueba en JavaScript que se utiliza para realizar pruebas unitarias y de integración en desarrollo web. La razón de instalarlo dentro de nuestras dependencias de desarrollo es que el testing sólo se realiza antes de entrar en un entorno productivo. Cuando nuestro proyecto se encuentre desplegado en la nube, no habrá necesidad de querer correr un test en éste

2. **chai**
   - Instalación: `npm install -D chai`
   - Instalarlo en backend
   - Chai es una biblioteca de aserciones en JavaScript utilizada para escribir pruebas más expresivas y legibles, integrándose comúnmente con el framework de pruebas Mocha para facilitar el desarrollo y la validación del código

3. **supertest**
   - Instalación: `npm install -D supertest`
   - Instalarlo en backend
   - Es una biblioteca de pruebas para Node.js que simula solicitudes HTTP, permitiendo realizar pruebas de integración y verificar respuestas de APIs y aplicaciones web de manera automatizada