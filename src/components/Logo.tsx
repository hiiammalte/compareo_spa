import { NavLink } from "react-router-dom";
import LogoSvg from "../assets/images/logo.svg";

function Logo() {
    return (
        <NavLink id="logo" exact to="/">
            <img src={LogoSvg} alt="Compareo Logo" />
        </NavLink>
    )
}

export default Logo;