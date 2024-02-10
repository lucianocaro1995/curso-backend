// Logout.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleLogout = async () => {
            await logout();
            // Eliminar cookie y redirigir a la página de inicio
            document.cookie = 'jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        };
        

        handleLogout();
    }, [logout, navigate]);

    return <div>Cerrando sesión...</div>;
};

export default Logout;