import { Layout } from 'antd';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import routes from '../routes';
import Breadcrumbs from'./Breadcrumbs';
import HeaderBar from './HeaderBar';

const { Content, Footer } = Layout;

/**
 * Routes
 */
class Routes extends React.Component<{}, {}> {
  public render() {

    const routeList = routes.map((route) => (
      <Route path={route.url} key={route.title} component={route.component} exact={true} />
    ));

    return (
      <Router>
        <Layout className="qa-app">
          <HeaderBar routes={routes} />
          <Content className="content">
            <Breadcrumbs routes={routes} />
            <div className="main">
              <Switch>
                {routeList}
                <Redirect to="/questions" />
              </Switch>
            </div>
          </Content>
          <Footer className="footer">
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    )
  }
}

export default Routes
