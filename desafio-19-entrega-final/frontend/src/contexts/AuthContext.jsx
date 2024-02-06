import React, { createContext, useState, useContext, useEffect } from "react";
import { getCookiesByName } from '../utils/formsUtils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const initializeToken = () => {
            const storedToken = getCookiesByName('jwtCookie');

            try {
                if (storedToken) {
                    const userObject = JSON.parse(atob(storedToken.split('.')[1])).user;
                    setToken(userObject);
                }
            } catch (error) {
                console.error('Error parsing token:', error);
            }
        };

        initializeToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/session/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Continuar con la lógica para un inicio de sesión exitoso
            } else {
                await handleNonJSONResponse(response);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    const logout = () => {
        // Eliminar la cookie y actualizar el estado
        document.cookie = 'jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };