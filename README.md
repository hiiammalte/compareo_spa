# compareo SPA - React, Node.js and GraphQL-based

This is the frontend part of the compare[] app. The app lets you compare all kind of products against each other. You may also collaborate in teams.

This Single Page Application is based upon 'create-react-app' and is written in TypeSricpt. It uses Apollo Client to send Queries and Mutations to a GraphQL API. There is heavy usage of hooks and functional components within the code.

## Features

- Node.js and React.js based Single Page Web application
- uses Apollo Client to communication with GraphQL-API
- stores Bearer Access Token (JWT) in Browser Memory (JavaScript variable)
- automatic refetching of Access Token on page-reload using provided Refresh Token (HttpOnly-Cookie)
- graphql-codegen implemenation for automatic fetching and creating GraphQL Query- & Mutations-hooks
- functional UI components based on imported compareo_sass UI (imported as compressed CSS)
- react-router-dom routing with AuthRoute-mechanism to prevent access to private pages (login required)
- TypeScript type-safety implementation

## Getting started

To get this project up and running, follow these steps:

### Prerequisites

- Node.js 14.17.0+
- IDE (preferably Visual Studio Code)
- a GraphQL API (check out: https://github.com/hiiammalte/compareo_api)


### Setup

1. Clone this repository
2. At the root directory, install required packages by running:

```
npm install
```

3. Open `.env`-file within the root directory of this project and change the variables, if you wish:

4. That's it! To start the application, still at the root directory of this project, run:

```
npm run start
```

5. Launch http://localhost:3000 in your browser to test your application (the port might be different, depending on your ".env"-file configuration).


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
