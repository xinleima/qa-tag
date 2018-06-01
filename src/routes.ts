import * as React from 'react';

import CreateQuestions from './pages/CreateQuestions';
import QuestionDetail from "./pages/QuestionDetail";
import Questions from "./pages/Questions";


export interface IRoute {
  component: React.ComponentType<any>;
  title: string;
  url: string;
  breadcrumbs: string[];
  hidden?: boolean;
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
  },
  {
    breadcrumbs: ['问题列表', '问题详情'],
    component: QuestionDetail,
    hidden: true,
    title: '问题详情',
    url: '/question/:id',
  },
];

export default routes
