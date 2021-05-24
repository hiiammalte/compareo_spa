# compareo SPA - React, Node.js and GraphQL-based

This is the frontend part of the compareo app. This Single Page Application is based upon 'create-react-app' and uses hooks and functional components.

## Features

- Node.js and React.js based Single Page Web application
- uses Apollo Client to communication with GraphQL-API
- stores Bearer Access Token (JWT) in Browser Memory (JavaScript variable)
- automatic refetching of Access Token on page-reload using provided Refresh Token (HttpOnly-Cookie)
- graphql-codegen implemenation for automatic fetching and creating GraphQL Query- & Mutations-hooks
- functional UI components based on imported compareo_sass UI (imported as compressed CSS)
- react-router-dom routing with AuthRoute-mechanism to prevent access to private pages (login required)
- TypeScript type-safety implementation

## Technologies

This project utilizes the following Technologies / Node Packages:
- Node.js
- GraphQL
- React.js javaScript library
- Apollo Client
- graphql-codegen
- react-router-dom
- formik
- yup
- fontawesome
