import React from "react";
import { Redirect, Route } from "react-router";

import AuthRoute from "../hoc/AuthRoute";
import { AuthRoutes } from "../global/routeDefs";
import Projects from "../pages/Projects";
import PrivateLayout from "../components/private/PrivateLayout";

const PrivateContainer: React.FC = () => {
    return (
        <PrivateLayout>
            <AuthRoute path={AuthRoutes.projects}  Component={Projects}></AuthRoute>
            <AuthRoute path={AuthRoutes.collaborators} Component={Projects}></AuthRoute>
            <Redirect from="/" to={AuthRoutes.projects}/>
        </PrivateLayout>
    );
}
export default PrivateContainer;