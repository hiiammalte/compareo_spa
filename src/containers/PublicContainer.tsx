import React, { ReactElement } from "react";
import { Route } from "react-router";
import { PublicRoutes } from "../global/routeDefs";
import "../assets/stylesheets/public-min.css";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";
import PublicLayout from "../components/public/PublicLayout";

function PublicContainer(): ReactElement {
    return (
        <PublicLayout>
            <Route exact path={PublicRoutes.login} component={Login}></Route>
            <Route exact path={PublicRoutes.register} component={Register}></Route>
            <Route exact path={PublicRoutes.unauthorized} component={Unauthorized}></Route>
        </PublicLayout>
    )
}

export default PublicContainer;