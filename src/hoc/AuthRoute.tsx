import React, { ReactElement } from "react";
import { Redirect, Route, RouteChildrenProps, RouteComponentProps } from "react-router-dom"
import { PublicRoutes } from "../global/routeDefs";
import { useAuth } from "./AuthProvider";

interface AuthRouteProps {
    Component: React.FC<RouteChildrenProps>;
    path: string;
    exact?: boolean;
}

export interface RedirectRouteState {
    referrer: string
}

function AuthRoute({ Component, path, exact = false } : AuthRouteProps): ReactElement {
    const { currentUser } = useAuth();

    return (
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) => 
                currentUser?.userId ? (
                    <Component { ...props } />
                ) : (
                    <Redirect to={ PublicRoutes.login } />
                )
            }   
        />
    );
}

export default AuthRoute;