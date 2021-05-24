import React from "react";
import { Route } from "react-router";
import { PublicRoutes } from "../global/routeDefs";
import "../assets/stylesheets/public-min.css";

import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import PublicLayout from "../components/public/PublicLayout";

const PublicContainer: React.FC = () => (
    <PublicLayout>
        <Route exact path={PublicRoutes.login} component={Login}></Route>
        <Route exact path={PublicRoutes.unauthorized} component={Unauthorized}></Route>
    </PublicLayout>
)

export default PublicContainer;