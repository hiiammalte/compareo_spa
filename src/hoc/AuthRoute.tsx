import React, { ReactElement } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom"
import { PublicRoutes } from "../global/routeDefs";
import { useAuth } from "./AuthProvider";

export type RouteParameterProps = RouteComponentProps<{ id?: string | undefined }>;

interface AuthRouteProps {
    Component: React.ComponentType<RouteParameterProps>;
    path: string;
    exact?: boolean;
}

export interface RedirectRouteState {
    referrer: string
}

function AuthRoute({ Component, path, exact = false, ...rest } : AuthRouteProps): ReactElement {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            exact={exact}
            path={path}
            render={(routeProps: RouteParameterProps) => 
                currentUser !== null ? (
                    <Component { ...routeProps } />
                ) : (
                    <Redirect to={{pathname: PublicRoutes.login, state: { from: routeProps.location }}  } />
                )
            }   
        />
    );
}

export default AuthRoute;