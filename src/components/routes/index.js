import React from 'react';

import { routes } from 'app/components/routes/config';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteGate from 'app/components/routes/route-gate';

const Routes = () => (
  <Switch>
    {
      routes.map( ( route, i ) => {
        return (
          <Route key={ i }
                 render={ () => ( <RouteGate route={ route }/> ) }
                 path={ route.path } />
        );
      } )
    }
    <Route path='/' exact={ false } component={ () => (
      <Redirect to={ `/assets/all` } />
    ) } />
  </Switch>
);

export default Routes;