import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import routes from './routes'

class Routes extends React.Component {
  public render() {

    const routeList = routes.map((route) => (
      <Route path={route.url} key={route.title} component={route.component} exact={true} />
    ));

    return (
      <Router>
        <Switch>
          {routeList}
          <Redirect to="/questions" />
        </Switch>
      </Router>
    )
  }
}

export default Routes
