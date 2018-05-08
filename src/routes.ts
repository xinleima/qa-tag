import * as React from 'react';

import CreateQuestions from './pages/CreateQuestions';
import Questions from "./pages/Questions";

export interface IRoute {
  component: React.ComponentType<any>;
  title: string;
  url: string;
  breadcrumbs: string[]
}

const routes: IRoute[] = [
  {
    breadcrumbs: ['问题列表'],
    component: Questions,
    title: '问题列表',
    url: '/questions',
  },
  {
    breadcrumbs: ['创建问题'],
    component: CreateQuestions,
    title: '创建问题',
    url: '/questions/new',
  }
];

export default routes
