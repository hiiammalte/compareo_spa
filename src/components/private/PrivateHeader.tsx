import { useApolloClient } from "@apollo/client";
import { ReactNode } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

import { useLogoutMutation } from "../../graphql/hooks/graphql";
import { PublicRoutes } from "../../global/routeDefs";
import { useAuth } from "../../hoc/AuthProvider";
import Icon from "../Icon";

type HeaderProps = {
  title?: string,
  children: ReactNode,
  goBackPath?: string,
};

function Header({title, children, goBackPath} : HeaderProps) {
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const { signOut } = useAuth();

  const history = useHistory();

  async function handleLogout() {
    const response = await logout();
    if (response && response.data?.logout?.errors) {
        console.log("LOGOUT ERRORS: ", response.data?.logout?.errors)
    }
    await apolloClient.resetStore();
    signOut();
    history.push(PublicRoutes.login);
  }

  return (
    <div id="header">
      <div id="header__content-aware">
        <div className="title">
          { goBackPath && 
            <NavLink to={goBackPath} className="action-btn action-btn-light">
              <Icon name="chevron-left" />
            </NavLink>
          }
          <h3>{ title }</h3>
        </div>
        <div className="action">
          { children }
        </div>
      </div>
      <div id="header__controls">
        <button onClick={() => {}} className="action-btn action-btn-light">
            <Icon name="search" />
        </button>
        <button onClick={handleLogout} className="action-btn action-btn-light">
            <Icon name="sign-out-alt" />
        </button>
      </div>
    </div>
  );
}

export default Header;