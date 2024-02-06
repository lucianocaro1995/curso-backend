import "./App.css"
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

import Home from './components/Home';
import ItemDetailContainer from './components/ItemDetailContainer';
import Error404 from './components/Error404';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import NewProductsForm from './components/NewProductsForm';
import UsersForm from './components/UsersForm';

const App = () => {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path="/item/:_id" element={<ItemDetailContainer />} />
                        {/* <Route path="/cart" element={<Cart />} /> */}
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