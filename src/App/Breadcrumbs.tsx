import { Breadcrumb } from 'antd';
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";


import { IRoute } from '../routes';

/**
 * type.
 */
interface IBreadcrumbProps extends RouteComponentProps<any> {
  routes: IRoute[]
}

/**
 * Breadcrumbs.
 */
class Breadcrumbs extends React.Component<IBreadcrumbProps, {}> {
  public render() {
    const { location, routes } = this.props;

    const pathname = location.pathname;
    const selectedRoute = routes.find((route) => route.url === pathname);
    const breadcrumbs = selectedRoute ? selectedRoute.breadcrumbs : [];

    return (
      <Breadcrumb className="breadcrumb">
        {
          breadcrumbs.map(item => (
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    )
  }
}

export default withRouter(Breadcrumbs)
