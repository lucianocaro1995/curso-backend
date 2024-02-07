//Importaciones para enrutamiento y autenticación
import "./App.css"
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

//Vistas generales
import Home from './components/Home';
import ItemDetailContainer from './components/ItemDetailContainer';
import Error404 from './components/Error404';

//Vistas de users
import Cart from './components/Cart';
//import Checkout from './components/Checkout';

//Vistas de admin
import NewProductsForm from './components/NewProductsForm';
import UsersForm from './components/UsersForm';

//Vistas de registro y logeo
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';

const App = () => {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path="/item/:_id" element={<ItemDetailContainer />} />
                        <Route path="/cart" element={<Cart />} />
                        {/* <Route path="/checkout" element={<Checkout />} /> */}
                        <Route path="/*" element={<Error404 />} />

                        <Route path='/register' element={<RegisterForm />} />
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/logout' element={<Logout />} />

                        <Route path='/admin/new-products' element={<NewProductsForm />} />
                        <Route path='/admin/users-form' element={<UsersForm />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
};

export default App;