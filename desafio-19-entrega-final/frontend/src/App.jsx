import "./App.css"
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartProvider from './components/Context/CartContext';

import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Error404 from './components/Error404';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NewProductsForm from './components/NewProductsForm';
import UsersForm from './components/UsersForm';

const App = () => {
    return (
        <>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path="/categoria/:id" element={<ItemListContainer />} />
                        {/* <Route path="/item/:id" element={<ItemDetailContainer />} /> */}
                        {/* <Route path="/cart" element={<Cart />} /> */}
                        {/* <Route path="/checkout" element={<Checkout />} /> */}
                        <Route path="/*" element={<Error404 />} />

                        <Route path='/register' element={<RegisterForm />} />
                        <Route path='/login' element={<LoginForm />} />

                        <Route path='/admin/new-products' element={<NewProductsForm />} />
                        <Route path='/admin/users-form' element={<UsersForm />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </>
    );
};

const Home = () => {
    return (
        <>
            <ItemListContainer />
        </>
    );
};

export default App;
