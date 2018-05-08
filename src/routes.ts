import * as React from 'react';

import CreateQuestions from './pages/CreateQuestions';
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
  },
  {
    component: CreateQuestions,
    title: 'new questions',
    url: '/questions/new'
  }
];

export default routes
