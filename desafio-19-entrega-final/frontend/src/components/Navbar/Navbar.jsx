import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <ul className="categorias">
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/Notebook'}>
                    <img src="https://i.ibb.co/BqV9VZg/laptop.png" alt="Categoria notebooks" />
                    <span className="categoria-span">Notebooks</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/Auriculares'}>
                    <img src="https://i.ibb.co/XSHFmzK/auricularj.png" alt="Categoria auriculares" />
                    <span className="categoria-span">Auriculares</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/Mouse'}>
                    <img src="https://i.ibb.co/CvGmTqf/af.png" alt="Categoria mouses" />
                    <span className="categoria-span">Mouses</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/Monitor'}>
                    <img src="https://i.ibb.co/xXRSRPW/monitor.png" alt="Categoria monitores" />
                    <span className="categoria-span">Monitores</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/Pc'}>
                    <img src="https://i.ibb.co/ZWRDqk8/pc.png" alt="Categoria pc gamer" />
                    <span className="categoria-span">Pc gamer</span>
                </NavLink>
            </li>
            <li className="categorias-li">
                <NavLink className={"categoria-link"} to={'/categoria/Teclado'}>
                    <img src="https://i.ibb.co/L6FX9br/te.png" alt="Categoria teclado" />
                    <span className="categoria-span">Teclados</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar