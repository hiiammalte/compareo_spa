import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { PublicRoutes } from './global/routeDefs';
import PublicContainer from './containers/PublicContainer';
import PrivateContainer from './containers/PrivateContainer';
import AuthProvider from './hoc/AuthProvider';
import createApolloClient from './hoc/ApolloProvider';

import './assets/stylesheets/main-min.css';
import './assets/icons/fontawesome';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ApolloProvider client={createApolloClient} >
          <Router>
            <Switch>
              <Route exact path={PublicRoutes.login} component={PublicContainer} />
              <Route exact path={PublicRoutes.unauthorized} component={PublicContainer} />
              <Route component={PrivateContainer} />
            </Switch>
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
