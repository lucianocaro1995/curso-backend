/*
Este archivo path.js sirve para resolver un problema con las rutas
Sirve para que todos puedan ver el trabajo sin importar si la otra persona utiliza Windows, Linux o Mac
La ruta puede variar en cada computadora que abra este archivo, en mi caso "D:\Luciano\Documentos\curso-backend\desafio-5>"
Gracias a esto se modifica la ruta dependiendo de quien abra el código. A veces la barra va para un lado, otras veces para el otro lado
La idea es que __dirname me devuelva el directorio actual en donde yo estoy viendo el código
*/

//Convierto la URL del archivo en la ruta del sistema de archivos
import { fileURLToPath } from "url";
//Obtiene el directorio de la ruta del archivo
import { dirname } from "path";
//Defino la constante "__filename" con la ruta actual del archivo, mi URL
const __filename = fileURLToPath(import.meta.url)
//Exporto la constante "__dirname" con la ruta del directorio del archivo.
export const __dirname = dirname(__filename)