import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'



import ItemListContainer from './components/ItemListContainer'
//import ItemDetailContainer from './components/ItemDetailContainer'
//import Cart from './components/Cart'
//import Checkout from './components/Checkout'
import Error404 from './components/Error404'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import NewProductsForm from './components/NewProductsForm'
import UsersForm from './components/UsersForm'



const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/categoria/:id" element={<ItemListContainer />} />
                {/* <Route path="/item/:id" element={<ItemDetailContainer />} />               */}
                {/* <Route path="/cart" element={<Cart />} />                                  */}
                {/* <Route path="/checkout" element={<Checkout />} />                          */}
                    <Route path="/*" element={<Error404 />} />

                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='/login' element={<LoginForm />} />

                    <Route path='/admin/new-products' element={<NewProductsForm />} />
                    <Route path='/admin/users-form' element={<UsersForm />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const Home = () => {
    return (
        <>
            <ItemListContainer />
        </>
    );
};

export default App

//NewProductsForm y UsersForm solamente las puede ver el admin
//Tengo que hacer lo de "Olvidé mi contraseña" ???