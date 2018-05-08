import * as React from 'react';
import Questions from "./pages/Questions";

export interface IRoute {
  component: React.ComponentType<any>;
  title: string;
  url: string;
}

const routes: IRoute[] = [
  {
    component: Questions,
    title: 'questions',
    url: '/questions',
  }
];

export default routes
