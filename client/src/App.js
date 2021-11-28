import React, { lazy } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const Layout = lazy(() => import('./containers/Layout'));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
};

export default App;
