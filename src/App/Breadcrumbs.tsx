import { Breadcrumb } from 'antd';
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";


import { IRoute } from '../routes';

function matchUrl(url: string, pathname: string) {
  const urlParams = url.split('/');
  const pathnameParams = pathname.split('/');

  if (urlParams.length !== pathnameParams.length) {
    return false;
  }

  for (let i = 0; i < urlParams.length; i++) {
    if (!urlParams[i].startsWith(':') && urlParams[i] !== pathnameParams[i]) {
      return false;
    }
  }

  return true;
}

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
    const selectedRoute = routes.find((route) => matchUrl(route.url, pathname));
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
