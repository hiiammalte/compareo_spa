import React, { ReactElement } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom"
import { PublicRoutes } from "../global/routeDefs";
import jwtManager from "../services/jwtManager";

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
    return (
        <Route
            {...rest}
            exact={exact}
            path={path}
            render={(routeProps: RouteParameterProps) => {
                const { getToken } = jwtManager();
                return getToken() !== null ? (
                    <Component { ...routeProps } />
                ) : (
                    <Redirect to={{pathname: PublicRoutes.login, state: { from: routeProps.location }}  } />
                )
            }}   
        />
    );
}

export default AuthRoute;