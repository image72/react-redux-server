import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/mainLayout';
import SearchLayoutContainer from './components/containers/searchLayoutContainer';

// Pages
import Home from './components/home';
import UserListContainer from './components/containers/userListContainer';
import UserProfileContainer from './components/containers/UserProfileContainer';
import WidgetListContainer from './components/containers/WidgetListContainer';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />

        <Route path="users">
          <Route component={SearchLayoutContainer}>
            <IndexRoute component={UserListContainer} />
          </Route>
          <Route path=":userId" component={UserProfileContainer} />
        </Route>

        <Route path="widgets">
          <Route component={SearchLayoutContainer}>
            <IndexRoute component={WidgetListContainer} />
          </Route>
        </Route>

    </Route>
  </Router>
);
