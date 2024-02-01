import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'



import ItemListContainer from './components/ItemListContainer/ItemListContainer'
//import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
//import Cart from './components/Cart/Cart'
//import Checkout from './components/Checkout/Checkout'
import Error404 from './components/Error404/Error404'
import RegisterForm from './components/RegisterForm/RegisterForm'
import LoginForm from './components/LoginForm/LoginForm'
import NewProductsForm from './components/NewProductsForm/NewProductsForm'
//import UsersForm from './components/UsersForm/UsersForm



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
                {/* <Route path='/admin/users-form' element={<UsersForm />} />                 */}
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