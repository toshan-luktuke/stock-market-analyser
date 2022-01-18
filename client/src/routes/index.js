import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Search = lazy(() => import('../pages/Search'));
const SearchIndian = lazy(() => import('../pages/SearchIndian'));
const News = lazy(() => import('../pages/News'));
const Page404 = lazy(() => import('../pages/404'));
const WSB = lazy(() => import('../pages/WSB'));
const Predictions = lazy(() => import('../pages/Predictions'));

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
    path: '/searchindian',
    component: SearchIndian,
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
  {
    path: '/predictions',
    component: Predictions,
  },
];

export default routes;
