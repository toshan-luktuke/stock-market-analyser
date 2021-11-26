import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Sidebar from './partials/Sidebar';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Sidebar />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
