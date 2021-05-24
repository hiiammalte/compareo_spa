import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
    return (
        <div id="nav">
            <div id="nav__content">
                <div id="functions">
                    <NavLink className="nav-btn nav-btn-primary" exact to="/projects">
                        <i>
                            <FontAwesomeIcon icon="exchange-alt" />
                        </i>
                    </NavLink>
                    <NavLink className="nav-btn nav-btn-primary" exact to="/collaborators">
                        <i>
                            <FontAwesomeIcon icon="users" />
                        </i>
                    </NavLink>
                </div>
                <div id="extra">
                    <NavLink className="nav-btn nav-btn-primary" exact to="/settings">
                        <i>
                            <FontAwesomeIcon icon="cog" />
                        </i>
                    </NavLink>
                    <NavLink className="nav-btn nav-btn-success temporary" exact to="/upgrade">
                        <i>
                            <FontAwesomeIcon icon="crown" />
                        </i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;