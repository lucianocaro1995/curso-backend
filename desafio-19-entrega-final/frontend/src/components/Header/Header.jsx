import "./Header.css"
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="header-hijo">
                <NavLink className={"header-navlink"} to={'/'}>
                    <img className="header-logo" src="https://i.ibb.co/2vXM4s5/logo.png" alt="Imagen del logo" />
                    <h2 className="header-titulo">La cueva gamer</h2>
                </NavLink>
            </div>
        </div>
    )
}

export default Header