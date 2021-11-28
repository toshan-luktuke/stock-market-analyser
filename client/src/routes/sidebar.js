const routes = [
  {
    path: '/',
    icon: 'HomeIcon',
    name: 'Market Dashboard',
  },
  {
    path: '/search',
    icon: 'SearchIcon',
    name: 'Search',
  },
  {
    path: '/news',
    icon: 'CardsIcon',
    name: 'News',
  },
  {
    icon: 'PagesIcon',
    name: 'Predictions & Analysis',
    routes: [
      {
        path: '/predictions',
        name: 'ML-Based Predictions',
      },
      {
        path: '/wsb',
        name: 'r/WallStreetBets Sentiment Analysis',
      },
    ],
  },
];

export default routes;
