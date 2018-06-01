import { Layout, Menu } from 'antd';
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";


import { IRoute } from '../routes';

const { Header } = Layout;

/**
 * type.
 */
interface IHeaderBarProps extends RouteComponentProps<any> {
  routes: IRoute[]
}

/**
 * HeaderBar.
 */
class HeaderBar extends React.Component<IHeaderBarProps, {}> {
  public render() {
    const { location, routes } = this.props;

    const pathname = location.pathname;
    const selectedRoute = routes.find((route) => route.url === pathname);

    const menuItems = routes
      .filter((route) => !route.hidden)
      .map((route) => (
        <Menu.Item key={route.title}><Link to={route.url}>{route.title}</Link></Menu.Item>
      ));

    return (
      <Header className="header">
        <div className="logo">Q&amp;A-Tag</div>
        <Menu
          theme="dark"
          mode="horizontal"
          className="menu"
          selectedKeys={selectedRoute ? [selectedRoute.title] : []}
        >
          {menuItems}
        </Menu>
      </Header>
    )
  }
}

export default withRouter(HeaderBar)
