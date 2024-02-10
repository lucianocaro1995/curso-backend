import React, { createContext, useState, useContext, useEffect } from "react";
import { getCookiesByName } from '../utils/formsUtils';

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const AuthContext = createContext();



//Proveedor de autenticación
const AuthProvider = ({ children }) => {
    //Crea la variable token que almacena el estado de autenticación del usuario. Se inicia en null
    const [token, setToken] = useState(null);
    //Crea la variable initialized que indica si el contexto de autención ha iniciado o no. Inicialmente se establece en false
    const [initialized, setInitialized] = useState(false);



    //1) UseEffect que muestra obtiene el token de la cookie, lo decodifica y muestra la info del usuario en consola
    useEffect(() => {
        const initializeToken = () => {
            //Obtengo el token almacenado en la cookie llamada "jwtCookie"
            const storedToken = getCookiesByName('jwtCookie');

            //Decodifico el token y muestra la info del usuario en la consola del navegador
            try {
                if (storedToken) {
                    const userObject = JSON.parse(atob(storedToken.split('.')[1])).user;
                    setToken(userObject);
                    console.log('Token:', userObject);
                    
                }
            } catch (error) {
                console.error('Error parsing token:', error);
            } finally {
                setInitialized(true);
            }
        };
        if (!initialized) {
            initializeToken();
        }
    }, [initialized]);



    //2) Función para loguearse
    const login = async (email, password) => {
        try {
            const response = await fetch(`${URL}/api/session/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Almacena el token en el estado después de iniciar sesión
                setToken(data.token);
                // Almacena el token en una cookie para mantener la sesión del usuario
                document.cookie = `jwtCookie=${data.token}; path=/`;
            } else {
                await handleNonJSONResponse(response);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };



    //3) Función para desloguearse
    const logout = () => {
        // Eliminar la cookie y actualizar el estado
        // Al establecer la fecha de expiración en el pasado, dejo que el backend maneje la expiración
        // Yo puse en el archivo "jwt.js" que la cookie expire cada 12 horas
        document.cookie = 'jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setToken(null);
    };



    //4) Función para manejar las respuestas que no son JSON. Se utiliza en el 2)
    const handleNonJSONResponse = async (response) => {
        const text = await response.text();
        console.error("Error en la respuesta:", text);
    };



    //Proporciono las funciones creadas a través del contexto de autenticación
    //token no es una función pero también se debe pasar, sino no unciona el Header
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



//Función que devuelve el contexto de autenticación si existe
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};



export { AuthProvider, useAuth };