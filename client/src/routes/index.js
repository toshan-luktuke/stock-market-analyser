import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Search = lazy(() => import('../pages/Search'));
const News = lazy(() => import('../pages/News'));
const Page404 = lazy(() => import('../pages/404'));
const WSB = lazy(() => import('../pages/WSB'));

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/wsb',
    component: WSB,
  },
];

export default routes;
