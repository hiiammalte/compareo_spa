import React from "react";
import { Redirect } from "react-router";

import AuthRoute from "../hoc/AuthRoute";
import { AuthRoutes } from "../global/routeDefs";
import Projects from "../pages/Projects";
import PrivateLayout from "../components/private/PrivateLayout";
import Project from "../pages/Project";

const PrivateContainer: React.FC = () => {
    return (
        <PrivateLayout>
            <AuthRoute path={AuthRoutes.projects} exact Component={Projects}></AuthRoute>
            <AuthRoute path={AuthRoutes.project + "/:id"} exact Component={Project}></AuthRoute>
            <AuthRoute path={AuthRoutes.collaborators} Component={Projects}></AuthRoute>
            <Redirect from="/" to={AuthRoutes.projects}/>
        </PrivateLayout>
    );
}
export default PrivateContainer;