enum AuthRoutes {
    dashboard = "/",
    projects = "/projects",
    collaborators = "/collaborators"
}

enum PublicRoutes {
    login = "/login",
    register = "/register",
    notFound = "/404",
    unauthorized = "/unauthorized"
}

export { AuthRoutes, PublicRoutes };