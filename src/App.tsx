import { Breadcrumb, Layout, Menu } from 'antd';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import routes from './routes'

const { Header, Content, Footer } = Layout;

class Routes extends React.Component {
  public render() {

    const routeList = routes.map((route) => (
      <Route path={route.url} key={route.title} component={route.component} exact={true} />
    ));

    return (
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', width: '100%' }}>
            <div className="logo">Q&amp;A Tag</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Switch>
                {routeList}
                <Redirect to="/questions" />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    )
  }
}

export default Routes
