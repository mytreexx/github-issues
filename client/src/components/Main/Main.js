import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import Issues from './Issues/Issues';
import NotFound from '../UI-components/NotFound';


const Main = () => {
  return (

    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/:userName/:repoName/issues" component={Issues} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
}

export default Main;
